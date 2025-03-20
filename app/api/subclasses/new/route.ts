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
    isNullOrBlank(data.baseClassId) ||
    isNullOrBlank(data.name) ||
    isNullOrBlank(data.description) ||
    isNullOrBlank(data.minLevel)
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (isNaN(data.minLevel)) {
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

  const baseClass = await prisma.baseClass.findFirst({
    where: {
      sourceId: source.id,
      id: data.baseClassId,
    },
  });

  if (!baseClass) {
    return NextResponse.json(
      { error: "Base Class not found" },
      { status: 404 },
    );
  }

  const slug = slugify(data.name, { lower: true });

  const conflictingSubClass = await prisma.subClass.count({
    where: {
      sourceId: data.sourceId,
      slug: slug,
    },
  });

  if (conflictingSubClass) {
    return NextResponse.json(
      { error: "Subclass already exists" },
      { status: 400 },
    );
  }

  const newSubclass = await prisma.subClass.create({
    data: {
      ...data,
      slug,
      minLevel: parseInt(data.minLevel),
    },
  });

  if (!newSubclass) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(newSubclass);
}
