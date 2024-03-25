import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ValidateExpenseRequest {
    expenseId: string;
}

export const PUT = async (req: Request) => {
    const { projectId, userId } = req.query as { projectId: string, userId: string };
    const body = (await req.json()) as ValidateExpenseRequest;

    try {
        // Check if the user is the creator of the project
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                createdBy: true
            }
        });

        if (!project || project.createdBy !== userId) {
            return NextResponse.json({ error: "Only the project creator can validate expenses." }, { status: 403 });
        }

        // Validate the expense by updating its status
        const updatedExpense = await prisma.expense.update({
            where: {
                id: body.expenseId
            },
            data: {
                validated: true
            }
        });

        return NextResponse.json({ message: "Expense validated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error validating expense:", error);
        return NextResponse.json({ error: "An error occurred while validating expense." }, { status: 500 });
    }
}
