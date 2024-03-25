import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface UpdateExpenseRequest {
    amount?: number;
    description?: string;
    taskId?: string;
}

export const PUT = async (req: Request) => {
    const { expenseId } = req.query as { expenseId: string };
    const body = (await req.json()) as UpdateExpenseRequest;

    try {
        // Check if the expense exists
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId
            }
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found." }, { status: 404 });
        }

        // Update the expense with the provided data
        const updatedExpense = await prisma.expense.update({
            where: {
                id: expenseId
            },
            data: {
                amount: body.amount ?? expense.amount,
                description: body.description ?? expense.description,
                taskId: body.taskId ?? expense.taskId
            }
        });

        return NextResponse.json({ message: "Expense updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating expense:", error);
        return NextResponse.json({ error: "An error occurred while updating expense." }, { status: 500 });
    }
}
