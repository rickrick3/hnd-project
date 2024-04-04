import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface EditTaskRequest {
    projectId: string;
    taskId: string;
    updatedFields: {
        name?: string;
        description?: string;
        priority?: string;
    };
}

export const PUT = async (req: Request) => {
    const body = (await req.json()) as EditTaskRequest;
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

        // Update the task with the provided fields
        const updatedTask = await prisma.task.update({
            where: {
                id: body.taskId
            },
            data: {
                ...body.updatedFields
            }
        });

        return NextResponse.json({ updatedTask }, { status: 200 });
    } catch (error) {
        console.error("Error editing task:", error);
        return NextResponse.json({ error: "An error occurred while editing the task." }, { status: 500 });
    }
}
