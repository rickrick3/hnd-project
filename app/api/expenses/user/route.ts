import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
    const { projectId, userId } = req.query as { projectId: string, userId?: string };

    try {
        let expenses;
        if (userId) {
            // Retrieve expenses for a single user
            expenses = await prisma.expense.findMany({
                where: {
                    projectId: projectId,
                    userId: userId
                },
                include: {
                    project: true,
                    createdBy: true,
                    task: true
                }
            });
        } else {
            // Group expenses by user
            expenses = await prisma.expense.groupBy({
                by: ['userId'],
                where: {
                    projectId: projectId
                },
                _sum: {
                    amount: true
                },
                orderBy: {
                    _sum: {
                        amount: 'desc'
                    }
                },
                include: {
                    createdBy: true
                }
            });
        }

        return NextResponse.json({ expenses }, { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json({ error: "An error occurred while fetching expenses." }, { status: 500 });
    }
}
