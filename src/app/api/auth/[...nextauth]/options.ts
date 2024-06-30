import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.models";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials: any): Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        username: credentials.identifier
                    })
                    if(!user){
                        throw new Error("No user found with this username")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect) {
                        throw new Error("Incorrect Password")
                    }

                    return user;

                } catch (error: any) {
                    throw new Error(error)
                }
            }


        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user){
                token._id = user._id?.toString()
                token.username = user.username
                token.collegeName = user.collegeName
            }
            return token
        },
        
        async session({session, token}) {
            if(token){
                session.user._id = token._id
                session.user.username = token.username
                session.user.collegeName = token.username
            }
            return session
        },

    },
    pages: {
        signIn: '/sing-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}