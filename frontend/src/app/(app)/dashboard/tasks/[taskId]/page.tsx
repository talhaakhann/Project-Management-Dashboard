"use client";

import { useCallback, useEffect, useState } from "react";
import TaskDetail from "@/components/task/task-detail";
import { Task } from "@/types/task.type";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from 'next/navigation'
import { AxiosError } from "axios";
import ApiResponse from "@/types/ApiResponse";

function TaskIdPage() {
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()

  const taskId = params.taskId

  useEffect(() => {
    if (!taskId) return
    setIsLoading(true)
    const fetchTaskById = async () => {
      try {
        const response = await api.get(`/api/tasks/${taskId}`)
        setTask(response.data.data)
        toast.message(response.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<unknown>>;
        const errorMessage = axiosError.response?.data?.message;
        toast.error(errorMessage);
      } finally {
        setIsLoading(false)
      }
    }
    fetchTaskById()
  }, [taskId])


  const deleteTask = useCallback(async (taskId: string): Promise<void> => {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`)
      router.push("/dashboard/tasks")
      toast.message(response.data.message)
    } catch (error) {
      const AxiosError = error as AxiosError<ApiResponse<unknown>>
      let errorMessage = AxiosError.response?.data.message

      toast("Failed to delete the task",
        {
          description: errorMessage
        })
    }
  }, [])

  // onUpdate: async (updates: any) => {
  //   /* update task */
  // },


  return (
    <TaskDetail
      task={task}
      isLoading={isLoading}
      onDelete={deleteTask}
    />
  );
}

export default TaskIdPage