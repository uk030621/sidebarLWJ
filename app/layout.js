import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Responsive Sidebar with Hamburger",
  description: "Next.js example with Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 mt-6">{children}</main>
      </body>
    </html>
  );
}
