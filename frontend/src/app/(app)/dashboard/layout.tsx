import type { Metadata } from "next";import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from "@/components/site-header";
import { DashboardHeader } from "@/components/dashboard/header";
import DashboardGuard from "./DashboardGuard";
// import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | PlaneFlow",
  description: "Personalized dashboard with tasks and projects management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <DashboardGuard>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 56)", // 14rem / 224px
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />

        <div className="flex flex-col h-svh w-full lg:p-2">
          <div className="flex flex-col flex-1 min-h-0 w-full lg:border lg:rounded-md overflow-hidden bg-background">
            <DashboardHeader />

            <div className="flex-1 min-h-0 overflow-y-auto ">
              {children}
            </div>
          </div>
        </div>

      </SidebarProvider>
    </DashboardGuard>
  );
}
