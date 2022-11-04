import http from "http";
import { performArithmeticOp } from "./arithmetic";

export async function requestListener(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  if (req.method === "POST") {
    let reqBody;

    try {
      reqBody = await parseBody(req);
    } catch (error: any) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(`{ "error": "${error?.message}" }`);
    }

    const { operation_type, x, y } = reqBody;

    const result = await performArithmeticOp(
      operation_type,
      Number(x),
      Number(y)
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ slackUsername: "a11rew", operation_type, result })
    );
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(`{ "error": "Not found" }`);
  }
}

export function parseBody(
  req: http.IncomingMessage
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        // Parse body
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject("Invalid JSON");
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}
