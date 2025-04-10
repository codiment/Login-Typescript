import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {

    const data = await request.json()

    const session = await getServerSession(authOptions)

    console.log(session)
    console.log(data)

    const newProject = await prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            user: {
                connect: {
                    id: parseInt(session.id)
                }
            }
        }
    })

    return NextResponse.json(newProject, {
        status: 201
    })

}