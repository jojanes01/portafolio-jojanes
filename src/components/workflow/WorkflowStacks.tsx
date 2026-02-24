"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WORKFLOW_STACKS } from "app/content/ai-workflow";
const baseTransition = "transition-all duration-600 ease-out";

export function WorkflowStacks() {
  const t = useTranslations("Workflow");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fadeSlide = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

  return (
    <section className="relative py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <h2
          className={`${baseTransition} ${fadeSlide} font-bold text-jojanes-white mb-2`}
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          {t("stacksTitle")}
        </h2>
        <p
          className={`${baseTransition} ${fadeSlide} text-jojanes-white-muted text-sm sm:text-base mb-10 max-w-2xl`}
          style={{ transitionDelay: "60ms" }}
        >
          {t("stacksSubtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WORKFLOW_STACKS.map((stack, index) => {
            const delay = 80 + index * 60;
            const itemFade = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
            const description = t(`stacks.${stack.id}.description`);
            const name = t(`stacks.${stack.id}.name`);

            return (
              <article
                key={stack.id}
                className={`${baseTransition} ${itemFade} p-5 sm:p-6 rounded-xl border border-jojanes-border bg-jojanes-dark/80 hover:border-jojanes-green/25 hover:shadow-[0_0_24px_rgba(42,233,141,0.06)]`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center bg-jojanes-green/10 text-jojanes-green border border-jojanes-green/20"
                    aria-hidden="true"
                  >
                    <span className={stack.icon} style={{ fontSize: "1.35rem" }} />
                  </div>
                  <h3 className="font-semibold text-jojanes-white text-lg">{name}</h3>
                </div>
                <p className="text-sm text-jojanes-white-muted leading-relaxed pl-14 sm:pl-0">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
