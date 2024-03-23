// import UserModel from "@/Models/UserModels";
// import UserModel from "@/Models/Users";
// import startDb from "@/utils/db";
// import { error } from "console";
import { NextResponse } from "next/server";
// import { type } from "os";
import {hash} from 'bcrypt'
// import { Sql } from "@prisma/client/runtime/library";
// import {sql} from  "@vercel/postgres"
import prisma from "@/lib/prisma";
interface NewUserRequest {
    username:string;
    email:string;
    password:string;
}

interface NewUserResponse{
 id:string;
 username:string;
email:string;
role:string;
}
 
export const POST = async (req: Request)=>{
    const body = (await req.json()) as NewUserRequest;
    console.log("Request Body:", body);

    const hashedPassword = await hash(body.password,10)

    
    // await startDb()
    
    // const oldUser = await UserModel.findOne({email:body.email})
    // if (oldUser)
    //     return NextResponse.json(
    //     {error: "email is already in use"},
    //     {status: 422 }
    // )

    try {
    //     const user = await UserModel.create({
    //         email: body.email,
    //         username: body.username,
    //         password: body.password
    //     });
    
    //     console.log("Created User:", user);
    
    //     return NextResponse.json({
    //         user: {
    //             id: user._id.toString(),
    //             email: user.email,
    //             username: user.username,
    //             role: user.role
    //         }
    //     }, {status: 200 });

    const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.username,
          role:"manager",
          password : hashedPassword
        },
      })


      return NextResponse.json({
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            }, {status: 200 });
    } catch (error) {
        console.log(error);
    }
    
}