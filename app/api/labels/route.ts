import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface NewProjectLabelRequest {
    name: string;
    color: string;
}

interface NewProjectLabelResponse {
    id: string;
    name: string;
    color: string;
}

export const POST = async (req: Request) => {
    const body = (await req.json()) as NewProjectLabelRequest;
    console.log("Request Body:", body);

    try {
        const projectLabel = await prisma.projectLabel.create({
            data: {
                name: body.name,
                color: body.color
            },
            select: {
                id: true,
                name: true,
                color: true
            }
        });

        return NextResponse.json({
            projectLabel: {
                id: projectLabel.id,
                name: projectLabel.name,
                color: projectLabel.color
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error creating project label:", error);
        return NextResponse.json({ error: "An error occurred while creating the project label." }, { status: 500 });
    }
}
