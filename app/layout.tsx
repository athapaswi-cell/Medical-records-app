import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Epic FHIR Patient App",
  description: "Healthcare Finder - Find hospitals with doctors, insurance plans, and bed availability",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <AuthProvider>
          <Header />
          {/* Main content */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
