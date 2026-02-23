"use client";
import { Link } from "app/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface AvatarChipProps {
  src: string;
  alt: string;
  name: string | React.ReactNode;
  description: string;
  type: "hero" | "avatar" | "blog";
}

export const AvatarChip = ({
  src,
  alt,
  name,
  description,
  type,
}: AvatarChipProps) => {
  const t = useTranslations("Hero");
  return (
    <div className="flex flex-row space-x-4 items-center text-jojanes-white">
      {/* Wrapper para asegurar el tamaño y redondeo */}
      <div
        className={`flex flex-row items-center justify-center ${type === "blog" ? "w-[36px] h-[36px]" : "w-[50px] h-[50px]"} rounded-full overflow-hidden bg-black`}
      >
        <Image
          width={108}
          height={108}
          src={src}
          alt={alt} // ✅ Mantiene accesibilidad para la imagen
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className={`font-semibold ${type === "blog" && "text-xs"}`}>
          {name}
        </p>
        <div className="flex flex-row items-center">
          {type === "hero" && (
            <span
              className="icon-[tabler--point-filled] text-jojanes-green"
              role="img"
              aria-hidden="true"
            />
          )}
          <p className="font-light text-xs">{description}</p>
        </div>
      </div>
      {type === "hero" && (
        <div className="flex flex-row space-x-2 sm:space-x-4 items-center">
          <Link
            href="https://www.linkedin.com/in/jojanes/?locale=en_US"
            target="_blank"
            aria-label="Ir al perfil de LinkedIn de Joan Oviedo"
          >
            <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-jojanes-border rounded-full cursor-pointer hover:text-jojanes-green hover:border-jojanes-green">
              <span
                className="icon-[mdi--linkedin] text-lg sm:text-2xl"
                role="img"
                aria-hidden="true"
              />
            </div>
          </Link>
          <a
            target="_blank"
            href={t("cv")}
            aria-label="Descargar el currículum de Joan Oviedo"
          >
            <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-jojanes-border rounded-full cursor-pointer hover:text-jojanes-green hover:border-jojanes-green">
              <span
                className="icon-[pepicons-pop--cv] text-lg sm:text-xl"
                role="img"
                aria-hidden="true"
              />
            </div>
          </a>
          <Link
            target="_blank"
            href={t("mail")}
            aria-label="Enviar un correo a Joan Oviedo"
          >
            <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-jojanes-border rounded-full cursor-pointer hover:text-jojanes-green hover:border-jojanes-green">
              <span
                className="icon-[fa6-solid--envelope] text-lg sm:text-xl"
                role="img"
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
