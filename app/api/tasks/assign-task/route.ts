import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface AssignTasksRequest {
    projectId: string;
    tasks: {
        taskId: string;
        description?: string;
        time?: { startTime: string; endTime: string; duration: number }[];
        priority?: string;
    }[];
    userId: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as AssignTasksRequest;
    console.log("Request Body:", body);

    try {
        // Check if the project exists
        const project = await prisma.project.findUnique({
            where: {
                id: body.projectId
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        // Check if the specified tasks exist
        const tasks = await prisma.task.findMany({
            where: {
                id: { in: body.tasks.map(task => task.taskId) }
            }
        });

        if (tasks.length !== body.tasks.length) {
            return NextResponse.json({ error: "One or more tasks not found." }, { status: 404 });
        }

        // Assign tasks to the user within the project
        await Promise.all(body.tasks.map(async task => {
            await prisma.teamMembership.create({
                data: {
                    projectId: body.projectId,
                    userId: body.userId,
                    role: "assigned", // Assuming there's a predefined role for task assignment
                    task: {
                        connect: { id: task.taskId }
                    },
                    description: task.description,
                    time: task.time ? {
                        create: task.time.map(entry => ({
                            startTime: new Date(entry.startTime),
                            endTime: new Date(entry.endTime),
                            duration: entry.duration
                        }))
                    } : undefined,
                    priority: task.priority
                }
            });
        }));

        return NextResponse.json({ success: "Tasks assigned successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error assigning tasks:", error);
        return NextResponse.json({ error: "An error occurred while assigning tasks." }, { status: 500 });
    }
}
