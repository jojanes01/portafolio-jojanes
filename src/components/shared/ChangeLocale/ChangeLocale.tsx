"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export const ChangeLocale = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    // Eliminar el locale actual del pathname
    const basePath = pathname.replace(`/${locale}`, "") || "/";

    // Reconstruir la URL con el nuevo locale
    const queryString = searchParams.toString();
    const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

    router.push(`/${newLocale}${newUrl}`);
  };

  return (
    <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-50">
      {locale === "en" ? (
        <button
          onClick={() => handleLocaleChange("es")}
          className="bg-jojanes-green text-black rounded-full w-14 h-14 text-base font-bold shadow-md hover:scale-105 transition-transform"
        >
          <span
            className="icon-[ion--language] text-xl"
            role="img"
            aria-hidden="true"
          />{" "}
          ES
        </button>
      ) : (
        <button
          onClick={() => handleLocaleChange("en")}
          className="bg-jojanes-green text-black rounded-full w-14 h-14 text-base font-bold shadow-md hover:scale-105 transition-transform"
        >
          <span
            className="icon-[ion--language] text-xl"
            role="img"
            aria-hidden="true"
          />{" "}
          EN
        </button>
      )}
    </div>
  );
};
