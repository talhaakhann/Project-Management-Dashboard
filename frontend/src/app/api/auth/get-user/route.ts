import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET(request: NextRequest) {

  const backendResponse = await fetch(
    `${BACKEND_URL}/api/auth/get-user`,
    {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  const data = await backendResponse.json();

  return NextResponse.json(data, {
    status: backendResponse.status,
  });
}