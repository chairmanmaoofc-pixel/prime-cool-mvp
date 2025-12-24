import { MessageCircle } from "lucide-react";

const PHONE_NUMBER = "923412359702";

export const openWhatsApp = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  const whatsappUrl = message 
    ? `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`
    : `https://wa.me/${PHONE_NUMBER}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

const WhatsAppButton = () => {
  return (
    <button
      onClick={() => openWhatsApp("Hello! I'm interested in your AC services.")}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 animate-pulse-glow group cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us!
      </span>
    </button>
  );
};

export default WhatsAppButton;