"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WORKFLOW_STEPS } from "app/content/ai-workflow";
const baseTransition = "transition-all duration-600 ease-out";

export function WorkflowSteps() {
  const tSteps = useTranslations("Workflow.steps");
  const t = useTranslations("Workflow");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const sortedSteps = [...WORKFLOW_STEPS].sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <h2
          className="font-bold text-jojanes-white mb-10"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          {t("stepsTitle")}
        </h2>

        <ul className="flex flex-col gap-4">
          {sortedSteps.map((step, index) => {
            const title = tSteps(`${step.id}.title`);
            const description = tSteps(`${step.id}.description`);
            const delay = 40 * index;
            const fadeSlide = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

            return (
              <li
                key={step.id}
                className={`${baseTransition} ${fadeSlide} flex gap-4 p-4 sm:p-5 rounded-xl border border-jojanes-border bg-jojanes-dark/80 hover:border-jojanes-green/30 hover:shadow-[0_0_20px_rgba(42,233,141,0.06)]`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-jojanes-green/10 text-jojanes-green border border-jojanes-green/20"
                  aria-hidden="true"
                >
                  <span className={step.icon} style={{ fontSize: "1.25rem" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-jojanes-white text-base sm:text-lg mb-1">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-jojanes-white-muted leading-relaxed">
                    {description}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 text-xs font-mono text-jojanes-green/70 tabular-nums"
                  aria-hidden="true"
                >
                  {String(step.order).padStart(2, "0")}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
