import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import AuthInitializer from "./AuthInitializer";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardContent } from "@/components/dashboard/content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from "@/components/site-header";

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
  title: "Taskplus Dashboard - Square UI",
  description: "Taskplus dashboard with tasks and projects management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
         style={
           {
             "--sidebar-width": "calc(var(--spacing) * 72)",
             "--header-height": "calc(var(--spacing) * 12)",
           } as React.CSSProperties
         }
       >
         <AppSidebar variant="inset" />
         <SidebarInset>
           <div className=" overflow-hidden lg:p-2 w-full">
             
             <SiteHeader />
             
             <AuthInitializer>
               {children}
             </AuthInitializer>
            
             </div>
         
         </SidebarInset>
       </SidebarProvider>
  );
}
