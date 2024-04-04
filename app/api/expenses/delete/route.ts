import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const DELETE = async (req: Request) => {
    const { expenseId } = req.query as { expenseId: string };

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

        // Delete the expense
        await prisma.expense.delete({
            where: {
                id: expenseId
            }
        });

        return NextResponse.json({ message: "Expense deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return NextResponse.json({ error: "An error occurred while deleting expense." }, { status: 500 });
    }
}
