import { Navbar } from "@presentation/components/layout/Navbar"; // Import Navbar baru
import { Footer } from "../components/layout/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Navbar Fixed */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-0">{children}</main>

      {/* ✅ Footer di sini */}
      <Footer />
    </div>
  );
}
