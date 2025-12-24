import { MessageCircle } from "lucide-react";
const WhatsAppButton = () => {
  const phoneNumber = "923412359702";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 animate-pulse-glow group" aria-label="Contact us on WhatsApp">
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us!
      </span>
    </a>;
};
export default WhatsAppButton;