import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isNullOrBlank } from "@/utils/textUtils";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 }
    );
  }

  const existingProfile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: userId,
      },
    },
  });

  if (existingProfile) {
    return NextResponse.json(
      { error: "User already has profile" },
      { status: 400 }
    );
  }

  const { displayName } = await request.json();

  if (isNullOrBlank(displayName)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newProfile = await prisma.profile.create({
    data: {
      authId: userId,
      displayName,
    },
  });

  if (!newProfile) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json(newProfile);
}
