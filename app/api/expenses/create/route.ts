import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CreateExpenseRequest {
    projectId: string;
    amount: number;
    description?: string;
    taskId?: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as CreateExpenseRequest;
    console.log("Request Body:", body);

    try {
        // Check if the project exists
        const project = await prisma.project.findFirst({
            where: {
                id: body.projectId
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        // Check if the task exists and belongs to the project (if provided)
        if (body.taskId) {
            const task = await prisma.task.findFirst({
                where: {
                    id: body.taskId,
                    projectId: body.projectId
                }
            });

            if (!task) {
                return NextResponse.json({ error: "Task not found or does not belong to the project." }, { status: 404 });
            }
        }

        // Create the expense
        const expense = await prisma.expense.create({
            data: {
                amount: body.amount,
                description: body.description,
                projectId: body.projectId,
                taskId: body.taskId,
                userId: "user123" // Replace "user123" with the actual ID of the user creating the expense
            }
        });

        return NextResponse.json({ expense }, { status: 200 });
    } catch (error) {
        console.error("Error creating expense:", error);
        return NextResponse.json({ error: "An error occurred while creating expense." }, { status: 500 });
    }
}
