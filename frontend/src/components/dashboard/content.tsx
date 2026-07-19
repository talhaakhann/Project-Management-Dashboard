"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { StatsCards } from "./stats-card";
import { TodaysTasks } from "./today-tasks";
import { PerformanceChart } from "./performance-chart";
import { ProjectsTable } from "./projects-table";
import { useAppSelector } from "@/store/hook";
import { WelcomeSummary, DashboardStats, todayTasks, dashboardProject } from "@/app/(app)/dashboard/page";
import { DashboardContentSkeleton } from "../skeletons/dashboard-content-skeleton";
import { useRouter } from "next/navigation";


interface DashboardContentProps {
  summary: WelcomeSummary | null;
  isLoading: boolean,
  stats: DashboardStats | null;
  tasks: todayTasks[];
  projects: dashboardProject[]
}


export function DashboardContent({
  summary,
  isLoading,
  stats,
  tasks,
  projects
}: DashboardContentProps) {
  // const { tasksDueToday, overdueTasks, upcomingDeadlines } =
  //   summary;
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()


  if (isLoading) {
    return (
      <DashboardContentSkeleton />
    )
  }


  return (
    <main className="w-full h-full overflow-x-hidden overflow-y-auto p-4">
      <div className="mx-auto w-full space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Welcome Back, {user?.fullName && user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}! 👋
            </h1>

            <p className="mt-0.5 text-sm text-muted-foreground">
              {summary?.tasksDueToday ?? 0} Tasks Due Today,
              {" "}
              {summary?.overdueTasks ?? 0} Overdue Tasks,
              {" "}
              {summary?.upcomingDeadlines ?? 0} Upcoming Deadlines (This Week)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => router.push("/dashboard/projects/create")}
            >
              <HugeiconsIcon
                icon={Add01Icon}
                className="size-4"
              />
              New
            </Button>
          </div>
        </div>



        {stats && <StatsCards stats={stats} />}


        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-6">


          <div className="lg:col-span-2">

            <TodaysTasks todayTasks={tasks} />

          </div>


          <div>

            <PerformanceChart />

          </div>
        </div>



        <ProjectsTable project={projects} />

      </div>
    </main>
  );
} 