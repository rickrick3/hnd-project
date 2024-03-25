import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface NewProjectRequest {
    projectName: string;
    budget: number;
    status: string;
    userId: string;
}

interface NewProjectResponse {
    id: string;
    projectName: string;
    budget: number;
    status: string;
    createdBy: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as NewProjectRequest;
    console.log("Request Body:", body);

    try {
        const project = await prisma.project.create({
            data: {
                project_name: body.projectName,
                budget: body.budget,
                status: body.status,
                userId: body.userId
            },
            select: {
                id: true,
                project_name: true,
                budget: true,
                status: true,
                createdBy: true
            }
        });

        return NextResponse.json({
            project: {
                id: project.id,
                projectName: project.project_name,
                budget: project.budget,
                status: project.status,
                createdBy: project.createdBy
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "An error occurred while creating the project." }, { status: 500 });
    }
}

