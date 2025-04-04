import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request : Request) {
    const data = await request.json()
    console.log(data)

    // Hashear la contraseña una sola vez
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword 
        }
    });

    const {password, ...user} = newUser

    return NextResponse.json(user, {
        status: 201
    })
}