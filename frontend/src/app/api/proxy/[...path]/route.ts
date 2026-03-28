import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://xitwxb23yn.us-east-1.awsapprunner.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND}/api/${path.join("/")}${request.nextUrl.search}`;
  try {
    const r = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const text = await r.text();
    if (!text) {
      return NextResponse.json({ error: "Backend returned empty response" }, { status: 503 });
    }
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: r.status });
    } catch {
      return NextResponse.json({ error: "Backend returned non-JSON", raw: text.slice(0, 200) }, { status: 502 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Backend unavailable — try again in 10 seconds" },
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
      signal: AbortSignal.timeout(30000),
    });
    const text = await r.text();
    if (!text) {
      return NextResponse.json({ error: "Backend returned empty response" }, { status: 503 });
    }
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: r.status });
    } catch {
      return NextResponse.json({ error: "Backend returned non-JSON", raw: text.slice(0, 200) }, { status: 502 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Backend unavailable — try again in 10 seconds" },
      { status: 503 }
    );
  }
}
