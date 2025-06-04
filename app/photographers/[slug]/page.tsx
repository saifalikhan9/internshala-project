// app/(routes)/photographers/[slug]/page.tsx

import { notFound } from "next/navigation";
import { PhotographerProfile } from "@/components/photographers/profile"; 
import { Photographer } from "@/lib/types";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/photographers");
  const photographers = await res.json();

  return photographers.map((p: any) => ({
    slug: p.slug,
  }));
}

export default async function PhotographerProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch("http://localhost:3000/photographers");
  const photographers: Photographer[] = await res.json();
  
  

  const photographer = photographers.find((p) => p.slug === params.slug);

  if (!photographer) return notFound();

  return <PhotographerProfile photographer={photographer} />;
}




















