import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { isNullOrBlank } from "@/utils/textUtils";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { Race, SubRace } from "@prisma/client";

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
      { error: "Profile required to create subrace" },
      { status: 400 },
    );
  }

  const data = await request.json();

  if (
    isNullOrBlank(data.sourceId) ||
    isNullOrBlank(data.race) ||
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

  const race = await prisma.race.findUnique({
    where: {
      source_slug_uk: { sourceId: source.id, slug: data.race },
    },
  });

  if (!race) {
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }

  const slug = slugify(data.name, { lower: true });

  const conflictingSubRace = await prisma.subRace.count({
    where: {
      sourceId: data.sourceId,
      slug: slug,
    },
  });

  if (conflictingSubRace) {
    return NextResponse.json(
      { error: "Subrace already exists" },
      { status: 400 },
    );
  }

  const newSubrace = await prisma.subRace.create({
    data: {
      raceId: race.id,
      name: data.name,
      slug: slug,
      description: data.description,
      sourceId: source.id,
    },
  });

  if (!newSubrace) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(newSubrace);
}
