import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://xitwxb23yn.us-east-1.awsapprunner.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND}/api/${path.join("/")}${request.nextUrl.search}`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (e) {
    return NextResponse.json(
      { error: "Backend unavailable", detail: String(e) },
      { status: 503 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND}/api/${path.join("/")}${request.nextUrl.search}`;
  try {
    const body = await request.text();
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body || undefined,
    });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (e) {
    return NextResponse.json(
      { error: "Backend unavailable", detail: String(e) },
      { status: 503 }
    );
  }
}
