import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardContent } from "@/components/dashboard/content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardPage() {
  return (
    // <SidebarProvider
    //   style={
    //     {
    //       "--sidebar-width": "calc(var(--spacing) * 72)",
    //       "--header-height": "calc(var(--spacing) * 12)",
    //     } as React.CSSProperties
    //   }
    // >
    //   <AppSidebar variant="inset" />
    //   <SidebarInset>
    //     <div className=" overflow-hidden lg:p-2 w-full">
    /* <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background"> */ 
// <DashboardHeader />
/* <main className="w-full flex-1 overflow-auto"> */
/* </main> */
/* </div> */
//     </div>
//   </SidebarInset>
// </SidebarProvider>
<>
  <DashboardContent />

</>

  )
}
