import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ListProjectsRequest {
    userId: string;
}

interface ProjectInfo {
    id: string;
    projectName: string;
    budget: number;
    status: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as ListProjectsRequest;
    console.log("Request Body:", body);

    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: body.userId
            },
            select: {
                id: true,
                project_name: true,
                budget: true,
                status: true
            }
        });

        const projectList: ProjectInfo[] = projects.map(project => ({
            id: project.id,
            projectName: project.project_name,
            budget: project.budget,
            status: project.status
        }));

        return NextResponse.json({ projects: projectList }, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "An error occurred while fetching the projects." }, { status: 500 });
    }
}
