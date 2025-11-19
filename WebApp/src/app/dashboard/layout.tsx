import "../App.scss";
import "../globals.css";
import SidePanel from "@/components/SidePanel";
import { SidebarProvider } from "@/components/SidePanel";
import MainContent from "@/components/MainContent";

export const metadata = {
  title: "TATA Power – Worker Safety Bot",
  description: "TATA Power’s Safety Bot is designed to protect workers, improve well-being, and ensure safer operations across all sites.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidePanel />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
