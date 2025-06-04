// app/(routes)/photographers/[slug]/page.tsx

import { notFound } from "next/navigation";
import { PhotographerProfile } from "@/components/photographers/profile";
import { Photographer } from "@/lib/types";

export interface PageProps {
  params: {
    slug: string;
  };
}
import data from '@/db.json';

export async function generateStaticParams() {
  const photographers = data.photographers;

  return photographers.map((p) => ({ slug: p.slug }));
}


export default async function PhotographerProfilePage({ params }: PageProps) {
  if (!params?.slug) return notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/photographers`
  );
  const photographers: Photographer[] | null = await res.json();

  const photographer = photographers?.find((p) => p.slug === params.slug);

  return <PhotographerProfile photographer={photographer} />;
}
