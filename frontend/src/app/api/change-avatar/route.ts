import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function PATCH(request: NextRequest) {
  const backendResponse = await fetch(
    `${BACKEND_URL}/api/v1/change-avatar`,
    {
      method: "PATCH",
      headers: {
        // Forward cookies
        cookie: request.headers.get("cookie") ?? "",

        // Forward the original Content-Type (includes multipart boundary)
        "content-type": request.headers.get("content-type") ?? "",
      },
      body: request.body,
    }
  );

  const contentType = backendResponse.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await backendResponse.json();

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  }

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    headers: {
      "Content-Type": contentType,
    },
  });
}