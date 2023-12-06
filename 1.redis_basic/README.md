# Redis?

- Redis는 C언어로 만들어졌으며, Remote Dictionary Server의 약자입니다.
- Key-Value 구조의 비정형 데이터를 저장하고 관리하기 위한 오픈 소스 기반의 In-Memory NoSQL 데이터베이스 시스템입니다.
- RDMBS가 아닌 NoSQL에는 여러 종류의 NoSQL이 있는데 Redis는 In-Memory 기반의 Key-Value 스토리지입니다.
- NoSQL의 한 종류이기 때문에 쿼리가 아닌 명령어라고 일컫습니다.
- 디스크가 아닌 메모리 기반의 Key-Value Store입니다.
  Key-Value Store라는 구조로 다양한 자료구조를 지원합니다. In memory라는 특성답게 고성능이며, 캐싱, 세션 관리, 메시지 큐 등으로 다양하게 활용되고 있습니다. Redis의 장점 중 하나는 Key-Value 스토리지에서 Value는 단순한 Object가 아니라 다양한 자료구조를 갖기 때문입니다.
- 모든 데이터가 메모리에 저장되지만, 서버가 내려갔다가 올라가는 상황에서 메모리에 상주한 데이터들이 휘발되지 않도록 디스크에 스냅샷을 저장할 수 있습니다.
- Key-Value 저장소 중 가장 인기가 많은 시스템입니다.
- 이때 Value에 사용될 수 있는 데이터 타입들을 Collection이라고 일컫습니다.
- Redis의 기본 Port는 6379번입니다.

<br>

```
💡 Redis Collections 를 사용할 때 주의점이 있는데요, 
바로 하나의 컬렉션에 너무 많은 아이템을 담으면 좋지 않다는 점입니다. 
가능하면 10000개 이하의, 몇천개 수준의 데이터 셋을 유지하는게 Redis 성능에 영향주지 않습니다. 
이 말이 당장 이해가 가지 않아도 괜찮습니다.
```

<br>

# Redis 사용 용도
Redis의 사용 용도는 상황에 따라 많지만, 대표적으로 아래의 경우에 사용할 수 있습니다.

1. 메인 데이터 저장소 : AOF, RDB 백업 기능과 레디스 아키텍처를 사용하여 메인 저장소로 사용할 수 있습니다. 하지만 메모리 특성상 용량이 큰 데이터 저장소로는 적절하지 않습니다.
2. 데이터 캐시 : 인메모리 데이터 저장소이므로 메인 저장소의 데이터를 캐시 하여 빠르게 데이터를 읽을 수 있습니다. 캐시된 데이터는 한곳에 저장되는 중앙 집중형 구조로 구성하여 데이터 일관성을 유지할 수 있습니다.
3. 분산 락(distributed lock) : 분산 환경에서 여러 시스템이 동시에 데이터를 처리할 때는 특정 공유 자원의 사용 여부를 검증하여 데드 락을 방지할 필요가 있는데 이때 레디스를 분산 락으로 사용할 수 있습니다.
4. 순위 계산 : 레디스에서 제공하는 ZSet(Sorted Set) 자료 구조를 이용하여 순위 계산 용도로 사용하기도 합니다. ZSet은 정렬 기능이 포함된 Set 자료 구조이므로 쉽고 빠르게 순위를 계산할 수 있습니다.

<br>

## 서버 구축 예시
- 직접 EC2 서버에 Redis 프로그램을 설치하여 관리 및 외부 혹은 내부에서 활용할 수 있습니다.
- Elasitc cache와 같은 서비스를 사용하여 활용할 수 있습니다. → 같은 VPC에서만 접근할 수 있습니다.
- Heroku를 사용하여 Redis 서버를 구축할 수 있습니다.


<br>


## 활용 예시
- Refresh Token 관리
- 랭킹 시스템
- 실시간 알림 기능 (pub / sub)
- 좋아요 같은 빠른 데이터 처리를 요하는 시스템


<br>


## 사용 시 주의점
- 서버에 장애가 발생했을 경우 그에 대한 운영 플랜이 꼭 필요합니다. 인 메모리 데이터 저장소의 특성상, 서버에 장애가 발생했을 경우 데이터 유실이 발생할 수 있기 때문입니다.
- 메모리 관리가 중요합니다.
- 싱글 스레드의 특성상, 한 번에 하나의 명령만 처리할 수 있습니다. 처리하는데 시간이 오래 걸리는 요청, 명령은 피해야 합니다.


<br>

이 외에도
- Master-Slave 형식의 데이터 이중화 구조에 대한 **Redis Replication**
- 분산 처리를 위한 **Redis cluster**
- 장애 복구 시스템 **Redis Sentinel**, **Redis Topology**, **Redis Sharding**, **Redis Failover** 등의 Redis를 더 효율적으로 사용하기 위한 개념들이 존재합니다.

<br>


# Self-Managed Redis
직접 레디스를 설치 및 관리하는 것을 Self-Managed Redis라고 일컫습니다. EC2를 통하여 Self-Managed Redis를 설치하는 방법을 기술합니다. 아래는 EC2 Linux 버전입니다.

```bash
EC2 Ver : 22.04.2 LTS
```

<br>

# Redis 설치

```bash
# apt-get 업데이트
sudo apt-get update

# redis 설치
sudo apt install redis-server
```

<br>

## 설정

```bash
# Redis 설정
sudo vi /etc/redis/redis.conf
```

<br>

## redis.conf

```bash
# bind 127.0.0.1 ::1  -> 기본 설정으로 로컬에서만 레디스를 사용할 수 있다.
bind 0.0.0.0 ::1 # 모든 IP 접근 허용 처리

# requirepass {비밀번호 지정}
requirepass redis!1234
```

```bash
# redis server 재시작
sudo service redis-server restart
```

<br>

## EC2 → Redis

```bash
# EC2(로컬)에서 레디스 접근 및 사용
redis-cli
127.0.0.1:6379> keys *
(error) NOAUTH Authentication required.

# conf에서 설정한 비밀번호 입력을 해주어야 정상 동작한다.
127.0.0.1:6379> AUTH redis!1234
OK
127.0.0.1:6379> keys *
(empty list or set)
```

<br>

## 원격에서 접근하기

저는 Mac을 사용 중이며, EC2에 설치된 Redis에 접근해 보려고 합니다.

<br>

### Mac Terminal

```bash
# HomeBrew 설치확인 -> 없다면 설치하기
brew --version

# reids 설치
brew install redis
```

![Untitled](https://file.notion.so/f/f/9e5ac57e-3f7b-45d7-9b01-25d92e74c914/2e540edb-0c95-4692-9703-ca33542a73f7/Untitled.png?id=05ec67fe-b5cb-405b-a972-c791858bc0e2&table=block&spaceId=9e5ac57e-3f7b-45d7-9b01-25d92e74c914&expirationTimestamp=1701856800000&signature=bKIOPK2V0z3ZN1vaEoIP6E3qsgWKqrGnXO1ddUSCg9c&downloadName=Untitled.png)


```bash
# 원격에 있는 Redis 접근하기.
# redis-cli -h {ec2_ip_address} -p {redis_port_number}
# redis-cli -h {ec2_ip_address} -p {redis_port_number} -a {redis_password}

redis-cli -h 123.123.123.123 -p 6379
123.123.123.123:6379> auth redis!1234
OK
123.123.123.123:6379> keys *
(empty array)
```

- 이때 접근이 안되고 무한 로딩이 걸린다면 EC2 인스턴스의 6379에 대한 포트를 보안 그룹에서 열어주면 됩니다.


<br>

```bash
redis-cli -h 123.123.123.123 -p 6379 -a password
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
123.123.123.123:6379> keys *
(empty array)
# -a라는 명령어를 통해 비밀번호를 입력하면서 접근할 수 있지만 
# 명령 인터페이스에서 -a, -u를 이용해서 인증 정보를 사용하는 것은 안전하지 않을 수 있다고 알려줍니다!
```

<br>


# Redis With Node.js
이번에는 간단하게 Node.js에서 Redis를 사용하는 방법에 대해서 알아보겠습니다.

```bash
npm init -y
npm install express axios redis dotenv
```

<br>

## .env
구현하기 전 Redis와 관련된 설정값들을 .env에 저장해 놓도록 할게요.

```
REDIS_PORT=6379
REDIS_HOST=[Redis가 설치된 EC2 IP]
REDIS_PASSWORD=redis!1234
```

<br>

## server.js

간단하게 하나의 파일로 Redis 접근법에 대해서 알아보겠습니다. 시작하기 전에 아래 구조로 기본적인 뼈대 코드를 작성하려고 하는데요.

- redis.createClient는 HOST, PORT, PASSWORD 정보 등을 통해 레디스 클라이언트 객체를 생성하는 역할을 하고,
- redisClient.connect는 해당 클라이언트 정보로 커넥션을 시도하는 역할을 합니다.

또한, redisClient에서 발생하는 이벤트에 대한 코드들도 작성했으며, 서버 종료 시 작업한 데이터를 삭제하기 위해 redisClient.flushAll()를 적용해 놓았습니다.

```jsx
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

redisClient.on('ready', () => {
  console.log('Redis 클라이언트의 명령 처리 준비 완료되었습니다.');
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
```

이 코드를 한번 실행시켜 보면, 아래와 같은 로그가 발생하게 됩니다.

![Untitled](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9e5ac57e-3f7b-45d7-9b01-25d92e74c914%2F65ddf97d-cb4a-4fb5-bb8f-c1cdeae55b76%2FUntitled.png?table=block&id=de8bf105-9670-4042-b97e-96e9bef83da6&spaceId=9e5ac57e-3f7b-45d7-9b01-25d92e74c914&width=2000&userId=40ea3e7b-8bc8-403b-8d7d-5860174ef674&cache=v2)

<br>

또한, 서버를 종료하면 아래와 같은 메시지가 뜨게 됩니다.

![Untitled](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9e5ac57e-3f7b-45d7-9b01-25d92e74c914%2Ff7831394-e5a7-4737-b1ef-8c9f545f7f7c%2FUntitled.png?table=block&id=3c8804fd-487b-405b-90bf-ea266be44704&spaceId=9e5ac57e-3f7b-45d7-9b01-25d92e74c914&width=2000&userId=40ea3e7b-8bc8-403b-8d7d-5860174ef674&cache=v2)

<br>

Redis의 이벤트 리스너들은 확인해 보았고 이제는 실제로 명령어(쿼리X)를 사용하여 Redis를 사용해 봅시다. 이번 글에서는 간단한 사용법 정도만 익히고, 실제로 Redis의 다양한 컬렉션을 활용해 보는 것은 다음 글에서 이어 나가도록 하겠습니다.

이제부터 EC2 서버로 Redis 명령어를 날려줄, Redis 코드들은  데이터베이스를 사용해 보는 코드는 redisClient의 상태가 ready가 되고 나서 콜백 함수에 작성하도록 하겠습니다.

```jsx
redisClient.on('ready', async() => {
  console.log('Redis 클라이언트의 명령 처리 준비 완료되었습니다.');
	.
	.
	.
	.
});
```

<br>

가상의 user 데이터를 가정하고 문자열(strings) 데이터를 저장 및 확인, 조회 및 확인해 볼까요?

```jsx
redisClient.on('ready', async() => {
  console.log('Redis 클라이언트의 명령 처리 준비 완료되었습니다.');
  const setUser = await redisClient.set("user:example-data:1", "john1234")
  console.log(setUser)
  const getUser = await redisClient.get("user:example-data:1")
  console.log(getUser)
});
```

console.log 결과가 아래처럼 찍혔습니다.

![Untitled](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9e5ac57e-3f7b-45d7-9b01-25d92e74c914%2F0a395199-e44a-4089-a7fa-bee1148ba478%2FUntitled.png?table=block&id=fba800ad-4f17-43a7-b4c1-946f59988709&spaceId=9e5ac57e-3f7b-45d7-9b01-25d92e74c914&width=2000&userId=40ea3e7b-8bc8-403b-8d7d-5860174ef674&cache=v2)

<br>

또한 실제 EC2 Redis에서 확인해 보면 잘 저장된 것을 확인할 수 있습니다.

![스크린샷 2023-12-06 오전 10.54.05.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9e5ac57e-3f7b-45d7-9b01-25d92e74c914%2F811b9134-4f9b-491e-81fe-61b6ac811058%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-12-06_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_10.54.05.png?table=block&id=cda5ba7a-3f1a-4045-bed5-05526139c322&spaceId=9e5ac57e-3f7b-45d7-9b01-25d92e74c914&width=2000&userId=40ea3e7b-8bc8-403b-8d7d-5860174ef674&cache=v2)

이 글은 간단한 사용법만을 알아보았으며, 전체적인 컬렉션 확인법은 다음 글에서 기술하도록 하겠습니다.