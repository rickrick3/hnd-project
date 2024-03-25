import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CreateTaskRequest {
    projectId: string;
    name: string;
    description?: string;
    priority?: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as CreateTaskRequest;
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

        // Create the task
        const task = await prisma.task.create({
            data: {
                name: body.name,
                description: body.description,
                priority: body.priority,
                project: {
                    connect: { id: body.projectId }
                }
            }
        });

        return NextResponse.json({ task }, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "An error occurred while creating the task." }, { status: 500 });
    }
}
