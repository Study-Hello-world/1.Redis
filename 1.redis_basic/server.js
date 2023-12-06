const express = require("express")
const redis = require("redis")
const app = express()
require("dotenv").config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const redisClient = redis.createClient({
  socket: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  },
  password: process.env.REDIS_PASSWORD
})

redisClient.on("connect", async () => {
  console.info("Redis 서버와 연결되었습니다.")
})

redisClient.on("error", (err) => {
  console.error("Redis 클라이언트의 에러가 발생하였습니다.", err)
})

redisClient.on('reconnecting', (params) => {
  console.log('Redis 서버와 재연결 중입니다.', params);
});

redisClient.on('end', () => {
  console.log('Redis 클라이언트가 종료되었습니다.');
});

redisClient.on('ready', async() => {
  console.log('Redis 클라이언트의 명령 처리 준비 완료되었습니다.');
  const setUser = await redisClient.set("user:example-data:1", "john1234")
  console.log(setUser)
  const getUser = await redisClient.get("user:example-data:1")
  console.log(getUser)
});

redisClient.on('warning', (warning) => {
  console.warn('Redis 클라이언트 경고:', warning);
});

const server = app.listen("3000", () => {
  console.log("server start 3000")
  redisClient.connect()
})

process.on('exit', (code) => {
  console.log(`서버가 다음 코드와 함께 종료되었습니다... -> ${code}`);
});

process.on('SIGINT', async () => {
  console.log('서버가 SIGINT 신호를 수신하여 종료합니다...');

  const allDelete = await redisClient.flushAll();
  console.log("데이터 모두 삭제: ", allDelete)

  const redisQuit = await redisClient.quit();
  console.log("레디스 연결 종료: ", redisQuit)

  server.close(() => {
    console.log('서버 종료됨.');
    process.exit(0);
  });
});

