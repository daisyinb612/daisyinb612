import React from "react";
import htm from "htm";
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { profile } from "./profile.js?v=20260829-advisor-details";

const html = htm.bind(React.createElement);
const avatarImage = new URL("../assets/profile-avatar.jpg", import.meta.url).href;
const githubIcon = new URL("../assets/icons/github.png", import.meta.url).href;
const scholarIcon = new URL("../assets/icons/google-scholar.png", import.meta.url).href;

function assetUrl(path) {
  return new URL(path, import.meta.url).href;
}

function toList(value) {
  return Array.isArray(value) ? value : [];
}

function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
}

function ExternalLink({ label, url }) {
  return html`
    <${Pressable}
      accessibilityLabel=${label}
      accessibilityRole="link"
      onPress=${() => openUrl(url)}
    >
      <${Text} style=${styles.inlineLink}>${label}</${Text}>
    </${Pressable}>
  `;
}

function RichBio({ value, style }) {
  const parts = String(value).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return html`
    <${Text} style=${style}>
      ${parts.map((part, index) => {
        const strong = part.match(/^\*\*(.+)\*\*$/s);
        if (strong) {
          return html`<${Text} key=${index} style=${styles.bioHighlight}>${strong[1]}</${Text}>`;
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/s);
        if (link) {
          return html`
            <${Text}
              accessibilityRole="link"
              key=${index}
              onPress=${() => openUrl(link[2])}
              style=${styles.bioLink}
            >${link[1]}</${Text}>
          `;
        }

        return part;
      })}
    </${Text}>
  `;
}

function IconLink({ label, source, url }) {
  return html`
    <${Pressable}
      accessibilityLabel=${label}
      accessibilityRole="link"
      onPress=${() => openUrl(url)}
      style=${styles.socialIconButton}
    >
      <${Image} accessible=${false} resizeMode="contain" source=${{ uri: source }} style=${styles.socialIcon} />
    </${Pressable}>
  `;
}

function TopNav({ activeSection, compact, language, onNavigate, onToggleLanguage, t }) {
  return html`
    <${View} style=${[styles.masthead, compact ? styles.mastheadCompact : null]}>
      <${View} style=${[styles.mastheadInner, compact ? styles.mastheadInnerCompact : null]}>
        <${Pressable}
          accessibilityLabel=${t.homeLabel}
          accessibilityRole="link"
          onPress=${() => onNavigate("about")}
        >
          <${Text} style=${styles.siteTitle}>${t.siteTitle}</${Text}>
        </${Pressable}>
        <${View} style=${[styles.navCluster, compact ? styles.navClusterCompact : null]}>
          <${View} style=${[styles.navLinks, compact ? styles.navLinksCompact : null]}>
            ${toList(t.nav).map(
              (item) => {
                const active = item.id === activeSection;

                return html`
                <${Pressable}
                  accessibilityRole="link"
                  accessibilityState=${{ selected: active }}
                  key=${item.id}
                  onPress=${() => onNavigate(item.id)}
                  style=${[styles.navItem, active ? styles.navItemActive : null]}
                >
                  <${Text} style=${[styles.navLink, active ? styles.navLinkActive : null]}>
                    ${item.label}
                  </${Text}>
                </${Pressable}>
              `;
              },
            )}
          </${View}>
          ${profile.common.showLanguageToggle
            ? html`
                <${Pressable}
                  accessibilityLabel=${`Switch language from ${language}`}
                  accessibilityRole="button"
                  onPress=${onToggleLanguage}
                  style=${styles.languageToggle}
                >
                  <${Text} style=${styles.languageText}>${t.switchLabel}</${Text}>
                </${Pressable}>
              `
            : null}
        </${View}>
      </${View}>
    </${View}>
  `;
}

function ProfileOverview({ language, phone, t }) {
  return html`
    <${View} style=${[styles.profileOverview, phone ? styles.profileOverviewPhone : null]}>
      <${View} style=${[styles.profileIdentityPanel, phone ? styles.profileIdentityPanelPhone : null]}>
        <${View} style=${[styles.avatarWrap, phone ? styles.avatarWrapPhone : null]}>
          <${Image}
            accessibilityLabel=${profile.common.avatarAlt}
            resizeMode="cover"
            source=${{ uri: avatarImage }}
            style=${styles.avatar}
          />
        </${View}>
        <${View} style=${styles.authorBlock}>
          <${Text} style=${styles.authorName}>${t.name}</${Text}>
          <${Text} style=${styles.authorBio}>${t.affiliation}</${Text}>
          <${Text} style=${styles.authorBio}>${t.lab}</${Text}>
        </${View}>
        <${View} style=${styles.contactList}>
          <${Text} style=${styles.contactText}>${t.location}</${Text}>
          <${Text} style=${styles.contactText}>${profile.common.email}</${Text}>
          <${View} style=${styles.socialIconRow}>
            <${IconLink} label="Google Scholar" source=${scholarIcon} url=${profile.common.scholar} />
            <${IconLink} label="GitHub" source=${githubIcon} url=${profile.common.github} />
          </${View}>
        </${View}>
      </${View}>
      <${View} style=${[styles.profileBioBlock, phone ? styles.profileBioBlockPhone : null]}>
        <${RichBio}
          value=${t.bio}
          style=${[
            styles.leadText,
            language === "en" ? styles.englishLeadText : null,
          ]}
        />
        <${View} style=${styles.interestWrap}>
          ${toList(t.interests).map(
            (interest) => html`
              <${View} key=${interest} style=${styles.interestPill}>
                <${Text} style=${styles.interestText}>${interest}</${Text}>
              </${View}>
            `,
          )}
        </${View}>
      </${View}>
    </${View}>
  `;
}

function Section({ id, title, titleStyle, hideHeader = false, children }) {
  return html`
    <${View} nativeID=${id} style=${styles.section}>
      ${hideHeader
        ? null
        : html`
            <${Text}
              accessibilityRole="header"
              dataSet=${titleStyle ? { stageHeading: "true" } : undefined}
              style=${[styles.sectionTitle, titleStyle]}
            >
              ${title}
            </${Text}>
            <${View} style=${styles.sectionRule} />
          `}
      ${children}
    </${View}>
  `;
}

function FeaturedProjectCard({ item, t }) {
  const [active, setActive] = React.useState(false);
  const primaryLink = toList(item.links)[0];
  const projectTitle = item.title.split(":")[0];
  const previewImage = item.image ? assetUrl(item.image) : null;

  return html`
    <${Pressable}
      accessibilityLabel=${`${t.openWorkLabel}: ${item.title}`}
      accessibilityRole="link"
      dataSet=${{ featuredCard: "true", interactiveState: active ? "active" : "rest" }}
      onBlur=${() => setActive(false)}
      onFocus=${() => setActive(true)}
      onHoverIn=${() => setActive(true)}
      onHoverOut=${() => setActive(false)}
      onPress=${() =>
        primaryLink ? openUrl(primaryLink.url) : scrollToSection("publications")}
      onPressIn=${() => setActive(true)}
      onPressOut=${() => setActive(false)}
      style=${styles.featuredCard}
    >
      <${ImageBackground}
        accessible=${false}
        resizeMode="cover"
        source=${previewImage ? { uri: previewImage } : null}
        style=${styles.featuredBackground}
      >
        <${View}
          dataSet=${{
            featuredOverlay: "true",
            interactiveState: active ? "active" : "rest",
          }}
          style=${[styles.featuredOverlay, active ? styles.featuredOverlayActive : null]}
        >
          <${Text} style=${[styles.featuredTitle, active ? styles.featuredTextActive : null]}>
            ${projectTitle}
          </${Text}>
          ${active
            ? null
            : html`
                <${Text}
                  dataSet=${{ featuredFullTitle: "true" }}
                  style=${styles.featuredFullTitle}
                >
                  ${item.title}
                </${Text}>
              `}
        </${View}>
      </${ImageBackground}>
    </${Pressable}>
  `;
}

function FeaturedWork({ items, phone, t }) {
  return html`
    <${View} style=${styles.featuredBlock}>
      <${View} style=${styles.featuredHeadingRow}>
        <${Text} dataSet=${{ stageHeading: "true" }} style=${styles.featuredHeading}>
          ${t.featuredHeading}
        </${Text}>
      </${View}>
      <${View} style=${[styles.featuredGrid, phone ? styles.featuredGridPhone : null]}>
        ${toList(items)
          .slice(0, 2)
          .map(
            (item) => html`<${FeaturedProjectCard} item=${item} key=${item.title} t=${t} />`,
          )}
      </${View}>
    </${View}>
  `;
}

function EducationItem({ item }) {
  return html`
    <${View} style=${styles.timelineItem}>
      <${View} style=${styles.timelineMain}>
        <${Text} style=${styles.itemTitle}>${item.school}</${Text}>
        <${Text} style=${styles.itemSubtitle}>${item.degree}</${Text}>
        ${item.detail ? html`<${Text} style=${styles.bodyText}>${item.detail}</${Text}>` : null}
      </${View}>
      <${Text} style=${styles.itemPeriod}>${item.period}</${Text}>
    </${View}>
  `;
}

function Publication({ item, phone }) {
  const previewImage = item.image ? assetUrl(item.image) : null;
  const tags = toList(item.tags);
  const links = toList(item.links);
  const bullets = toList(item.bullets);
  const authorParts = item.authors.split(/(Xuejiao Ma)/gi);
  const shortTitle = item.title.split(":")[0];

  return html`
    <${View} style=${[styles.pubItem, phone ? styles.pubItemPhone : null]}>
      <${View} style=${[styles.pubMedia, phone ? styles.pubMediaPhone : null]}>
        ${previewImage
          ? html`
              <${Image}
                accessibilityLabel=${item.imageAlt || item.title}
                resizeMode="contain"
                source=${{ uri: previewImage }}
                style=${styles.pubPreview}
              />
            `
          : html`
              <${View} style=${styles.pubPlaceholder}>
                <${Text} style=${styles.pubPlaceholderEyebrow}>PUBLICATION</${Text}>
                <${Text} style=${styles.pubPlaceholderTitle}>${shortTitle}</${Text}>
              </${View}>
            `}
      </${View}>
      <${View} style=${styles.pubContent}>
        <${View} style=${styles.pubTagRow}>
          ${tags.map(
            (tag) => html`
              <${View} key=${tag} style=${styles.pubTagBadge}>
                <${Text} style=${styles.pubTag}>${tag}</${Text}>
              </${View}>
            `,
          )}
        </${View}>
        <${Text} style=${styles.pubTitle}>${item.title}</${Text}>
        <${Text} style=${styles.pubAuthors}>
          ${authorParts.map(
            (part, index) => html`
              <${Text}
                key=${`${part}-${index}`}
                style=${part.toLowerCase() === "xuejiao ma" ? styles.highlightAuthor : null}
              >${part}</${Text}>
            `,
          )}
        </${Text}>
        <${Text} style=${styles.venueText}>${item.venue}</${Text}>
        ${links.length
          ? html`
              <${View} style=${styles.linkRow}>
                ${links.map(
                  (link) => html`
                    <${ExternalLink} key=${link.label} label=${link.label} url=${link.url} />
                  `,
                )}
              </${View}>
            `
          : null}
        ${bullets.length
          ? html`
              <${View} style=${styles.bulletList}>
                ${bullets.map(
                  (bullet) => html`
                    <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
                  `,
                )}
              </${View}>
            `
          : null}
      </${View}>
    </${View}>
  `;
}

function DetailGroups({ item }) {
  return html`
    <${View} style=${styles.detailList}>
      ${toList(item.bullets).map(
        (bullet) => html`
          <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
        `,
      )}
      ${toList(item.groups).map(
        (group) => html`
          <${View} key=${group.title} style=${styles.detailGroup}>
            <${Text} style=${styles.detailGroupTitle}>${group.title}</${Text}>
            ${toList(group.bullets).map(
              (bullet) => html`
                <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
              `,
            )}
          </${View}>
        `,
      )}
    </${View}>
  `;
}

function ExperienceItem({ item, isLast, phone }) {
  const logoImage = item.logo ? assetUrl(item.logo) : null;
  const periodParts = String(item.period || "").split(/\s*-\s*/);
  const periodLabel =
    periodParts.length === 2 ? `${periodParts[0]}\n-\n${periodParts[1]}` : item.period;

  return html`
    <${View} style=${[styles.experienceTimelineRow, phone ? styles.experienceTimelineRowPhone : null]}>
      <${View} style=${[styles.experienceRail, phone ? styles.experienceRailPhone : null]}>
        ${phone
          ? null
          : html`
              <${View} style=${styles.experienceTypeBadge}>
                <${Text} style=${styles.experienceTypeText}>${item.type || "Industry"}</${Text}>
              </${View}>
              <${Text}
                accessibilityLabel=${item.period}
                style=${styles.experienceRailPeriod}
              >${periodLabel}</${Text}>
            `}
        <${View} style=${[styles.experienceDot, phone ? styles.experienceDotPhone : null]} />
        ${isLast
          ? null
          : html`
              <${View}
                style=${[
                  styles.experienceConnector,
                  phone ? styles.experienceConnectorPhone : null,
                ]}
              />
            `}
      </${View}>
      <${View} style=${[styles.experienceCard, phone ? styles.experienceCardPhone : null]}>
        <${View}
          style=${[
            styles.experienceCardHeader,
            phone ? styles.experienceCardHeaderPhone : null,
          ]}
        >
          ${logoImage
            ? html`
                <${View} style=${styles.logoFrame}>
                  <${Image}
                    accessibilityLabel=${`${item.title} logo`}
                    resizeMode="contain"
                    source=${{ uri: logoImage }}
                    style=${styles.companyLogo}
                  />
                </${View}>
              `
            : null}
          <${View} style=${styles.experienceContent}>
            <${Text} style=${styles.itemTitle}>
              ${item.title}${item.labLink
                ? html`
                    ${" "}<${Text}
                      accessibilityRole="link"
                      onPress=${() => openUrl(item.labLink.url)}
                      style=${styles.experienceLabLink}
                    >${item.labLink.label}</${Text}>
                    ${item.labFullName ? ` (${item.labFullName})` : ""}
                  `
                : null}
            </${Text}>
            ${item.role
              ? html`<${Text} style=${styles.experienceRole}>${item.role}</${Text}>`
              : null}
            ${item.department
              ? html`
                  <${Text} style=${styles.experienceDepartment}>${item.department}</${Text}>
                `
              : null}
            ${item.advisor
              ? html`<${Text} style=${styles.experienceAdvisor}>${item.advisor}</${Text}>`
              : null}
          </${View}>
        </${View}>
        <${DetailGroups} item=${item} />
      </${View}>
    </${View}>
  `;
}

function ExperienceTimeline({ items, phone }) {
  const entries = toList(items);

  return html`
    <${View} style=${styles.experienceTimeline}>
      ${entries.map(
        (item, index) => html`
          <${ExperienceItem}
            isLast=${index === entries.length - 1}
            item=${item}
            key=${item.title}
            phone=${phone}
          />
        `,
      )}
    </${View}>
  `;
}

function ProjectItem({ item, t }) {
  const images = toList(item.images);
  const [expandedImage, setExpandedImage] = React.useState(null);

  React.useEffect(() => {
    if (!expandedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setExpandedImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [expandedImage]);

  return html`
    <${View}>
      <${View} style=${styles.timelineItem}>
        <${View} style=${styles.timelineMain}>
          <${Text} style=${styles.itemTitle}>${item.title}</${Text}>
          ${item.subtitle ? html`<${Text} style=${styles.itemSubtitle}>${item.subtitle}</${Text}>` : null}
          ${item.funding
            ? html`
                <${View} style=${styles.projectFundingBadge}>
                  <${Text} style=${styles.projectFundingText}>${item.funding}</${Text}>
                </${View}>
              `
            : null}
          ${toList(item.versions).map(
            (version) => html`
              <${Text} key=${version.label} style=${styles.projectVersionText}>
                ${version.label} ${version.title}
              </${Text}>
            `,
          )}
          <${DetailGroups} item=${item} />
          ${images.length
            ? html`
                <${View} style=${styles.projectImageStrip}>
                  ${images.map((image) => {
                    const imageSource = typeof image === "string" ? image : image.src;
                    const imageAlt =
                      typeof image === "string" ? item.title : image.alt || item.title;
                    const scannable = typeof image !== "string" && image.scannable;
                    const imageUri = assetUrl(imageSource);

                    return html`
                      <${Pressable}
                        accessibilityLabel=${`${t.expandImageLabel}: ${imageAlt}`}
                        accessibilityRole="button"
                        key=${imageSource}
                        onPress=${() => setExpandedImage({ alt: imageAlt, uri: imageUri })}
                        style=${[
                          styles.projectImageFrame,
                          scannable ? styles.projectScanImageFrame : null,
                        ]}
                      >
                        <${Image}
                          accessible=${false}
                          resizeMode="cover"
                          source=${{ uri: imageUri }}
                          style=${styles.projectImage}
                        />
                      </${Pressable}>
                    `;
                  })}
                </${View}>
              `
            : null}
        </${View}>
        ${item.period ? html`<${Text} style=${styles.itemPeriod}>${item.period}</${Text}>` : null}
      </${View}>
      <${Modal}
        animationType="fade"
        onRequestClose=${() => setExpandedImage(null)}
        transparent=${true}
        visible=${Boolean(expandedImage)}
      >
        <${View} accessibilityViewIsModal=${true} style=${styles.lightboxBackdrop}>
          <${Pressable}
            accessibilityLabel=${t.closeImageLabel}
            accessibilityRole="button"
            onPress=${() => setExpandedImage(null)}
            style=${styles.lightboxClose}
          >
            <${Text} style=${styles.lightboxCloseText}>${t.closeImageLabel}</${Text}>
          </${Pressable}>
          ${expandedImage
            ? html`
                <${Image}
                  accessibilityLabel=${expandedImage.alt}
                  resizeMode="contain"
                  source=${{ uri: expandedImage.uri }}
                  style=${styles.lightboxImage}
                />
              `
            : null}
        </${View}>
      </${Modal}>
    </${View}>
  `;
}

function SkillGroup({ item }) {
  return html`
    <${View} style=${styles.skillGroup}>
      <${Text} style=${styles.skillTitle}>${item.title}</${Text}>
      <${Text} style=${styles.bodyText}>${toList(item.items).join(" · ")}</${Text}>
    </${View}>
  `;
}

export function App() {
  const { width } = useWindowDimensions();
  const [language, setLanguage] = React.useState("en");
  const [activeSection, setActiveSection] = React.useState("about");
  const compact = width < 900;
  const phone = width < 620;
  const t = profile.locales[language];
  const toggleLanguage = () => setLanguage((current) => (current === "zh" ? "en" : "zh"));
  const navigateToSection = (id) => {
    setActiveSection(id);
    scrollToSection(id);
  };

  React.useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = t.name;
  }, [language, t.name]);

  const sections = html`
    <${View} style=${styles.article}>
      <${Section}
        hideHeader=${true}
        id="about"
        title=${t.headings.about}
      >
        <${ProfileOverview} language=${language} phone=${phone} t=${t} />
        <${FeaturedWork} items=${t.publications} phone=${phone} t=${t} />
      </${Section}>

      <${Section}
        id="publications"
        title=${t.headings.publications}
        titleStyle=${styles.stageTitle}
      >
        ${toList(t.publications).map(
          (item) => html`<${Publication} key=${item.title} item=${item} phone=${phone} />`,
        )}
      </${Section}>

      <${Section} id="experience" title=${t.headings.experience} titleStyle=${styles.stageTitle}>
        <${ExperienceTimeline} items=${t.experience} phone=${phone} />
      </${Section}>

      <${Section} id="education" title=${t.headings.education} titleStyle=${styles.stageTitle}>
        ${toList(t.education).map(
          (item) => html`<${EducationItem} key=${item.period} item=${item} />`,
        )}
      </${Section}>

      <${Section}
        id="publicService"
        title=${t.headings.publicService}
        titleStyle=${styles.stageTitle}
      >
        ${toList(t.publicService).map(
          (item) => html`<${ProjectItem} key=${item.title} item=${item} t=${t} />`,
        )}
      </${Section}>
    </${View}>
  `;

  return html`
    <${View} dataSet=${{ language }} style=${styles.app}>
      <${TopNav}
        activeSection=${activeSection}
        compact=${compact}
        language=${language}
        onNavigate=${navigateToSection}
        onToggleLanguage=${toggleLanguage}
        t=${t}
      />
      <${ScrollView} style=${styles.scroll} contentContainerStyle=${styles.page}>
        <${View} style=${styles.layout}>${sections}</${View}>
      </${ScrollView}>
    </${View}>
  `;
}

const colors = {
  text: "#30383d",
  lightText: "#68737a",
  link: "#0d857d",
  heading: "#008c97",
  mint: "#4efff0",
  mintStrong: "#4ae9d9",
  border: "#d8ecea",
  softBorder: "#eaf4f3",
  background: "#ffffff",
  page: "#ffffff",
  pill: "#e7fffc",
  accentSoft: "#f1fffd",
  profileSoft: "#f8fcfc",
};

const styles = StyleSheet.create({
  app: {
    minHeight: "100vh",
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  masthead: {
    width: "100%",
    minHeight: 64,
    position: "sticky",
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    zIndex: 10,
  },
  mastheadInner: {
    width: "100%",
    maxWidth: 1160,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  mastheadCompact: {
    position: "relative",
  },
  mastheadInnerCompact: {
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 12,
  },
  siteTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  navLinks: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  navCluster: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
  },
  navClusterCompact: {
    width: "100%",
  },
  navLinksCompact: {
    width: "100%",
    flexWrap: "wrap",
    gap: 12,
  },
  navLink: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  navLinkActive: {
    color: colors.link,
    fontWeight: "800",
  },
  navItem: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  navItemActive: {
    borderBottomColor: colors.mintStrong,
    backgroundColor: colors.accentSoft,
  },
  languageToggle: {
    minHeight: 30,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  languageText: {
    color: colors.link,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  page: {
    minHeight: "100vh",
    paddingBottom: 70,
  },
  layout: {
    width: "100%",
    maxWidth: 1040,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  profileOverview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 28,
    paddingHorizontal: 28,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.profileSoft,
  },
  profileOverviewPhone: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  profileIdentityPanel: {
    width: 218,
    flexShrink: 0,
    alignItems: "center",
    gap: 14,
  },
  profileIdentityPanelPhone: {
    width: "100%",
  },
  avatarWrap: {
    width: 144,
    height: 144,
    borderRadius: 72,
    flexShrink: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  avatarWrapPhone: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
  },
  authorBlock: {
    width: "100%",
    alignItems: "center",
    gap: 4,
  },
  authorName: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  authorBio: {
    color: colors.lightText,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  contactList: {
    width: "100%",
    alignItems: "center",
    gap: 7,
  },
  contactText: {
    color: colors.lightText,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  socialIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  socialIconButton: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  socialIcon: {
    width: "100%",
    height: "100%",
  },
  profileBioBlock: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 28,
    borderLeftWidth: 1,
    borderTopColor: colors.border,
    borderLeftColor: colors.border,
  },
  profileBioBlockPhone: {
    width: "100%",
    paddingLeft: 0,
    paddingTop: 20,
    borderLeftWidth: 0,
    borderTopWidth: 1,
  },
  article: {
    width: "100%",
    minWidth: 0,
  },
  section: {
    paddingTop: 18,
    marginBottom: 36,
    scrollMarginTop: 84,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "700",
  },
  stageTitle: {
    color: colors.heading,
    fontFamily: "'Bowlby One', 'Nunito', sans-serif",
    fontWeight: "400",
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  sectionRule: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 18,
  },
  leadText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 28,
  },
  englishLeadText: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: "500",
  },
  bioHighlight: {
    color: colors.heading,
    fontWeight: "800",
  },
  bioLink: {
    color: colors.text,
    fontWeight: "500",
  },
  bodyText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 25,
  },
  inlineLink: {
    color: colors.link,
    fontSize: 14,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
  interestWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 28,
  },
  interestPill: {
    backgroundColor: colors.pill,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  interestText: {
    color: colors.link,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },
  featuredBlock: {
    marginTop: 34,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  featuredHeadingRow: {
    marginBottom: 14,
  },
  featuredHeading: {
    color: colors.heading,
    fontFamily: "'Bowlby One', 'Nunito', sans-serif",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "400",
    letterSpacing: 0.36,
    textTransform: "uppercase",
  },
  featuredGrid: {
    flexDirection: "row",
    gap: 14,
  },
  featuredGridPhone: {
    flexDirection: "column",
  },
  featuredCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 210,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.heading,
    borderRadius: 8,
    backgroundColor: colors.heading,
    cursor: "pointer",
  },
  featuredBackground: {
    flex: 1,
    minHeight: 210,
  },
  featuredOverlay: {
    flex: 1,
    minHeight: 210,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "rgba(0, 140, 151, 0.82)",
  },
  featuredOverlayActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 140, 151, 0.96)",
  },
  featuredTextActive: {
    textAlign: "center",
  },
  featuredTitle: {
    color: "#ffffff",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: 8,
  },
  featuredFullTitle: {
    color: "rgba(255, 255, 255, 0.94)",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
  },
  timelineItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    paddingBottom: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
  },
  timelineMain: {
    flex: 1,
    minWidth: 260,
  },
  experienceTimeline: {
    width: "100%",
    gap: 22,
  },
  experienceTimelineRow: {
    width: "100%",
    minHeight: 128,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 18,
  },
  experienceTimelineRowPhone: {
    minHeight: 0,
    gap: 12,
  },
  experienceRail: {
    width: 104,
    flexShrink: 0,
    alignItems: "flex-start",
    position: "relative",
  },
  experienceRailPhone: {
    width: 18,
  },
  experienceTypeBadge: {
    minWidth: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.pill,
  },
  experienceTypeText: {
    color: colors.heading,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
  },
  experienceRailPeriod: {
    width: 76,
    color: colors.lightText,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 9,
  },
  experienceDot: {
    width: 14,
    height: 14,
    position: "absolute",
    top: 8,
    right: -7,
    zIndex: 2,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#ffffff",
    backgroundColor: colors.mintStrong,
  },
  experienceDotPhone: {
    top: 24,
    left: 1,
    right: "auto",
  },
  experienceConnector: {
    width: 2,
    position: "absolute",
    top: 21,
    right: -1,
    bottom: -30,
    backgroundColor: colors.mintStrong,
  },
  experienceConnectorPhone: {
    top: 37,
    left: 7,
    right: "auto",
    bottom: -30,
  },
  experienceCard: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  experienceCardPhone: {
    padding: 16,
  },
  experienceCardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  experienceCardHeaderPhone: {
    flexWrap: "wrap",
  },
  experienceContent: {
    flex: 1,
    minWidth: 0,
  },
  experienceRole: {
    color: colors.link,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
    fontWeight: "400",
  },
  experienceDepartment: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 2,
    fontWeight: "400",
  },
  experienceAdvisor: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 2,
    fontWeight: "400",
  },
  experienceLabLink: {
    color: colors.text,
    textDecorationLine: "underline",
  },
  experienceCardPeriod: {
    width: 132,
    color: colors.lightText,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "right",
    fontWeight: "700",
  },
  experienceCardPeriodPhone: {
    width: "100%",
    textAlign: "left",
    marginLeft: 62,
  },
  logoFrame: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    flexShrink: 0,
  },
  companyLogo: {
    width: "100%",
    height: "100%",
  },
  itemTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
  },
  itemSubtitle: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 3,
  },
  projectVersionText: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
  },
  projectFundingBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginTop: 8,
    backgroundColor: colors.pill,
  },
  projectFundingText: {
    color: colors.heading,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
  },
  itemPeriod: {
    width: 128,
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "right",
    fontWeight: "700",
    marginLeft: "auto",
  },
  projectImageStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 12,
  },
  projectImageFrame: {
    width: 100,
    height: 100,
    maxWidth: "46%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    padding: 0,
    overflow: "hidden",
    cursor: "zoom-in",
  },
  projectScanImageFrame: {
    width: 100,
    height: 100,
    maxWidth: "46%",
    aspectRatio: 1,
    padding: 0,
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  lightboxBackdrop: {
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 28, 0.9)",
    padding: 24,
  },
  lightboxImage: {
    width: "90vw",
    height: "86vh",
    maxWidth: 900,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  lightboxClose: {
    position: "absolute",
    top: 22,
    right: 24,
    zIndex: 2,
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  lightboxCloseText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
  },
  pubItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 22,
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
    backgroundColor: "#ffffff",
  },
  pubItemPhone: {
    flexDirection: "column",
    gap: 16,
  },
  pubMedia: {
    width: 255,
    aspectRatio: 1.5,
    flexShrink: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  pubMediaPhone: {
    width: "100%",
  },
  pubPreview: {
    width: "100%",
    height: "100%",
  },
  pubPlaceholder: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: colors.accentSoft,
  },
  pubPlaceholderEyebrow: {
    color: colors.link,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  pubPlaceholderTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
  pubContent: {
    flex: 1,
    minWidth: 0,
  },
  pubTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 10,
  },
  pubTagBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    backgroundColor: colors.pill,
  },
  pubTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 29,
    fontWeight: "800",
  },
  pubTag: {
    color: colors.link,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
  },
  pubAuthors: {
    color: colors.lightText,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
    fontWeight: "600",
    fontStyle: "italic",
  },
  highlightAuthor: {
    color: colors.link,
    fontWeight: "800",
  },
  venueText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
    fontStyle: "italic",
  },
  linkRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  bulletList: {
    marginTop: 16,
    gap: 8,
  },
  bulletText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
  },
  detailList: {
    marginTop: 8,
    gap: 6,
  },
  detailGroup: {
    marginTop: 6,
    gap: 5,
  },
  detailGroupTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "700",
  },
  skillGrid: {
    gap: 14,
  },
  skillGroup: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
  },
  skillTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    marginBottom: 3,
  },
  honorText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 24,
    marginTop: 16,
  },
});
