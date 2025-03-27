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
      { error: "Profile required to create race" },
      { status: 400 },
    );
  }

  const data = await request.json();

  if (
    isNullOrBlank(data.sourceId) ||
    isNullOrBlank(data.name) ||
    isNullOrBlank(data.conversion)
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
  
  const conflictingCurrency = await prisma.currency.count({
    where: {
      sourceId: data.sourceId,
      slug: slug,
    },
  });

  if (conflictingCurrency > 0) {
    return NextResponse.json({ error: "Currency already exists" }, { status: 400 });
  }

  const currencyData = {
    ...data,
    slug,
    conversion: isNaN(data.conversion) ? 1 : parseInt(data.conversion)
  }

  const newCurrency = await prisma.currency.create({
    data: currencyData,
  });

  if (!newCurrency) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(newCurrency);
}