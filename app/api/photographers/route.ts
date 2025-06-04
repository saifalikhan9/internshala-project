import { NextResponse } from 'next/server';
import data from '@/db.json'; // Adjust path if your db.json is elsewhere

export async function GET() {
  return NextResponse.json(data.photographers);
}
