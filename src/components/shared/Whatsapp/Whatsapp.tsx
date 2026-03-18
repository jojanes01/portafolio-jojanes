import { whatsappURL } from "app/utils/whatsappUrl";

export const Whatsapp = () => {
  return (
    <a
      href={whatsappURL}
      rel="nofollow noopener noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp with Joan Oviedo"
      className="
        group fixed bottom-5 right-5 z-50
        flex items-center gap-2.5
        h-12 w-[48px] hover:w-[160px] rounded-full
        bg-[#25D366] text-white
        shadow-[0_4px_24px_rgba(37,211,102,0.45)]
        hover:shadow-[0_4px_32px_rgba(37,211,102,0.65)]
        transition-all duration-300 ease-out
        overflow-hidden
      "
    >
      {/* Icon — always visible, centered when collapsed */}
      <span
        className="icon-[akar-icons--whatsapp-fill] text-[22px] flex-shrink-0 ml-[13px]"
        aria-hidden="true"
      />
      {/* Label — fades in on hover */}
      <span
        className="
          text-sm font-bold whitespace-nowrap pr-4
          transition-all duration-300
          opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
        "
      >
        Let&apos;s talk
      </span>
      <span className="sr-only">Send a WhatsApp message</span>
    </a>
  );
};
