"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────
   SKILLS DATA  — Ordered by category priority & market value
   tag = short context label (how/where it's used, not % score)
───────────────────────────────────────────────────────────── */
const skillsData = [
  /* ── AI & Productivity (differentiator — shown first) ── */
  { name: "Cursor", icon: "icon-[tabler--cursor-text]", color: "#C084FC", category: "AI", tag: "AI pair coding" },
  { name: "Claude Code", icon: "icon-[simple-icons--anthropic]", color: "#D4A27F", category: "AI", tag: "Code assistant" },
  { name: "N8N", icon: "icon-[simple-icons--n8n]", color: "#EA4B71", category: "AI", tag: "Workflows" },
  { name: "MCP", icon: "icon-[tabler--plug-connected]", color: "#A78BFA", category: "AI", tag: "Tool protocol" },
  { name: "RAG", icon: "icon-[tabler--brain]", color: "#818CF8", category: "AI", tag: "LLM pipelines" },
  { name: "AI Agents", icon: "icon-[tabler--robot]", color: "#C084FC", category: "AI", tag: "Integration" },

  /* ── Frontend ── */
  { name: "Next.js", icon: "icon-[file-icons--nextjs]", color: "#FFFFFF", category: "Frontend", tag: "Daily driver" },
  { name: "React", icon: "icon-[mdi--react]", color: "#61DAFB", category: "Frontend", tag: "5+ years" },
  { name: "TypeScript", icon: "icon-[devicon--typescript]", color: "#3178C6", category: "Frontend", tag: "Preferred" },
  { name: "React Native", icon: "icon-[mdi--react]", color: "#61DAFB", category: "Frontend", tag: "Mobile apps" },
  { name: "Tailwind CSS", icon: "icon-[devicon--tailwindcss]", color: "#38BDF8", category: "Frontend", tag: "All projects" },
  { name: "GraphQL", icon: "icon-[logos--graphql]", color: "#E10098", category: "Frontend", tag: "API queries" },

  /* ── Backend ── */
  { name: "Spring Boot", icon: "icon-[devicon--spring]", color: "#6DB33F", category: "Backend", tag: "Enterprise" },
  { name: "Node.js", icon: "icon-[devicon--nodejs]", color: "#339933", category: "Backend", tag: "APIs & scripts" },
  { name: ".NET Core", icon: "icon-[devicon--dotnetcore]", color: "#512BD4", category: "Backend", tag: "REST services" },
  { name: "Python", icon: "icon-[devicon--python]", color: "#3776AB", category: "Backend", tag: "AI & automation" },

  /* ── Cloud & DevOps ── */
  { name: "AWS", icon: "icon-[mdi--aws]", color: "#FF9900", category: "DevOps", tag: "EC2 · S3 · RDS" },
  { name: "Azure", icon: "icon-[devicon--azure]", color: "#0089D6", category: "DevOps", tag: "Teams & CI/CD" },
  { name: "Docker", icon: "icon-[devicon--docker]", color: "#2496ED", category: "DevOps", tag: "Containers" },
  { name: "Kubernetes", icon: "icon-[devicon--kubernetes]", color: "#326CE5", category: "DevOps", tag: "Orchestration" },
  { name: "GitHub Actions", icon: "icon-[devicon--githubactions]", color: "#2088FF", category: "DevOps", tag: "CI/CD pipelines" },
  { name: "Git", icon: "icon-[devicon--git]", color: "#F05032", category: "DevOps", tag: "Every day" },

  /* ── Data & QA ── */
  { name: "PostgreSQL", icon: "icon-[devicon--postgresql]", color: "#4169E1", category: "Data & QA", tag: "Production DBs" },
  { name: "MySQL", icon: "icon-[devicon--mysql]", color: "#4479A1", category: "Data & QA", tag: "OLTP" },
  { name: "Oracle", icon: "icon-[simple-icons--oracle]", color: "#F80000", category: "Data & QA", tag: "Enterprise DB" },
  { name: "Playwright", icon: "icon-[simple-icons--playwright]", color: "#2EAD33", category: "Data & QA", tag: "E2E tests" },
  { name: "Jest", icon: "icon-[devicon--jest]", color: "#C21325", category: "Data & QA", tag: "Unit tests" },
  { name: "Vitest", icon: "icon-[simple-icons--vitest]", color: "#6E9F18", category: "Data & QA", tag: "Fast unit tests" },
  { name: "SonarQube", icon: "icon-[simple-icons--sonarqube]", color: "#4E9BCD", category: "Data & QA", tag: "Code quality" },
  { name: "TDD", icon: "icon-[tabler--target]", color: "#2ae98d", category: "Data & QA", tag: "Test-first" },
  { name: "BDD/Gherkin", icon: "icon-[tabler--test-pipe]", color: "#2ae98d", category: "Data & QA", tag: "Gherkin specs" },
  { name: "Agile/Scrum", icon: "icon-[tabler--refresh]", color: "#6B7B72", category: "Data & QA", tag: "Team process" },
];

/* ─── Category config ─── */
const categories = ["All", "AI", "Frontend", "Backend", "DevOps", "Data & QA"] as const;
type Category = (typeof categories)[number];

const categoryMeta: Record<string, { color: string; icon: string }> = {
  AI: { color: "#C084FC", icon: "icon-[tabler--sparkles]" },
  Frontend: { color: "#2ae98d", icon: "icon-[tabler--layout]" },
  Backend: { color: "#00B8E2", icon: "icon-[tabler--server]" },
  DevOps: { color: "#F59E0B", icon: "icon-[tabler--cloud-upload]" },
  "Data & QA": { color: "#E879F9", icon: "icon-[tabler--database]" },
};

/* ─── Skill card ─── */
const SkillCard = ({
  skill,
  delay,
}: {
  skill: (typeof skillsData)[0];
  delay: number;
}) => {
  const { ref, visible } = useReveal(delay);
  const [hovered, setHovered] = useState(false);
  const catColor = categoryMeta[skill.category]?.color ?? "#2ae98d";

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
        }`}
    >
      <div
        className={`
          group relative flex flex-col gap-3.5 p-4 rounded-xl border bg-[#0D0F0E] cursor-default
          transition-all duration-300
          ${hovered
            ? "border-[#2a2f2c] shadow-[0_0_28px_-6px_rgba(42,233,141,0.12)] -translate-y-0.5"
            : "border-[#1A1F1C]"
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow behind icon on hover */}
        {hovered && (
          <div
            aria-hidden="true"
            className="absolute top-2 left-3 w-10 h-10 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />
        )}

        {/* Icon + category dot */}
        <div className="flex items-center justify-between">
          <span
            className={`${skill.icon} text-2xl sm:text-[28px] transition-transform duration-300 ${hovered ? "scale-110" : ""}`}
            style={{ color: skill.color }}
            aria-hidden="true"
          />
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: catColor }}
            aria-hidden="true"
          />
        </div>

        {/* Name */}
        <p className="text-[#D0D8D4] text-sm font-semibold leading-none" style={{ letterSpacing: "-0.01em" }}>
          {skill.name}
        </p>

        {/* Context tag */}
        <span
          className="inline-flex items-center self-start px-2 py-0.5 rounded text-[10px] font-medium tracking-wide whitespace-nowrap"
          style={{ color: catColor, background: `${catColor}12` }}
        >
          {skill.tag}
        </span>
      </div>
    </div>
  );
};

/* ─── Category filter button ─── */
const FilterBtn = ({
  cat,
  isActive,
  count,
  onClick,
}: {
  cat: Category;
  isActive: boolean;
  count: number;
  onClick: () => void;
}) => {
  const meta = cat === "All" ? { color: "#2ae98d", icon: "icon-[tabler--layout-grid]" } : categoryMeta[cat];
  const color = meta?.color ?? "#2ae98d";

  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`
        inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
        uppercase tracking-wider transition-all duration-200 border cursor-pointer select-none
        ${isActive
          ? "text-[#0A0C0B] border-transparent"
          : "text-[#4B5553] border-[#1E2420] bg-[#0D0F0E] hover:border-[#2a2f2c] hover:text-[#C8D4CF]"
        }
      `}
      style={isActive ? { background: color, boxShadow: `0 0 16px ${color}40` } : {}}
    >
      {meta?.icon && (
        <span className={`${meta.icon} text-sm`} aria-hidden="true" />
      )}
      {cat}
      <span
        className={`ml-0.5 tabular-nums ${isActive ? "opacity-70" : "opacity-40"}`}
      >
        {count}
      </span>
    </button>
  );
};

/* ─── Section ─── */
export const Skills = () => {
  const t = useTranslations("Skills");
  const { ref: headerRef, visible: headerVisible } = useReveal(0);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const countFor = (cat: Category) =>
    cat === "All" ? skillsData.length : skillsData.filter((s) => s.category === cat).length;

  return (
    <section className="max-w-6xl mx-auto sm:mx-auto pb-0 sm:pb-32 px-4 sm:px-0">
      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className={`transition-all duration-700 ease-out mb-10 sm:mb-14 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="icon-[tabler--point-filled] text-jojanes-green text-xl" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#4B5553] font-medium">
            {t("title")}
          </span>
        </div>
        <h2
          className="font-bold text-[#F0F2F1] leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.025em" }}
        >
          Tools I use to{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)" }}
          >
            build great things.
          </span>
        </h2>
        <p className="text-[#4B5553] text-sm sm:text-base mt-3 max-w-xl leading-7">
          {t("description")}
        </p>
      </div>

      {/* ── Category filters ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <FilterBtn
            key={cat}
            cat={cat}
            isActive={activeCategory === cat}
            count={countFor(cat)}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {/* ── Skills grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {filtered.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 30} />
        ))}
      </div>

      {/* ── Bottom note ── */}
      <p className="mt-8 text-[11px] text-[#2D3530] text-center tracking-wide">
        {skillsData.length} skills across {categories.length - 1} domains · Always learning
      </p>
    </section>
  );
};
