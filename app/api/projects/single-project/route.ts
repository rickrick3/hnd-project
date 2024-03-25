import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface GetProjectInfoRequest {
    projectId: string;
    userId: string;
}

export const GET = async (req: Request) => {
    const { projectId, userId } = req.query as GetProjectInfoRequest;
    console.log("Request Query:", { projectId, userId });

    try {
        // Check if the project exists and was created by the specified user
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: userId
            },
            include: {
                createdBy: true,
                team_membership: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        console.error("Error fetching project information:", error);
        return NextResponse.json({ error: "An error occurred while fetching project information." }, { status: 500 });
    }
}

