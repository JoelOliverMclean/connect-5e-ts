import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { isNullOrBlank } from "@/utils/textUtils";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";

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
    isNullOrBlank(data.name) ||
    isNullOrBlank(data.description) ||
    isNullOrBlank(data.level)
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (isNaN(data.level)) {
    return NextResponse.json(
      { error: "Invalid fields submitted" },
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

  const conflictingSpell = await prisma.spell.count({
    where: {
      sourceId: data.sourceId,
      slug: slug,
    },
  });

  if (conflictingSpell) {
    return NextResponse.json(
      { error: "Spell already exists" },
      { status: 400 },
    );
  }

  const newSpell = await prisma.spell.create({
    data: {
      ...data,
      slug,
      level: parseInt(data.level),
      verbal: data.verbal === "true",
      somatic: data.somatic === "true",
      material: data.material === "true",
    },
  });

  if (!newSpell) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(newSpell);
}
