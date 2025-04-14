import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const project = await prisma.project.findUnique({
    where: {
      id: Number.parseInt(params.id),
    },
  });

  if (!project) {
    return NextResponse.json(
      {
        message: 'Project not found',
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(project);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const projectDeleted = await prisma.project.delete({
      where: {
        id: Number.parseInt(params.id),
      },
    });

    return NextResponse.json(projectDeleted);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'Project not found',
          },
          {
            status: 404,
          }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'internal server error',
      },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const data = await request.json();

  const projectUpdate = await prisma.project.update({
    where: {
      id: Number.parseInt(params.id),
    },
    data: data,
  });

  return NextResponse.json(projectUpdate);
}
