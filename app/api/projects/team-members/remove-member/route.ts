import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface DeleteTeamMemberRequest {
    projectId: string;
    userId: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as DeleteTeamMemberRequest;
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

        // Delete the team member
        await prisma.teamMembership.delete({
            where: {
                id: teamMember.id
            }
        });

        return NextResponse.json({ success: "Team member deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ error: "An error occurred while deleting the team member." }, { status: 500 });
    }
}
