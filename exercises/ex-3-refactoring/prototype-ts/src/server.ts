import { createServer } from "node:http";
import { buildQuote, type QuoteRequest } from "./domain.ts";

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if (req.method === "POST" && req.url === "/quotes") {
    try {
      const body = await readBody(req);
      const quote = buildQuote(JSON.parse(body) as QuoteRequest);
      sendJson(res, 200, quote);
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  sendJson(res, 404, { error: "not found" });
});

function readBody(req: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res: { writeHead: Function; end: Function }, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

const port = Number(process.env.PORT || 3100);
server.listen(port, () => {
  console.log(`Quote prototype listening on http://localhost:${port}`);
});

