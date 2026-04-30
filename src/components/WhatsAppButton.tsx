import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://api.whatsapp.com/send/?phone=919998388321&text&type=phone_number&app_absent=0"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-primary-foreground" />
  </a>
);

export default WhatsAppButton;
