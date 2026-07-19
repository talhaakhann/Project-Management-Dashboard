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
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs";
import { Project, ProjectStatus } from "@/types/enums/project.enum";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { ProjectDetailSkeleton } from "../skeletons/project-detail-skeleton";



export interface ProjectDetailProps {
    project?: Project | null;
    isLoading: boolean;
    onUpdate?: (updates: Partial<Project>) => Promise<void>;
    onDelete?: (taskId: string) => Promise<void>;
    onCommentAdd?: (content: string) => Promise<void>;
    onAttachmentUpload?: (file: File) => Promise<void>;
    onSubprojectToggle?: (subprojectId: string, completed: boolean) => Promise<void>;
    onSubprojectAdd?: (name: string) => Promise<void>;
    className?: string;
}

function formatDate(date: Date): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",

    }
    ).format(parsedDate);
}

function formatDateTime(date: Date | string): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(parsedDate);
}



function getStatusLabel(status: ProjectStatus) {
    switch (status) {
        case "active":
            return "active";
        case "archived":
            return "archived";
        case "completed":
            return "completed";
    }
}

const tabValues = [
    "details",
    "subprojects",
    "comments",
    "attachments",
    "activity",
] as const;



export default function ProjectDetail({
    project,
    isLoading,
    onUpdate,
    onDelete,
    className,
}: ProjectDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(project?.name || "");
    const [editDescription, setEditDescription] = useState(
        project?.description || ""
    );
    const [commentText, setCommentText] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter()

    if (isLoading) {
        return (
            <ProjectDetailSkeleton />
        );
    }

    if (!project) {
        return (
            <Card className={cn("w-full shadow-xs", className)}>
                <CardContent className="flex items-center justify-center p-12">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <FileText className="size-12 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                            This project doesn't exist or you don't have access to it.
                        </p>
                        <Button variant="outline" onClick={() => router.push("/dashboard/projects")}>
                            Back to projects
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }



    // const handleSave = async () => {
    //     await onUpdate?.({
    //         name: editTitle,
    //         description: editDescription,
    //     });
    //     setIsEditing(false);
    // };

    // const handleCancel = () => {
    //     setEditTitle(project.name);
    //     setEditDescription(project.description || "");
    //     setIsEditing(false);
    // };

    const handleDelete = async (taskId: string) => {
        await onDelete?.(taskId)
    }


    return (
        <>
            <div className="mx-auto mt-5 flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        {/* {isEditing ? (
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
                        ) 
                        : ( */}
                        <>
                            <CardTitle className=" text-xl font-semibold sm:text-2xl">
                                {project.name}
                            </CardTitle>

                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm">Status:</span>
                                    <Badge className="text-sm" variant="outline">{getStatusLabel(project.status)}</Badge>
                                </div>
                                {project.dueDate && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm">Deadline:</span>
                                        <Calendar className="size-5 text-muted-foreground" />
                                        <span className="text-muted-foreground text-sm">{formatDate(project.dueDate)}</span>
                                    </div>
                                )}
                            </div>

                            <span className="mt-2 font-semibold text-base sm:text-md">Description: </span>
                            <div className="prose prose-invert prose-sm max-w-none bg-muted rounded-lg p-4">
                                <ReactMarkdown>{project.description}</ReactMarkdown>
                            </div>
                        </>
                        {/* )} */}
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
                    {project.members && project.members.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-muted-foreground text-sm">Members</span>
                            <div className="flex flex-wrap gap-2">
                                {project.members.map((member) => (
                                    <div
                                        className="flex items-center gap-2 rounded-lg border bg-card p-2"
                                        key={member.id}
                                    >
                                        <Avatar className="size-6">
                                            <AvatarImage alt={member.fullName} src={member.avatar?.url} />
                                            <AvatarFallback>{member.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{member.fullName}</span>
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
                                key={project.createdBy.id}
                            >
                                <Avatar className="size-6">
                                    <AvatarImage
                                        alt={project.createdBy.fullName}
                                        src={project.createdBy.avatar?.url}
                                    />
                                    <AvatarFallback>
                                        {project.createdBy.fullName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{project.createdBy.fullName}</span>
                            </div>
                        </div>
                    </div>

                    <Tabs className="mb-2" defaultValue="details">
                        <TabsContent className="pt-2" value="details">
                            <div className="flex flex-col gap-3 text-base">
                                <span className="text-muted-foreground">Created: {formatDateTime(project.createdAt)}</span>
                                <span className="text-muted-foreground">Updated: {formatDateTime(project.updatedAt)}</span>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Dialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this project? This will also permanently
                            delete all tasks associated with it. This action cannot be
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
                                handleDelete(project.id);
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
