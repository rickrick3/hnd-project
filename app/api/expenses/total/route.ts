import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
    const { projectId } = req.query as { projectId: string };

    try {
        // Calculate the total expenses for the specified project
        const totalExpenses = await prisma.expense.aggregate({
            where: {
                projectId: projectId
            },
            _sum: {
                amount: true
            }
        });

        return NextResponse.json({ totalExpenses: totalExpenses?._sum?.amount ?? 0 }, { status: 200 });
    } catch (error) {
        console.error("Error calculating total expenses:", error);
        return NextResponse.json({ error: "An error occurred while calculating total expenses." }, { status: 500 });
    }
}
