#!/usr/bin/env node
/* 零依赖静态服务器 —— 仅用于本地预览与自动化测试
   用法：node tools/serve.js          （默认 127.0.0.1:8130）
         PORT=9000 node tools/serve.js
         HOST=0.0.0.0 node tools/serve.js   ← 局域网可访问，需自行评估暴露风险
*/
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT || 8130);
const HOST = process.env.HOST || "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function createServer(root = ROOT) {
  return http.createServer((req, res) => {
    let rel = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
    if (rel === "/") rel = "/index.html";
    const file = path.join(root, rel);
    // 目录穿越防护
    if (!file.startsWith(root + path.sep) && file !== path.join(root, "index.html")) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("403 forbidden");
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 " + rel);
      }
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(buf);
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, HOST, () => {
    console.log("制造业FDE场景库 → http://" + HOST + ":" + PORT + "/");
    if (HOST !== "127.0.0.1" && HOST !== "localhost") {
      console.log("⚠ 已绑定到 " + HOST + "，同网络其他设备可访问，请确认这是有意的。");
    }
  });
}

module.exports = { createServer, ROOT, PORT, HOST };
