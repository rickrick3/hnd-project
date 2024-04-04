import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ValidateTaskRequest {
    taskId: string;
}

export const PUT = async (req: Request) => {
    const body = (await req.json()) as ValidateTaskRequest;
    console.log("Request Body:", body);

    try {
        // Check if the task exists
        const task = await prisma.task.findFirst({
            where: {
                id: body.taskId
            }
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found." }, { status: 404 });
        }

        // Update the task status to "done"
        const updatedTask = await prisma.task.update({
            where: {
                id: body.taskId
            },
            data: {
                completed: true // Assuming there's a field "completed" to indicate task completion
            }
        });

        return NextResponse.json({ message: "Task validated as done." }, { status: 200 });
    } catch (error) {
        console.error("Error validating task as done:", error);
        return NextResponse.json({ error: "An error occurred while validating task as done." }, { status: 500 });
    }
}
