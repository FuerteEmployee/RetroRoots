import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What makes Retro Roots furniture unique?",
    answer: "At Retro Roots, we blend the charm of vintage design with the comfort of modern innovation. Every piece is handcrafted using premium materials, ensuring timeless beauty, durability, and exceptional comfort that complements your lifestyle."
  },
  {
    question: "Can I customize the size, fabric, or color of my sofa or chair?",
    answer: "Yes! We offer customization options on most of our products. You can choose from a variety of fabrics, colors, finishes, and sizes to perfectly match your interior theme and personal style."
  },
  {
    question: "Do you offer home delivery and installation?",
    answer: "Absolutely. We provide doorstep delivery and professional installation to ensure your furniture is placed safely and perfectly in your space. Our team handles everything — from unpacking to setup — with utmost care."
  },
  {
    question: "How do I maintain my Retro Roots furniture?",
    answer: "To keep your furniture looking beautiful for years: Dust regularly with a soft, dry cloth. Avoid direct sunlight and moisture exposure. Use mild cleaners for fabric and leather surfaces. For wooden parts, occasional polishing enhances longevity."
  },
  {
    question: "What is the warranty and return policy?",
    answer: "All Retro Roots products come with a standard warranty covering manufacturing defects. If you receive a damaged or defective item, contact our support team within the specified time, and we’ll arrange a replacement or repair promptly."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-black uppercase tracking-widest mb-2 font-outfit">Products & Services</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-outfit">
            Product Related <span className="font-bold">Queries</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-border rounded-xl bg-card overflow-hidden transition-all duration-300 ${openIndex === index ? "shadow-md ring-1 ring-primary/20" : ""
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
              >
                <span className="font-semibold text-foreground md:text-lg pr-4 font-outfit">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="p-5 pt-0 text-muted-foreground border-t border-border/50 text-sm md:text-base leading-relaxed font-outfit">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
