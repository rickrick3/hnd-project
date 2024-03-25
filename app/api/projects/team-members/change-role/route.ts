import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ChangeTeamMemberRoleRequest {
    projectId: string;
    userId: string;
    newRole: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as ChangeTeamMemberRoleRequest;
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

        // Check if the team member exists for the project
        const teamMember = await prisma.teamMembership.findFirst({
            where: {
                projectId: body.projectId,
                userId: body.userId
            }
        });

        if (!teamMember) {
            return NextResponse.json({ error: "Team member not found for the project." }, { status: 404 });
        }

        // Update the team member's role
        await prisma.teamMembership.update({
            where: {
                id: teamMember.id
            },
            data: {
                role: body.newRole
            }
        });

        return NextResponse.json({ success: "Team member role updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error changing team member role:", error);
        return NextResponse.json({ error: "An error occurred while changing the team member role." }, { status: 500 });
    }
}
