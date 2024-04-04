import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface GetTeamMembersRequest {
    projectId: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as GetTeamMembersRequest;
    console.log("Request Body:", body);

    try {
        // Find the project
        const project = await prisma.project.findUnique({
            where: {
                id: body.projectId
            },
            include: {
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

        // Extract team members from the project
        const teamMembers = project.team_membership.map(member => ({
            userId: member.userId,
            username: member.user.name,
            role: member.role
        }));

        return NextResponse.json({ teamMembers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json({ error: "An error occurred while fetching team members." }, { status: 500 });
    }
}
