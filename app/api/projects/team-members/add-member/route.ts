import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface AddTeamMemberRequest {
    projectId: string;
    userId: string;
    role: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as AddTeamMemberRequest;
    console.log("Request Body:", body);

    try {
        // Check if the user and project exist
        const user = await prisma.user.findUnique({
            where: {
                id: body.userId
            }
        });

        const project = await prisma.project.findUnique({
            where: {
                id: body.projectId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        if (!project) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        // Add the user as a team member to the project
        const teamMember = await prisma.teamMembership.create({
            data: {
                projectId: body.projectId,
                userId: body.userId,
                role: body.role
            }
        });

        return NextResponse.json({ success: "Team member added successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error adding team member:", error);
        return NextResponse.json({ error: "An error occurred while adding the team member." }, { status: 500 });
    }
}
