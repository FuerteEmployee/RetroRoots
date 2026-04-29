import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => (
  <>
    <Helmet>
      <title>{title ? `${title} | RetroRoots` : "RetroRoots — Premium Solid Surface & Tiles Manufacturer"}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />

  </>
);

export default Layout;
