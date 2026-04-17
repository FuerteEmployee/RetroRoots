import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const Privacy = () => (
  <Layout title="Privacy Policy" description="Flexicore's privacy policy — how we collect, use, and protect your personal data.">
    <PageHeader title="Privacy Policy" subtitle="How we protect your data" />
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl prose prose-sm">
        {[
          {t:"Information We Collect",c:"We collect personal information such as name, email, phone number, and address when you fill out forms on our website, including contact forms, distributor applications, and career applications."},
          {t:"How We Use Your Information",c:"Your information is used to respond to enquiries, process distributor applications, send relevant updates about our products and services, and improve our website experience."},
          {t:"Data Protection",c:"We implement industry-standard security measures to protect your personal data. All form submissions are encrypted in transit and stored securely. We do not sell or share your personal information with third parties for marketing purposes."},
          {t:"Cookies",c:"Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings."},
          {t:"Third-Party Services",c:"We use Google Analytics for website analytics, Google Maps for our distributor finder, and social media integrations. These services may collect data according to their own privacy policies."},
          {t:"Your Rights",c:"You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at flexicore@yahoo.com. We comply with applicable Indian IT Act provisions and GDPR requirements for EU visitors."},
          {t:"Contact",c:"For privacy-related queries, contact us at: Flexicore, Plot No. 123, Industrial Area, Rajkot, Gujarat 360002, India. Email: flexicore@yahoo.com"},
        ].map(s=>(
          <div key={s.t} className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">{s.t}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.c}</p>
          </div>
        ))}
        <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
