import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
    const { projectId } = req.query as { projectId: string };

    try {
        // Retrieve all expenses related to the specified project
        const expenses = await prisma.expense.findMany({
            where: {
                projectId: projectId
            },
            include: {
                project: true,
                createdBy: true,
                task: true
            }
        });

        return NextResponse.json({ expenses }, { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json({ error: "An error occurred while fetching expenses." }, { status: 500 });
    }
}
