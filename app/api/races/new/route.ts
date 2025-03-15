import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isNullOrBlank } from "@/utils/textUtils";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 },
    );
  }

  const profile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: userId,
      },
    },
  });

  if (!profile) {
    return NextResponse.json(
      { error: "Profile required to create source" },
      { status: 400 },
    );
  }

  const data = await request.json();

  if (
    isNullOrBlank(data.sourceId) ||
    isNullOrBlank(data.name) ||
    isNullOrBlank(data.description)
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const source = await prisma.source.findFirst({
    where: {
      id: data.sourceId,
    },
  });

  if (!source) {
    return NextResponse.json({ error: "Source not found" }, { status: 404 });
  }

  const slug = slugify(data.name, { lower: true });

  const conflictingRace = await prisma.race.count({
    where: {
      sourceId: data.sourceId,
      slug: slug,
    },
  });

  if (conflictingRace) {
    return NextResponse.json({ error: "Race already exists" }, { status: 400 });
  }

  const newRace = await prisma.race.create({
    data: {
      ...data,
      slug,
    },
  });

  if (!newRace) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(newRace);
}
