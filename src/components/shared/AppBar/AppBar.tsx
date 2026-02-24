import { getTranslations } from "next-intl/server";
import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";
import { Link } from "app/i18n/routing";

interface AppBarProps {
  title: string;
  subtitle?: string;
  totalCount?: number;
}

export const AppBar = async ({ title, subtitle, totalCount }: AppBarProps) => {
  const t = await getTranslations("Hero");

  return (
    <section className="pt-10 pb-4 sm:pt-14 sm:pb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[11px] text-[#2D3530] uppercase tracking-[0.18em]">
        <Link href="/" className="hover:text-jojanes-green transition-colors duration-200">
          Home
        </Link>
        <span className="icon-[tabler--chevron-right] text-xs" aria-hidden="true" />
        <span className="text-[#4B5553]">{title}</span>
      </div>

      {/* Heading row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1">
          {/* Label */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-jojanes-green flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] text-[#4B5553] uppercase tracking-[0.18em] font-medium">
              Portfolio
            </span>
            {totalCount != null && (
              <>
                <span className="text-[#1E2420]">·</span>
                <span className="text-[11px] text-[#2D3530] tabular-nums">{totalCount} projects</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-bold text-[#F0F2F1] leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            {title}{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)" }}
            >
              &amp; work.
            </span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-[#4B5553] text-sm sm:text-base leading-7 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Avatar chip — desktop only */}
        <div className="hidden sm:flex flex-shrink-0">
          <AvatarChip
            src="/images/perfil.webp"
            alt="Joan Sebastian Oviedo"
            name={<span>Joan Sebastian Oviedo</span>}
            description={t("avatar.description")}
            type="hero"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-[#1A1F1C] via-[#2ae98d20] to-[#1A1F1C]" aria-hidden="true" />
    </section>
  );
};
