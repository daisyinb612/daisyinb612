import React from "react";
import htm from "htm";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { profile } from "./profile.js";

const html = htm.bind(React.createElement);
const avatarImage = new URL("../assets/profile-avatar.jpg", import.meta.url).href;

function assetUrl(path) {
  return new URL(path, import.meta.url).href;
}

function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function ExternalLink({ label, url }) {
  return html`
    <${Pressable} accessibilityRole="link" onPress=${() => openUrl(url)}>
      <${Text} style=${styles.inlineLink}>${label}</${Text}>
    </${Pressable}>
  `;
}

function TopNav({ compact, language, onToggleLanguage, t }) {
  return html`
    <${View} style=${styles.masthead}>
      <${View} style=${[styles.mastheadInner, compact ? styles.mastheadInnerCompact : null]}>
        <${Pressable} onPress=${() => scrollToSection("about")}>
          <${Text} style=${styles.siteTitle}>${t.siteTitle}</${Text}>
        </${Pressable}>
        <${View} style=${styles.navCluster}>
          <${View} style=${[styles.navLinks, compact ? styles.navLinksCompact : null]}>
            ${t.nav.map(
              (item) => html`
                <${Pressable} key=${item.id} onPress=${() => scrollToSection(item.id)}>
                  <${Text} style=${styles.navLink}>${item.label}</${Text}>
                </${Pressable}>
              `,
            )}
          </${View}>
          <${Pressable}
            accessibilityLabel=${`Switch language from ${language}`}
            onPress=${onToggleLanguage}
            style=${styles.languageToggle}
          >
            <${Text} style=${styles.languageText}>${t.switchLabel}</${Text}>
          </${Pressable}>
        </${View}>
      </${View}>
    </${View}>
  `;
}

function Sidebar({ compact, t }) {
  return html`
    <${View} style=${[styles.sidebar, compact ? styles.sidebarCompact : null]}>
      <${View} style=${styles.avatarWrap}>
        <${Image}
          accessibilityLabel=${profile.common.avatarAlt}
          resizeMode="cover"
          source=${{ uri: avatarImage }}
          style=${styles.avatar}
        />
      </${View}>
      <${View} style=${styles.authorBlock}>
        <${Text} style=${styles.authorName}>${t.name}</${Text}>
        <${Text} style=${styles.authorRole}>${t.role}</${Text}>
        <${Text} style=${styles.authorBio}>${t.affiliation}</${Text}>
        <${Text} style=${styles.authorBio}>${t.lab}</${Text}>
      </${View}>
      <${View} style=${styles.contactList}>
        <${Text} style=${styles.contactText}>${t.location}</${Text}>
        <${Pressable} onPress=${() => openUrl(`mailto:${profile.common.email}`)}>
          <${Text} style=${styles.contactLink}>${profile.common.email}</${Text}>
        </${Pressable}>
        <${Text} style=${styles.contactText}>${profile.common.phone}</${Text}>
        <${ExternalLink} label="Google Scholar" url=${profile.common.scholar} />
        <${ExternalLink} label="GitHub" url=${profile.common.github} />
      </${View}>
    </${View}>
  `;
}

function Section({ id, title, children }) {
  return html`
    <${View} nativeID=${id} style=${styles.section}>
      <${Text} accessibilityRole="header" style=${styles.sectionTitle}>${title}</${Text}>
      <${View} style=${styles.sectionRule} />
      ${children}
    </${View}>
  `;
}

function EducationItem({ item }) {
  return html`
    <${View} style=${styles.timelineItem}>
      <${View} style=${styles.timelineMain}>
        <${Text} style=${styles.itemTitle}>${item.school}</${Text}>
        <${Text} style=${styles.itemSubtitle}>${item.degree}</${Text}>
        <${Text} style=${styles.bodyText}>${item.detail}</${Text}>
      </${View}>
      <${Text} style=${styles.itemPeriod}>${item.period}</${Text}>
    </${View}>
  `;
}

function Publication({ item }) {
  const previewImage = item.image ? assetUrl(item.image) : null;

  return html`
    <${View} style=${styles.pubItem}>
      <${View} style=${styles.pubContent}>
        ${previewImage
          ? html`
              <${Image}
                accessibilityLabel=${item.imageAlt || item.title}
                resizeMode="contain"
                source=${{ uri: previewImage }}
                style=${styles.pubPreview}
              />
            `
          : null}
        <${View} style=${styles.pubBody}>
          <${View} style=${styles.pubHeader}>
            <${Text} style=${styles.pubTitle}>
              <${Text} style=${styles.pubTag}>[${item.tag}] </${Text}>${item.title}
            </${Text}>
          </${View}>
          <${Text} style=${styles.itemSubtitle}>${item.authors}</${Text}>
          <${Text} style=${styles.venueText}>${item.venue}</${Text}>
          ${item.links.length
            ? html`
                <${View} style=${styles.linkRow}>
                  ${item.links.map(
                    (link) => html`
                      <${ExternalLink} key=${link.label} label=${link.label} url=${link.url} />
                    `,
                  )}
                </${View}>
              `
            : null}
          <${View} style=${styles.bulletList}>
            ${item.bullets.map(
              (bullet) => html`
                <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
              `,
            )}
          </${View}>
        </${View}>
      </${View}>
    </${View}>
  `;
}

function ExperienceItem({ item }) {
  return html`
    <${View} style=${styles.timelineItem}>
      <${View} style=${styles.timelineMain}>
        <${Text} style=${styles.itemTitle}>${item.title}</${Text}>
        <${Text} style=${styles.itemSubtitle}>${item.org}</${Text}>
        ${item.bullets.map(
          (bullet) => html`
            <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
          `,
        )}
      </${View}>
      <${Text} style=${styles.itemPeriod}>${item.period}</${Text}>
    </${View}>
  `;
}

function ProjectItem({ item }) {
  return html`
    <${View} style=${styles.projectItem}>
      <${Text} style=${styles.itemTitle}>${item.title}</${Text}>
      <${Text} style=${styles.itemSubtitle}>${item.subtitle}</${Text}>
      ${item.bullets.map(
        (bullet) => html`
          <${Text} key=${bullet} style=${styles.bulletText}>• ${bullet}</${Text}>
        `,
      )}
    </${View}>
  `;
}

function SkillGroup({ item }) {
  return html`
    <${View} style=${styles.skillGroup}>
      <${Text} style=${styles.skillTitle}>${item.title}</${Text}>
      <${Text} style=${styles.bodyText}>${item.items.join(" · ")}</${Text}>
    </${View}>
  `;
}

export function App() {
  const { width } = useWindowDimensions();
  const [language, setLanguage] = React.useState("zh");
  const compact = width < 860;
  const t = profile.locales[language];
  const toggleLanguage = () => setLanguage((current) => (current === "zh" ? "en" : "zh"));

  return html`
    <${View} style=${styles.app}>
      <${TopNav}
        compact=${compact}
        language=${language}
        onToggleLanguage=${toggleLanguage}
        t=${t}
      />
      <${ScrollView} style=${styles.scroll} contentContainerStyle=${styles.page}>
        <${View} style=${[styles.layout, compact ? styles.layoutCompact : null]}>
          <${Sidebar} compact=${compact} t=${t} />
          <${View} style=${styles.article}>
            <${Section} id="about" title=${t.headings.about}>
              <${Text} style=${styles.pageTitle}>${t.name} / ${t.englishName}</${Text}>
              <${Text} style=${styles.leadText}>${t.bio}</${Text}>
              <${View} style=${styles.interestWrap}>
                ${t.interests.map(
                  (interest) => html`
                    <${View} key=${interest} style=${styles.interestPill}>
                      <${Text} style=${styles.interestText}>${interest}</${Text}>
                    </${View}>
                  `,
                )}
              </${View}>
            </${Section}>

            <${Section} id="education" title=${t.headings.education}>
              ${t.education.map(
                (item) => html`<${EducationItem} key=${item.period} item=${item} />`,
              )}
            </${Section}>

            <${Section} id="research" title=${t.headings.research}>
              <${Text} style=${styles.bodyText}>${t.researchSummary}</${Text}>
            </${Section}>

            <${Section} id="publications" title=${t.headings.publications}>
              ${t.publications.map(
                (item) => html`<${Publication} key=${item.title} item=${item} />`,
              )}
              <${View} style=${styles.projectList}>
                ${t.projects.map(
                  (item) => html`<${ProjectItem} key=${item.title} item=${item} />`,
                )}
              </${View}>
            </${Section}>

            <${Section} id="experience" title=${t.headings.experience}>
              ${t.experience.map(
                (item) => html`<${ExperienceItem} key=${item.title} item=${item} />`,
              )}
            </${Section}>

            <${Section} id="skills" title=${t.headings.skills}>
              <${View} style=${styles.skillGrid}>
                ${t.skills.map(
                  (item) => html`<${SkillGroup} key=${item.title} item=${item} />`,
                )}
              </${View}>
              <${Text} style=${styles.honorText}>${t.honorsTitle}: ${t.honors.join("；")}</${Text}>
            </${Section}>
          </${View}>
        </${View}>
      </${ScrollView}>
    </${View}>
  `;
}

const colors = {
  text: "#494e52",
  lightText: "#7a8288",
  link: "#2f7f93",
  border: "#e6e8ea",
  softBorder: "#f2f3f3",
  background: "#ffffff",
  page: "#ffffff",
  pill: "#f2f8fa",
};

const styles = StyleSheet.create({
  app: {
    minHeight: "100vh",
    backgroundColor: colors.background,
  },
  scroll: {
    minHeight: "100vh",
  },
  masthead: {
    width: "100%",
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
    backgroundColor: "#ffffff",
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
  navLinksCompact: {
    flexWrap: "wrap",
    gap: 12,
  },
  navLink: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
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
    maxWidth: 1160,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingTop: 36,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 42,
  },
  layoutCompact: {
    flexDirection: "column",
    gap: 24,
  },
  sidebar: {
    width: 235,
    position: "sticky",
    top: 24,
  },
  sidebarCompact: {
    width: "100%",
    position: "relative",
    top: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 18,
  },
  avatarWrap: {
    width: 168,
    height: 168,
    borderRadius: 84,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
  },
  authorBlock: {
    marginTop: 14,
    gap: 4,
  },
  authorName: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "700",
  },
  authorRole: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
  },
  authorBio: {
    color: colors.lightText,
    fontSize: 13,
    lineHeight: 20,
  },
  contactList: {
    marginTop: 18,
    gap: 7,
  },
  contactText: {
    color: colors.lightText,
    fontSize: 13,
    lineHeight: 19,
  },
  contactLink: {
    color: colors.link,
    fontSize: 13,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  article: {
    flex: 1,
    maxWidth: 820,
  },
  section: {
    paddingTop: 18,
    marginBottom: 36,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "700",
  },
  sectionRule: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 18,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "700",
    marginBottom: 12,
  },
  leadText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 28,
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
    marginTop: 18,
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
  timelineItem: {
    flexDirection: "row",
    gap: 18,
    paddingBottom: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
  },
  timelineMain: {
    flex: 1,
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
  itemPeriod: {
    width: 128,
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "right",
    fontWeight: "700",
  },
  pubItem: {
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
  },
  pubContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "flex-start",
  },
  pubPreview: {
    width: 196,
    height: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: "#f8fafb",
    flexShrink: 0,
  },
  pubBody: {
    flex: 1,
    minWidth: 240,
  },
  pubHeader: {
    marginBottom: 4,
  },
  pubTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  pubTag: {
    color: "#d68a00",
  },
  venueText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
    fontStyle: "italic",
  },
  linkRow: {
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  bulletList: {
    marginTop: 10,
    gap: 5,
  },
  bulletText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 23,
  },
  projectList: {
    gap: 14,
  },
  projectItem: {
    paddingBottom: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBorder,
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
