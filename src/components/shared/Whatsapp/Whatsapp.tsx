import { whatsappURL } from "app/utils/whatsappUrl";

export const Whatsapp = () => {
  return (
    <a
      href={whatsappURL}
      rel="nofollow noopener noreferrer"
      target="_blank"
      aria-label="Chatear por WhatsApp con Joan Oviedo"
      className="w-14 h-14 flex flex-col items-center justify-center fixed bottom-4 right-4 z-50 rounded-full bg-jojanes-green shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <span
        className="icon-[akar-icons--whatsapp-fill] text-4xl text-black"
        role="img"
        aria-hidden="true"
      />
      <span className="sr-only">Enviar mensaje por WhatsApp</span>
    </a>
  );
};
