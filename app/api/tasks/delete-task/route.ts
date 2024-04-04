import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface DeleteTaskRequest {
    projectId: string;
    taskId: string;
}

export const DELETE = async (req: Request) => {
    const body = (await req.json()) as DeleteTaskRequest;
    console.log("Request Body:", body);

    try {
        // Check if the project exists and was created by the manager
        const project = await prisma.project.findFirst({
            where: {
                id: body.projectId,
                createdBy: { role: "manager" }
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found or not created by a manager." }, { status: 404 });
        }

        // Check if the task exists within the project
        const task = await prisma.task.findFirst({
            where: {
                id: body.taskId,
                projectId: body.projectId
            }
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found within the project." }, { status: 404 });
        }

        // Delete the task
        await prisma.task.delete({
            where: {
                id: body.taskId
            }
        });

        return NextResponse.json({ message: "Task deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "An error occurred while deleting the task." }, { status: 500 });
    }
}
