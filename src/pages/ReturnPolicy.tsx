import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const ReturnPolicy = () => {
  return (
    <Layout title="Return Policy" description="Return policy for RetroRoots.">
      <PageHeader title="Return Policy" subtitle="How our return process works" />
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-8">Last Updated: May 29, 2026</p>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <p>
                We want you to love your purchase! Here's how our return process works.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Return Window:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have 7 days from the date of delivery to request a return</li>
                <li>After 7 days, returns are no longer accepted</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Condition Requirements:</h3>
              <p>To be eligible for a return, your item must be:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unused and in the same condition you received it</li>
                <li>In the original packaging</li>
                <li>With proof of purchase (receipt or order confirmation)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How to Start a Return:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact us at <a href="mailto:hello@retroroots.co.in" className="text-primary hover:underline">hello@retroroots.co.in</a> with your Order ID</li>
                <li>We'll provide return instructions and shipping label (if applicable)</li>
                <li>Package your item securely and ship it back</li>
              </ol>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Return Shipping Costs:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>If return is due to our error (wrong/damaged item):</strong> We cover shipping</li>
                <li><strong>For change-of-mind returns:</strong> Customer pays return shipping</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Exchanges:</h3>
              <p>
                We only replace items if defective or damaged. For exchange, email us and it will be processed within 7 days of receiving the returned item.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Return Address:</h3>
              <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong>RetroRoots</strong><br />
                Star Interior Zone Lane, Opp. Speedwell party plot gate,<br />
                Suvarnabhoomi Chowk, Rajkot 360005<br />
                Gujarat, India
              </address>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReturnPolicy;
