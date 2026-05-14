import React from "react";
import htm from "htm";
import {
  ImageBackground,
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
const heroImage = new URL("../assets/academic-hero.png", import.meta.url).href;

function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function LinkButton({ item }) {
  const isPrimary = item.variant === "primary";
  return html`
    <${Pressable}
      accessibilityRole="link"
      onPress=${() => openUrl(item.url)}
      style=${[
        styles.linkButton,
        isPrimary ? styles.linkButtonPrimary : styles.linkButtonSecondary,
      ]}
    >
      <${Text}
        style=${[
          styles.linkButtonText,
          isPrimary ? styles.linkButtonTextPrimary : styles.linkButtonTextSecondary,
        ]}
      >
        ${item.label}
      </${Text}>
    </${Pressable}>
  `;
}

function NavItem({ id, label }) {
  return html`
    <${Pressable} onPress=${() => scrollToSection(id)} style=${styles.navItem}>
      <${Text} style=${styles.navText}>${label}</${Text}>
    </${Pressable}>
  `;
}

function Navigation({ compact }) {
  const items = [
    ["research", "Research"],
    ["publications", "Publications"],
    ["projects", "Projects"],
    ["contact", "Contact"],
  ];

  return html`
    <${View} style=${[styles.nav, compact ? styles.navCompact : null]}>
      <${View}>
        <${Text} style=${styles.navName}>${profile.name}</${Text}>
        <${Text} style=${styles.navRole}>${profile.eyebrow}</${Text}>
      </${View}>
      <${View} style=${[styles.navLinks, compact ? styles.navLinksCompact : null]}>
        ${items.map(
          ([id, label]) => html`<${NavItem} key=${id} id=${id} label=${label} />`,
        )}
      </${View}>
    </${View}>
  `;
}

function StatStrip({ compact }) {
  return html`
    <${View} style=${[styles.statStrip, compact ? styles.statStripCompact : null]}>
      ${profile.stats.map(
        (stat) => html`
          <${View} key=${stat.label} style=${styles.statItem}>
            <${Text} style=${styles.statValue}>${stat.value}</${Text}>
            <${Text} style=${styles.statLabel}>${stat.label}</${Text}>
          </${View}>
        `,
      )}
    </${View}>
  `;
}

function Hero({ compact }) {
  return html`
    <${ImageBackground}
      source=${{ uri: heroImage }}
      resizeMode="cover"
      style=${[styles.hero, compact ? styles.heroCompact : null]}
      imageStyle=${styles.heroImage}
    >
      <${View} style=${styles.heroShade}>
        <${View} style=${styles.heroInner}>
          <${Text} style=${styles.kicker}>${profile.eyebrow}</${Text}>
          <${Text}
            accessibilityRole="header"
            style=${[styles.heroTitle, compact ? styles.heroTitleCompact : null]}
          >
            ${profile.name}
          </${Text}>
          <${Text} style=${styles.heroSubtitle}>${profile.role}</${Text}>
          <${Text} style=${styles.heroMeta}>
            ${profile.affiliation} | ${profile.location}
          </${Text}>
          <${Text} style=${[styles.heroCopy, compact ? styles.heroCopyCompact : null]}>
            ${profile.summary}
          </${Text}>
          <${View} style=${styles.heroActions}>
            ${profile.links.map(
              (item) => html`<${LinkButton} key=${item.label} item=${item} />`,
            )}
          </${View}>
        </${View}>
      </${View}>
    </${ImageBackground}>
  `;
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return html`
    <${View} style=${styles.sectionHeading}>
      <${Text} style=${styles.sectionEyebrow}>${eyebrow}</${Text}>
      <${Text} accessibilityRole="header" style=${styles.sectionTitle}>${title}</${Text}>
      <${Text} style=${styles.sectionSubtitle}>${subtitle}</${Text}>
    </${View}>
  `;
}

function Tag({ label }) {
  return html`
    <${View} style=${styles.tag}>
      <${Text} style=${styles.tagText}>${label}</${Text}>
    </${View}>
  `;
}

function ResearchCard({ item, compact }) {
  return html`
    <${View} style=${[styles.card, compact ? styles.cardFull : styles.cardThird]}>
      <${Text} style=${styles.cardTitle}>${item.title}</${Text}>
      <${Text} style=${styles.cardDescription}>${item.description}</${Text}>
      <${View} style=${styles.tagRow}>
        ${item.tags.map((tag) => html`<${Tag} key=${tag} label=${tag} />`)}
      </${View}>
    </${View}>
  `;
}

function PublicationItem({ item }) {
  return html`
    <${View} style=${styles.publication}>
      <${View} style=${styles.publicationAccent} />
      <${View} style=${styles.publicationBody}>
        <${Text} style=${styles.publicationTitle}>${item.title}</${Text}>
        <${Text} style=${styles.publicationAuthors}>${item.authors}</${Text}>
        <${Text} style=${styles.publicationVenue}>${item.venue}</${Text}>
        <${Text} style=${styles.publicationStatus}>${item.status}</${Text}>
      </${View}>
    </${View}>
  `;
}

function ProjectItem({ item }) {
  return html`
    <${View} style=${styles.projectItem}>
      <${Text} style=${styles.projectTitle}>${item.name}</${Text}>
      <${Text} style=${styles.projectDetail}>${item.detail}</${Text}>
    </${View}>
  `;
}

function TimelineItem({ item }) {
  return html`
    <${View} style=${styles.timelineItem}>
      <${Text} style=${styles.timelineYear}>${item.year}</${Text}>
      <${View} style=${styles.timelineBody}>
        <${Text} style=${styles.timelineTitle}>${item.title}</${Text}>
        <${Text} style=${styles.timelineDetail}>${item.detail}</${Text}>
      </${View}>
    </${View}>
  `;
}

export function App() {
  const { width } = useWindowDimensions();
  const compact = width < 820;

  return html`
    <${ScrollView} style=${styles.scroll} contentContainerStyle=${styles.page}>
      <${Navigation} compact=${compact} />
      <${Hero} compact=${compact} />

      <${View} style=${styles.content}>
        <${StatStrip} compact=${compact} />

        <${View} nativeID="research" style=${styles.section}>
          <${SectionHeading}
            eyebrow="Research"
            title="Research Interests"
            subtitle="A concise view of the themes, methods, and questions this homepage can foreground."
          />
          <${View} style=${[styles.cardGrid, compact ? styles.cardGridCompact : null]}>
            ${profile.research.map(
              (item) => html`
                <${ResearchCard}
                  key=${item.title}
                  item=${item}
                  compact=${compact}
                />
              `,
            )}
          </${View}>
        </${View}>

        <${View} nativeID="publications" style=${styles.section}>
          <${SectionHeading}
            eyebrow="Publications"
            title="Selected Work"
            subtitle="Keep the list selective, linkable, and easy for collaborators or committees to scan."
          />
          <${View} style=${styles.publicationList}>
            ${profile.publications.map(
              (item) => html`<${PublicationItem} key=${item.title} item=${item} />`,
            )}
          </${View}>
        </${View}>

        <${View}
          nativeID="projects"
          style=${[styles.sectionSplit, compact ? styles.sectionSplitCompact : null]}
        >
          <${View} style=${styles.splitColumn}>
            <${SectionHeading}
              eyebrow="Projects"
              title="Current Projects"
              subtitle="Highlight prototypes, datasets, field studies, or tools that help readers understand your work."
            />
            <${View} style=${styles.projectList}>
              ${profile.projects.map(
                (item) => html`<${ProjectItem} key=${item.name} item=${item} />`,
              )}
            </${View}>
          </${View}>
          <${View} style=${styles.splitColumn}>
            <${SectionHeading}
              eyebrow="Timeline"
              title="Academic Path"
              subtitle="Use this area for positions, degrees, awards, teaching, and service."
            />
            <${View} style=${styles.timeline}>
              ${profile.timeline.map(
                (item) => html`<${TimelineItem} key=${item.year + item.title} item=${item} />`,
              )}
            </${View}>
          </${View}>
        </${View}>

        <${View}
          nativeID="contact"
          style=${[styles.contactSection, compact ? styles.contactSectionCompact : null]}
        >
          <${View} style=${styles.contactCopy}>
            <${Text} style=${styles.sectionEyebrow}>Contact</${Text}>
            <${Text} style=${styles.contactTitle}>Let's connect</${Text}>
            <${Text} style=${styles.contactText}>
              For collaboration, research discussions, or academic opportunities, use the links below.
            </${Text}>
          </${View}>
          <${View} style=${styles.contactLinks}>
            ${profile.links.map(
              (item) => html`<${LinkButton} key=${item.label} item=${item} />`,
            )}
          </${View}>
        </${View}>
      </${View}>
    </${ScrollView}>
  `;
}

const colors = {
  ink: "#17202a",
  muted: "#647083",
  paper: "#ffffff",
  line: "#dfe5ec",
  teal: "#0d766e",
  tealSoft: "#e3f4f2",
  wine: "#8b2842",
  gold: "#b7791f",
};

const styles = StyleSheet.create({
  scroll: {
    minHeight: "100vh",
    backgroundColor: "#f6f7fb",
  },
  page: {
    minHeight: "100vh",
  },
  nav: {
    width: "100%",
    maxWidth: 1180,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navCompact: {
    alignItems: "flex-start",
    gap: 16,
    flexDirection: "column",
  },
  navName: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  navRole: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navLinksCompact: {
    flexWrap: "wrap",
  },
  navItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  navText: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  hero: {
    minHeight: 590,
    width: "100%",
  },
  heroCompact: {
    minHeight: 560,
  },
  heroImage: {
    backgroundColor: "#142333",
  },
  heroShade: {
    minHeight: "100%",
    backgroundColor: "rgba(9, 18, 29, 0.56)",
    justifyContent: "center",
  },
  heroInner: {
    width: "100%",
    maxWidth: 1180,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingVertical: 72,
  },
  kicker: {
    alignSelf: "flex-start",
    color: "#d9f2ef",
    backgroundColor: "rgba(13, 118, 110, 0.68)",
    borderColor: "rgba(255, 255, 255, 0.22)",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 64,
    lineHeight: 72,
    fontWeight: "800",
    marginTop: 22,
    maxWidth: 780,
  },
  heroTitleCompact: {
    fontSize: 44,
    lineHeight: 52,
  },
  heroSubtitle: {
    color: "#f6fafb",
    fontSize: 22,
    lineHeight: 31,
    fontWeight: "700",
    marginTop: 16,
    maxWidth: 760,
  },
  heroMeta: {
    color: "#d6e0e8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    maxWidth: 760,
  },
  heroCopy: {
    color: "#eef5f5",
    fontSize: 18,
    lineHeight: 30,
    marginTop: 24,
    maxWidth: 680,
  },
  heroCopyCompact: {
    fontSize: 16,
    lineHeight: 26,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 32,
  },
  linkButton: {
    borderRadius: 7,
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  linkButtonPrimary: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },
  linkButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.42)",
  },
  linkButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  linkButtonTextPrimary: {
    color: "#ffffff",
  },
  linkButtonTextSecondary: {
    color: "#ffffff",
  },
  content: {
    width: "100%",
    maxWidth: 1180,
    marginHorizontal: "auto",
    paddingHorizontal: 24,
    paddingBottom: 70,
  },
  statStrip: {
    marginTop: -42,
    backgroundColor: colors.paper,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    overflow: "hidden",
  },
  statStripCompact: {
    flexDirection: "column",
    marginTop: -28,
  },
  statItem: {
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRightWidth: 1,
    borderColor: colors.line,
  },
  statValue: {
    color: colors.ink,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
    fontWeight: "600",
  },
  section: {
    paddingTop: 78,
  },
  sectionHeading: {
    maxWidth: 740,
    marginBottom: 26,
  },
  sectionEyebrow: {
    color: colors.wine,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 26,
    marginTop: 10,
  },
  cardGrid: {
    flexDirection: "row",
    gap: 16,
  },
  cardGridCompact: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: colors.paper,
    borderRadius: 8,
    borderColor: colors.line,
    borderWidth: 1,
    padding: 22,
    minHeight: 220,
  },
  cardThird: {
    flex: 1,
  },
  cardFull: {
    width: "100%",
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: "auto",
    paddingTop: 18,
  },
  tag: {
    backgroundColor: colors.tealSoft,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    color: colors.teal,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  publicationList: {
    gap: 14,
  },
  publication: {
    backgroundColor: colors.paper,
    borderRadius: 8,
    borderColor: colors.line,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  publicationAccent: {
    width: 6,
    backgroundColor: colors.gold,
  },
  publicationBody: {
    flex: 1,
    padding: 22,
  },
  publicationTitle: {
    color: colors.ink,
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
  },
  publicationAuthors: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  publicationVenue: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    marginTop: 6,
  },
  publicationStatus: {
    color: colors.wine,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  sectionSplit: {
    paddingTop: 78,
    flexDirection: "row",
    gap: 34,
  },
  sectionSplitCompact: {
    flexDirection: "column",
  },
  splitColumn: {
    flex: 1,
  },
  projectList: {
    gap: 14,
  },
  projectItem: {
    borderLeftWidth: 4,
    borderLeftColor: colors.teal,
    backgroundColor: colors.paper,
    borderRadius: 8,
    borderColor: colors.line,
    borderWidth: 1,
    padding: 20,
  },
  projectTitle: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
  },
  projectDetail: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
  },
  timeline: {
    gap: 14,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
  },
  timelineYear: {
    width: 64,
    color: colors.wine,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "800",
  },
  timelineBody: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingBottom: 18,
  },
  timelineTitle: {
    color: colors.ink,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "800",
  },
  timelineDetail: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 6,
  },
  contactSection: {
    marginTop: 80,
    borderRadius: 8,
    backgroundColor: colors.ink,
    padding: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  contactSectionCompact: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  contactCopy: {
    flex: 1,
  },
  contactTitle: {
    color: "#ffffff",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
  },
  contactText: {
    color: "#d6e0e8",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
    maxWidth: 620,
  },
  contactLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
