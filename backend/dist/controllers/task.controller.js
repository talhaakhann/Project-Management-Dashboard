import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { TaskPriorityEnum, TaskStatusEnum } from "../types/enums/task.enum.js";
export const createTask = asyncHandler(async (req, res) => {
    const { name, description, status, priority, dueDate, assigneeIds, tags } = req.body;
    const { projectId } = req.params;
    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }
    const project = await Project.findOne({
        _id: projectId,
        members: req.user._id,
    });
    if (!project) {
        throw new ApiError(404, "Project not found or access denied");
    }
    const createdTask = await Task.create({
        name,
        description,
        status: status || TaskStatusEnum.TODO,
        priority,
        dueDate,
        project: new mongoose.Types.ObjectId(projectId),
        assignees: assigneeIds,
        tags,
    });
    if (!createdTask) {
        throw new ApiError(500, "Something went wrong while creating new task");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, createdTask, "Successfully created new task"));
});
export const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }
    const task = await Task.findOne({
        _id: taskId,
        assignees: req.user._id,
    });
    if (!task) {
        throw new ApiError(404, "Task not found or access denied");
    }
    const deleteTask = await Task.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new ApiError(404, "Project does not exist");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Task deleted successfully"));
});
export const updateTaskDetails = asyncHandler(async (req, res) => {
    const { name, description, status, priority, dueDate } = req.body;
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }
    const task = await Task.findOne({
        _id: taskId,
        assignees: req.user._id,
    });
    if (!task) {
        throw new ApiError(404, "Task not found or access denied");
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $set: {
            name,
            description,
            dueDate,
            status: status || TaskStatusEnum.TODO,
            priority: priority,
        },
    }, {
        new: true,
    });
    if (!updatedTask) {
        throw new ApiError(400, "Task does not exist");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "Updated task details successfully"));
});
export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.aggregate([
        {
            $lookup: {
                from: "project",
                localField: "_id",
                foreignField: "project",
                as: "project",
            },
        },
        {
            $unwind: "$project"
        },
        {
            $match: {
                'project.members': req.user._id
            }
        }
    ]);
    if (!tasks) {
        throw new ApiError(400, "Something went wrong in getting all tasks of project");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, tasks || [], "Tasks fetched successfully"));
});
//# sourceMappingURL=task.controller.js.map