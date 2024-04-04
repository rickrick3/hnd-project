import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface DeleteProjectRequest {
    projectId: string;
    userId: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as DeleteProjectRequest;
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

        // Delete the project
        await prisma.project.delete({
            where: {
                id: body.projectId
            }
        });

        return NextResponse.json({ success: "Project deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "An error occurred while deleting the project." }, { status: 500 });
    }
}
