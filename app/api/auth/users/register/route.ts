import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import prisma from "@/lib/prisma";

interface NewUserRequest {
    name: string;
    email: string;
    password: string;
}

interface NewUserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const POST = async (req: Request) => {
    // console.log(req)
    const body = (await req.json()) as NewUserRequest;
    
    console.log("Request Body:", body);

    if (!body.password) {
        return NextResponse.json({ error: "Password field is required." }, { status: 400 });
    }
    const hashedPassword = await hash(body.password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                role: "manager",
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "An error occurred while creating the user." }, { status: 500 });
    }
}
