// app/api/proxy-po/route.ts
import { NextResponse } from "next/server";
import http from "http";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiUrl = "http://164.52.205.7/PAPI/pullPendingPOApprovals";
    const bodyString = JSON.stringify(body);

    // Use native http module to ensure GET with body works correctly
    return new Promise((resolve, reject) => {
      const url = new URL(apiUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyString),
        },
      };

      const req = http.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const jsonData = JSON.parse(data);
            console.log("API Response received, status:", res.statusCode);
            resolve(NextResponse.json(jsonData));
          } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Raw data:", data.substring(0, 200));
            resolve(
              NextResponse.json(
                { error: "Invalid JSON response", raw: data },
                { status: 500 }
              )
            );
          }
        });
      });

      req.on("error", (error) => {
        console.error("Request Error:", error);
        reject(
          NextResponse.json(
            {
              error: "Failed to fetch data",
              details: error.message,
            },
            { status: 500 }
          )
        );
      });

      // Write the body to the request
      req.write(bodyString);
      req.end();
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
