#!/usr/bin/env node
/* 一键自检 —— 单条命令完成「起服务 → 真渲染 → 跑断言」
   用法：npm test            （推荐）
         node tools/test.js
   退出码：0 全过 / 1 有断言失败 / 2 环境异常
*/
const path = require("path");
const { spawn } = require("child_process");
const { createServer } = require("./serve");

const HOST = "127.0.0.1";
const PORT = Number(process.env.TEST_PORT || 8199);
const BASE = "http://" + HOST + ":" + PORT + "/";

const server = createServer();

server.on("error", (e) => {
  console.error("测试服务启动失败：", e.message);
  if (e.code === "EADDRINUSE") {
    console.error("端口 " + PORT + " 被占用，可换一个：TEST_PORT=8299 npm test");
  }
  process.exit(2);
});

server.listen(PORT, HOST, () => {
  console.log("测试服务已启动：" + BASE);
  const child = spawn(process.execPath, [path.join(__dirname, "verify.js")], {
    env: Object.assign({}, process.env, { BASE }),
    stdio: "inherit",
  });
  child.on("exit", (code) => {
    server.close();
    process.exit(code === null ? 1 : code);
  });
});
