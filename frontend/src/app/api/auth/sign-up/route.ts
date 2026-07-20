import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendResponse = await fetch(
    `${BACKEND_URL}/api/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await backendResponse.json();

  const response = NextResponse.json(data, {
    status: backendResponse.status,
  });


  return response;
}