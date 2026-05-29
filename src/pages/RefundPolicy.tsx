import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const RefundPolicy = () => {
  return (
    <Layout title="Refund Policy" description="Refund policy for RetroRoots.">
      <PageHeader title="Refund Policy" subtitle="Understanding our refund terms" />
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-8">Last Updated: May 29, 2026</p>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <p>
                At RetroRoots, we want you to be completely satisfied with your purchase. This policy explains our refund terms.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Eligibility for Refunds:</h3>
              <p>You are eligible for a refund if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The item received is damaged or defective</li>
                <li>The wrong item was sent</li>
                <li>The item is significantly not as described</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Refund Timeframe:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds will be processed within 7-10 business days after we receive and inspect the returned item</li>
                <li>The refund will be credited to your original payment method</li>
                <li>It may take additional time for your bank to process the refund</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Non-Refundable Items:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sale items (unless damaged/defective)</li>
                <li>Gift cards</li>
                <li>Downloadable digital products once accessed</li>
                <li>Personalized or custom-made items</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How to Request a Refund:</h3>
              <p>
                Contact us at <a href="mailto:hello@retroroots.co.in" className="text-primary hover:underline">hello@retroroots.co.in</a> or <strong>+91-9624726247</strong> with your Order ID and photos of the issue.
              </p>
              <p className="font-bold">
                Once approved, your refund will be processed automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
