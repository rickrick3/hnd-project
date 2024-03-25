import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface GetTasksToBeDoneRequest {
    projectId: string;
}

export const GET = async (req: Request) => {
    const { projectId } = req.query as { projectId: string };

    try {
        // Check if the project exists and was created by the manager
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                createdBy: { role: "manager" }
            },
            include: {
                task: true
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found or not created by a manager." }, { status: 404 });
        }

        const tasksToBeDone = project.task.filter(task => !task.completed);

        return NextResponse.json({ tasksToBeDone }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks to be done:", error);
        return NextResponse.json({ error: "An error occurred while fetching tasks to be done." }, { status: 500 });
    }
}
