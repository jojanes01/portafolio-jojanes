import { getTranslations } from "next-intl/server";
import { whatsappURL } from "app/utils/whatsappUrl";
import { HeroAnimated } from "./HeroAnimated";
import { TechCarrusel } from "./TechCarrusel";

export const Hero = async () => {
  const t = await getTranslations("Hero");

  const stats = [
    { value: "5+", label: "Years of Experience" },
    { value: "1M+", label: "Monthly Users Reached" },
    { value: "20+", label: "Projects Delivered" },
    { value: "3", label: "Countries Worked In" },
  ];

  const roles = [
    "Senior Fullstack Developer",
    "Next.js & React Specialist",
    "Spring Boot Architect",
    "SEO & Performance Expert",
  ];

  return (
    /*
     * Outer wrapper: full-width, no overflow-hidden so the ambient glow
     * bleeds naturally into the page background (#0e100f).
     * The gradient at the bottom fades the Hero into the rest of the page.
     */
    <section className="relative w-full overflow-hidden pb-16 sm:pb-24">
      {/* ── Ambient glow blobs — full-width, unrestricted ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(42,233,141,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(42,233,141,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Content container — constrained like the rest of the site ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <HeroAnimated
          whatsappURL={whatsappURL}
          avatarSrc="/images/perfil.webp"
          avatarAlt={t("avatar.alt")}
          name="Joan Sebastian Oviedo"
          availableText={t("avatar.description")}
          headline={t("headline")}
          subheadline={t("subheadline")}
          btnContact={t("buttons.getStarted")}
          btnPortfolio={t("buttons.viewPortfolio")}
          linkedinUrl={t("linkedin")}
          cvUrl={t("cv")}
          mailUrl={t("mail")}
          stats={stats}
          roles={roles}
        />

        {/* Tech stack infinite scroll carousel */}
        <TechCarrusel />
      </div>

      {/* ── Bottom fade: blends Hero into the rest of the page ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0e100f 100%)",
        }}
      />
    </section>
  );
};
