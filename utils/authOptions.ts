// authOptions.ts
// import UserModel from "@/Models/Users";
// import startDb from "@/utils/db";
// import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
    session:{
        strategy:"jwt",
    },
    providers: [
        CredentialsProvider({
            type:"credentials",
            credentials:{
                email : {},
                password : {}
            },
            async authorize(credentials, req){
               
                const {email, password} = credentials as {
                    email: string;
                    password:string
                }

                const user = await prisma.user.findUnique({
                    where: {
                      email,
                    },
                  })

            console.log(user)
                // await startDb();

                // const user = await UserModel.findOne({email});
                // if(!user) throw Error("email/password mismatch!")

                // const passwordMatch = await user.comparePassword(password)
                // if(!passwordMatch) throw Error("email/password mismatch!")
               
                // return {
                //     company: user.company.name,
                //     username: user.username,
                //     email:user.email,
                //     role: user.role,
                //     id: user._id,
                // }
                return null;
            }
        })
    ],
   
    callbacks:{
        async jwt(params:any){
            if(params.user?.role){
                params.token.role = params.user.role;
                params.token.id = params.user.id;
             
            }
            return params.token;
        },
        async session({session, token}) {
            if(session.user){
                (session.user as {id:string}).id = token.id as string;
                (session.user as {role:string}).role = token.role as string;
                (session.user as {email:string}).email = token.email as string;
            }
            return session;
        },
    }
};