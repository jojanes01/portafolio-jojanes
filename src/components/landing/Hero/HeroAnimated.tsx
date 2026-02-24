"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "app/i18n/routing";
import Image from "next/image";

/* ─── Types ─── */
interface HeroAnimatedProps {
    whatsappURL: string;
    avatarSrc: string;
    avatarAlt: string;
    name: string;
    availableText: string;
    headline: string;
    subheadline: string;
    btnContact: string;
    btnPortfolio: string;
    linkedinUrl: string;
    cvUrl: string;
    mailUrl: string;
    stats: { value: string; label: string }[];
    roles: string[];
}

/* ─── Animated Number Counter ─── */
const AnimatedCounter = ({ target }: { target: string }) => {
    const [display, setDisplay] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const numericMatch = target.match(/[\d.]+/);
        if (!numericMatch) {
            setDisplay(target);
            return;
        }
        const numericValue = parseFloat(numericMatch[0]);
        const suffix = target.replace(numericMatch[0], "");
        const isFloat = target.includes(".");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 1800;
                    const start = performance.now();
                    const animate = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const currentValue = eased * numericValue;
                        setDisplay(
                            (isFloat ? currentValue.toFixed(1) : Math.floor(currentValue).toString()) + suffix
                        );
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{display}</span>;
};

/* ─── Typing Roles ─── */
const TypingRoles = ({ roles }: { roles: string[] }) => {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const role = roles[currentRole];
        const speed = isDeleting ? 40 : 70;
        const pauseAfterTyping = 2200;
        const pauseAfterDeleting = 300;

        const timeout = setTimeout(
            () => {
                if (!isDeleting && displayed.length < role.length) {
                    setDisplayed(role.slice(0, displayed.length + 1));
                } else if (!isDeleting && displayed.length === role.length) {
                    setTimeout(() => setIsDeleting(true), pauseAfterTyping);
                } else if (isDeleting && displayed.length > 0) {
                    setDisplayed(displayed.slice(0, -1));
                } else if (isDeleting && displayed.length === 0) {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                    setTimeout(() => { }, pauseAfterDeleting);
                }
            },
            isDeleting && displayed.length === 0 ? pauseAfterDeleting : speed
        );

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, currentRole, roles]);

    return (
        <span className="text-jojanes-green font-semibold">
            {displayed}
            <span className="animate-pulse">|</span>
        </span>
    );
};

/* ─── Main Component ─── */
export const HeroAnimated = ({
    whatsappURL,
    avatarSrc,
    avatarAlt,
    name,
    availableText,
    headline,
    subheadline,
    btnContact,
    btnPortfolio,
    linkedinUrl,
    cvUrl,
    mailUrl,
    stats,
    roles,
}: HeroAnimatedProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Small delay to trigger entrance animations
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    const baseTransition =
        "transition-all duration-700 ease-out";
    const fadeSlide = mounted
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6";

    return (
        <div className="w-full">

            {/* ── Row: Avatar + Social Icons ── */}
            <div
                className={`${baseTransition} ${fadeSlide} flex flex-row items-center justify-between pt-10 sm:pt-16`}
                style={{ transitionDelay: "0ms" }}
            >
                {/* Avatar info */}
                <div className="flex flex-row space-x-4 items-center">
                    {/* Avatar with green ring pulse */}
                    <div className="relative">
                        <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{
                                background: "rgba(42,233,141,0.15)",
                                animationDuration: "3s",
                            }}
                        />
                        <div
                            className="relative w-[54px] h-[54px] rounded-full overflow-hidden"
                            style={{
                                boxShadow: "0 0 0 2px #2ae98d, 0 0 18px rgba(42,233,141,0.35)",
                            }}
                        >
                            <Image
                                width={108}
                                height={108}
                                src={avatarSrc}
                                alt={avatarAlt}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Name and availability */}
                    <div>
                        <p className="font-semibold text-[#F0F2F1] text-sm sm:text-base">
                            {name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                                className="w-2 h-2 rounded-full bg-jojanes-green animate-pulse inline-block"
                                aria-hidden="true"
                            />
                            <p className="text-xs text-jojanes-green font-medium">
                                {availableText}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex flex-row space-x-2 sm:space-x-3 items-center">
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-[#333333] rounded-full text-[#A0A0A0] hover:text-jojanes-green hover:border-jojanes-green transition-all duration-200 hover:shadow-[0_0_12px_rgba(42,233,141,0.25)]"
                    >
                        <span
                            className="icon-[mdi--linkedin] text-lg sm:text-xl"
                            role="img"
                            aria-hidden="true"
                        />
                    </a>
                    <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download CV"
                        className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-[#333333] rounded-full text-[#A0A0A0] hover:text-jojanes-green hover:border-jojanes-green transition-all duration-200 hover:shadow-[0_0_12px_rgba(42,233,141,0.25)]"
                    >
                        <span
                            className="icon-[pepicons-pop--cv] text-lg sm:text-xl"
                            role="img"
                            aria-hidden="true"
                        />
                    </a>
                    <a
                        href={mailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Send email"
                        className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-[#333333] rounded-full text-[#A0A0A0] hover:text-jojanes-green hover:border-jojanes-green transition-all duration-200 hover:shadow-[0_0_12px_rgba(42,233,141,0.25)]"
                    >
                        <span
                            className="icon-[fa6-solid--envelope] text-base sm:text-[17px]"
                            role="img"
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </div>

            {/* ── Roles typing line ── */}
            <div
                className={`${baseTransition} ${fadeSlide} mt-8 sm:mt-10`}
                style={{ transitionDelay: "100ms" }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222] bg-[#111312] text-sm text-[#6B7B72]">
                    <span
                        className="icon-[tabler--code] text-jojanes-green text-base"
                        aria-hidden="true"
                    />
                    <TypingRoles roles={roles} />
                </div>
            </div>

            {/* ── Main Headline ── */}
            <h1
                className={`${baseTransition} ${fadeSlide} mt-5 font-bold tracking-tight text-[#F0F2F1]`}
                style={{
                    transitionDelay: "180ms",
                    fontSize: "clamp(2.4rem, 6vw, 5rem)",
                    lineHeight: "1.08",
                    letterSpacing: "-0.03em",
                }}
            >
                {headline}
            </h1>

            {/* ── Subheadline ── */}
            <p
                className={`${baseTransition} ${fadeSlide} mt-5 text-[#818c87] text-base sm:text-lg leading-7 max-w-[620px]`}
                style={{ transitionDelay: "260ms" }}
            >
                {subheadline}
            </p>

            {/* ── CTA Buttons ── */}
            <div
                className={`${baseTransition} ${fadeSlide} mt-8 flex flex-row flex-wrap gap-3`}
                style={{ transitionDelay: "340ms" }}
            >
                {/* Primary CTA */}
                <a
                    href={whatsappURL}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-jojanes-green text-[#0A0C0B] font-semibold text-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(42,233,141,0.45)] hover:scale-[1.03] active:scale-[0.98]"
                >
                    <span
                        className="icon-[wpf--calendar] text-base"
                        aria-hidden="true"
                    />
                    {btnContact}
                    {/* Shine effect */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </a>

                {/* Secondary CTA */}
                <Link
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#333] text-[#EAEAEA] font-medium text-sm cursor-pointer transition-all duration-200 hover:border-jojanes-green hover:text-jojanes-green hover:shadow-[0_0_14px_rgba(42,233,141,0.15)] active:scale-[0.98]"
                >
                    <span className="icon-[mdi--web] text-base" aria-hidden="true" />
                    {btnPortfolio}
                </Link>
            </div>

            {/* ── Stats Row ── */}
            <div
                className={`${baseTransition} ${fadeSlide} mt-10 sm:mt-12 flex flex-row flex-wrap gap-6 sm:gap-10`}
                style={{ transitionDelay: "420ms" }}
            >
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                        <p
                            className="font-bold text-[#F0F2F1] tabular-nums"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", letterSpacing: "-0.02em" }}
                        >
                            <AnimatedCounter target={stat.value} />
                        </p>
                        <p className="text-xs text-[#6B7B72] uppercase tracking-widest font-medium">
                            {stat.label}
                        </p>
                    </div>
                ))}

                {/* Thin separator line before stats on desktop */}
                <div
                    aria-hidden="true"
                    className="hidden sm:block self-center h-8 w-px bg-[#222] ml-2"
                />
                <div className="hidden sm:flex items-center gap-2 self-center">
                    <div className="flex -space-x-2">
                        {["G", "M", "W"].map((initial, i) => (
                            <div
                                key={i}
                                className="w-7 h-7 rounded-full border-2 border-[#111] flex items-center justify-center text-[10px] font-bold text-[#0A0C0B]"
                                style={{
                                    background: `hsl(${150 + i * 30}, 70%, 55%)`,
                                }}
                                aria-hidden="true"
                            >
                                {initial}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#6B7B72]">
                        Trusted by <span className="text-[#F0F2F1] font-medium">founders</span> &{" "}
                        <span className="text-[#F0F2F1] font-medium">CTOs</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
