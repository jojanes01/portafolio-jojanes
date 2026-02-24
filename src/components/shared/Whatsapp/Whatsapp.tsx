"use client";
import { whatsappURL } from "app/utils/whatsappUrl";
import { useState } from "react";

export const Whatsapp = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={whatsappURL}
      rel="nofollow noopener noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp with Joan Oviedo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        fixed bottom-5 right-5 z-50
        flex items-center gap-2.5
        h-12 rounded-full
        bg-[#25D366] text-white
        shadow-[0_4px_24px_rgba(37,211,102,0.45)]
        hover:shadow-[0_4px_32px_rgba(37,211,102,0.65)]
        transition-all duration-300 ease-out
        overflow-hidden
      "
      style={{
        width: hovered ? "160px" : "48px",
      }}
    >
      {/* Icon — always visible, centered when collapsed */}
      <span
        className="icon-[akar-icons--whatsapp-fill] text-[22px] flex-shrink-0 ml-[13px]"
        aria-hidden="true"
      />
      {/* Label — fades in on hover */}
      <span
        className={`
          text-sm font-bold whitespace-nowrap pr-4
          transition-all duration-300
          ${hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
        `}
      >
        Let&apos;s talk
      </span>
      <span className="sr-only">Send a WhatsApp message</span>
    </a>
  );
};
