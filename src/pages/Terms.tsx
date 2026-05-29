import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const Terms = () => {
  return (
    <Layout title="Terms & Conditions" description="Terms and conditions for using RetroRoots.">
      <PageHeader title="Terms & Conditions" subtitle="Guidelines for using our website" />
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-8">Last Updated: May 29, 2026</p>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <p>
                Welcome to RetroRoots! These Terms govern your use of our website and purchases.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h3>
              <p>
                By accessing or purchasing from retroroots.co.in, you agree to these Terms. If you disagree, do not use our website.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Product Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>We strive for accurate product descriptions, colors, and pricing</li>
                <li>Product availability is subject to stock</li>
                <li>We reserve the right to correct pricing errors</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Pricing & Payment</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in INR and include GST where applicable</li>
                <li>Prices may change without notice</li>
                <li>Full payment required before order processing</li>
                <li>We accept: UPI, Credit/Debit Cards, Net Banking, COD</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Orders & Availability</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All orders subject to product availability</li>
                <li>We may refuse or cancel any order for any reason</li>
                <li>Order confirmation email does not guarantee acceptance</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property</h3>
              <p>
                All content on this website (logos, text, images, designs) is owned by RetroRoots. You may not reproduce without permission.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Cancellation Policy</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may cancel your order within 24 hours of placement</li>
                <li>Once shipped, cancellation is not possible (you may return after delivery)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Governing Law</h3>
              <p>
                These terms are governed by laws of India. Disputes subject to jurisdiction of courts in Rajkot, Gujarat.
              </p>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Contact Us</h4>
                <p>Email: <a href="mailto:hello@retroroots.co.in" className="text-primary hover:underline">hello@retroroots.co.in</a></p>
                <p>Phone: <strong>+91-9624726247</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
