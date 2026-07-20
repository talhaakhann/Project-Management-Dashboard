import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(request: NextRequest) {
  await fetch(`${BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}