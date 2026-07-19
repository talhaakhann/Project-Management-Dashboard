"use client";

import {
    Calendar,
    FileText,
    MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { Task, TaskAssignee, TaskPriority, TaskStatus } from "./task-list";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { TaskDetailSkeleton } from "../skeletons/task-detail-skeleton";
import { TaskStatusEnum } from "@/types/enums/task.enum";


export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: Date;
}

export interface TaskDetailProps {
    task?: Task | null;
    isLoading: boolean;
    subtasks?: Subtask[];
    onUpdate?: (updates: Partial<Task>) => Promise<void>;
    onDelete?: (taskId: string) => Promise<void>;
    onCommentAdd?: (content: string) => Promise<void>;
    onAttachmentUpload?: (file: File) => Promise<void>;
    onSubtaskToggle?: (subtaskId: string, completed: boolean) => Promise<void>;
    onSubtaskAdd?: (title: string) => Promise<void>;
    className?: string;
}

function formatDate(date: Date): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Invalid date"; // or throw, or return "-"
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",

    }
    ).format(parsedDate);
}

function formatDateTime(date: Date | string): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Invalid date"; // or throw, or return "-"
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(parsedDate);
}

function getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
        case "urgent":
            return "bg-red-500";
        case "high":
            return "bg-orange-500";
        case "medium":
            return "bg-yellow-500";
        default:
            return "bg-gray-500";
    }
}

function getStatusLabel(status: TaskStatusEnum) {
    switch (status) {
        case "todo":
            return "To Do";
        case "in_progress":
            return "In Progress";
        case "done":
            return "Done";
        case "cancelled":
            return "Cancelled";
    }
}

const tabValues = [
    "details",
    "subtasks",
    "comments",
    "attachments",
    "activity",
] as const;



export default function TaskDetail({
    task,
    subtasks = [],
    isLoading,
    onUpdate,
    onDelete,
    onCommentAdd,
    onAttachmentUpload,
    onSubtaskToggle,
    onSubtaskAdd,
    className,
}: TaskDetailProps) {
    //   const [activeTab, setActiveTab] = useQueryState("tab", parseTab);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task?.title || "");
    const [editDescription, setEditDescription] = useState(
        task?.description || ""
    );
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter()


    if (isLoading) {
        return (
            <TaskDetailSkeleton />
        );
    }

    // project doesn't exist / was deleted / bad id in the URL
    if (!task) {
        return (
            <Card className={cn("w-full shadow-xs", className)}>
                <CardContent className="flex items-center justify-center p-12">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <FileText className="size-12 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                            This task doesn't exist or you don't have access to it.
                        </p>
                        <Button variant="outline" onClick={() => router.push("/dashboard/tasks")}>
                            Back to tasks
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }



    const handleSave = async () => {
        await onUpdate?.({
            title: editTitle,
            description: editDescription,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setIsEditing(false);
    };

    const handleDelete = async (taskId: string): Promise<void> => {
        await onDelete?.(taskId)
    }

    return (
        <>
            <div className="mx-auto mt-5 flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        {isEditing ? (
                            <div className="flex flex-col gap-3">
                                <Input
                                    className="w-full font-semibold text-lg"
                                    value={editTitle}
                                />
                                <Textarea
                                    className="min-h-[140px] resize-none text-base"
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    value={editDescription}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} type="button">Save</Button>
                                    <Button onClick={handleCancel} type="button" variant="outline">Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-muted-foreground text-lg">Project:</span>
                                    <Badge className="text-sm" variant="outline">{task.project.name}</Badge>
                                </div>
                                <CardTitle className=" text-xl font-semibold sm:text-2xl">
                                    {task.title}
                                </CardTitle>

                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm">Status:</span>
                                        <Badge className="text-sm" variant="outline">{getStatusLabel(task.status)}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm">Priority:</span>
                                        <div className="flex items-center gap-2">
                                            <div className={cn("size-3 rounded-full", getPriorityColor(task.priority))} />
                                            <span className="text-sm capitalize">{task.priority}</span>
                                        </div>
                                    </div>
                                    {task.dueDate && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm">Deadline:</span>
                                            <Calendar className="size-5 text-muted-foreground" />
                                            <span className="text-muted-foreground text-sm">{formatDate(task.dueDate)}</span>
                                        </div>
                                    )}
                                </div>

                                <span className="mt-2 font-semibold text-base sm:text-md">Description: </span>
                                <div className="prose prose-invert prose-sm max-w-none bg-muted rounded-lg p-4">
                                    <ReactMarkdown>{task.description}</ReactMarkdown>
                                </div>
                            </>
                        )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button size="icon" type="button" variant="ghost" />
                        }>
                            <MoreVertical className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                Edit
                            </DropdownMenuItem> */}
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem
                                onClick={() => setShowDeleteDialog(true)}
                                variant="destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-col gap-8">
                    {task.assignees && task.assignees.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-muted-foreground text-sm">Assignees</span>
                            <div className="flex flex-wrap gap-2">
                                {task.assignees.map((assignee) => (
                                    <div
                                        className="flex items-center gap-2 rounded-lg border bg-card p-2"
                                        key={assignee.id}
                                    >
                                        <Avatar className="size-6">
                                            <AvatarImage alt={assignee.fullName} src={assignee.avatar?.url} />
                                            <AvatarFallback>{assignee.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{assignee.fullName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground text-sm">Created By:</span>
                        <div className="flex flex-wrap gap-2">

                            <div
                                className="flex items-center gap-2 rounded-lg border bg-card p-2"
                                key={task.createdBy.id}
                            >
                                <Avatar className="size-6">
                                    <AvatarImage
                                        alt={task.createdBy.fullName}
                                        src={task.createdBy.avatar?.url}
                                    />
                                    <AvatarFallback>
                                        {task.createdBy.fullName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{task.createdBy.fullName}</span>
                            </div>
                        </div>
                    </div>

                    <Tabs className="mb-2" defaultValue="details">
                        <TabsContent className="pt-2" value="details">
                            <div className="flex flex-col gap-3 text-base">
                                <span className="text-muted-foreground">Created: {formatDateTime(task.createdAt)}</span>
                                <span className="text-muted-foreground">Updated: {formatDateTime(task.updatedAt)}</span>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Dialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this task? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => setShowDeleteDialog(false)}
                            type="button"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleDelete(task.id);
                                setShowDeleteDialog(false);
                            }}
                            type="button"
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
