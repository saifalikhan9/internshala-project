// app/(routes)/photographers/[slug]/page.tsx

import { notFound } from "next/navigation";
import { PhotographerProfile } from "@/components/photographers/profile";
import { Photographer } from "@/lib/types";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/photographers`
  );
  const photographers:Photographer[] = await res.json();

  return photographers.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PhotographerProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/photographers`
  );
  const photographers: Photographer[] = await res.json();

  const photographer = photographers.find((p) => p.slug === params.slug);

  if (!photographer) return notFound();

  return <PhotographerProfile photographer={photographer} />;
}
