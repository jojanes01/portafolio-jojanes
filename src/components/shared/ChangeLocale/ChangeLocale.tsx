"use client";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useLocale } from "next-intl";

export const ChangeLocale = () => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const locale = useLocale();

  // const toggle = () => {
  //   const next = locale === "en" ? "es" : "en";
  //   const base = pathname.replace(`/${locale}`, "") || "/";
  //   const qs = searchParams.toString();
  //   router.push(`/${next}${qs ? `${base}?${qs}` : base}`);
  // };

  // This standalone floating button is hidden — locale toggle is now
  // integrated directly inside the Header component for a cleaner UX.
  // We keep this file to avoid breaking existing imports in layout.tsx.
  return null;
};
