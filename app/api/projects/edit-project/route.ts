import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface EditProjectRequest {
    projectId: string;
    userId: string;
    updatedFields: {
        projectName?: string;
        budget?: number;
        status?: string;
    };
}

export const PUT = async (req: Request) => {
    const body = (await req.json()) as EditProjectRequest;
    console.log("Request Body:", body);

    try {
        // Check if the project exists and was created by the specified user
        const project = await prisma.project.findFirst({
            where: {
                id: body.projectId,
                userId: body.userId
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        // Update the project with the provided fields
        const updatedProject = await prisma.project.update({
            where: {
                id: body.projectId
            },
            data: {
                ...body.updatedFields
            }
        });

        return NextResponse.json({ updatedProject }, { status: 200 });
    } catch (error) {
        console.error("Error editing project:", error);
        return NextResponse.json({ error: "An error occurred while editing the project." }, { status: 500 });
    }
}
