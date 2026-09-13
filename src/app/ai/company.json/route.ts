import { NextResponse } from "next/server";
import { getCompanyResource } from "@/lib/company-resource";

export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(await getCompanyResource(), {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
