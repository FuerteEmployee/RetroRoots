import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const Delivery = () => {
  return (
    <Layout title="Delivery & Shipping Information" description="Shipping and delivery information for RetroRoots.">
      <PageHeader title="Delivery Information" subtitle="Everything you need to know about shipping" />
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-8">Last Updated: May 29, 2026</p>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Areas:</h3>
              <p>We ship to all locations across India.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Processing Time:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Orders processed within 1-2 business days after confirmation</li>
                <li>Orders placed before 2 PM IST typically processed same day</li>
                <li>Weekend/holiday orders processed next business day</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Delivery Timeframes:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rajkot & Gujarat</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-4 business days</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Metro Cities</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-5 business days</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Other India</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-7 business days</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Remote Areas</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7-10 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Costs:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Charge</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Above ₹499</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">FREE</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Below ₹499</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹49</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Methods:</h3>
              <p>We partner with Delhivery, BlueDart, Ecom Express.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Order Tracking:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You'll receive tracking ID via SMS and email once shipped</li>
                <li>Track your order on our website or courier's website</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Damaged or Missing Items:</h3>
              <p>If you receive damaged, missing, or wrong item:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us within 24 hours with photos</li>
                <li>Claims after delivery day will not be entertained</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Address:</h3>
              <p>Please ensure your address is accurate. We are not responsible for incorrect addresses provided by customer.</p>

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

export default Delivery;
