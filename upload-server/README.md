# ea-upload 测试服务器

用于支持 `ea-upload` 组件开发与测试的 Node.js 文件上传服务器。

## 快速开始

```bash
cd upload-server
npm install
npm start          # 生产模式
npm run dev       # 开发模式（文件变更自动重启）
```

启动后访问：

| 地址                                | 说明                       |
| ----------------------------------- | -------------------------- |
| http://localhost:3100               | 测试页面（可视化上传测试） |
| http://localhost:3100/health        | 健康检查                   |
| http://localhost:3100/api/upload/\* | 上传 API                   |

## 配置

通过环境变量或修改 `src/config.js` 调整：

| 变量       | 默认值  | 说明                             |
| ---------- | ------- | -------------------------------- |
| `PORT`     | 3100    | 服务端口                         |
| `HOST`     | 0.0.0.0 | 监听地址                         |
| `NODE_ENV` | -       | 设为 `production` 时启用生产模式 |

`src/config.js` 中的默认配置：

```js
{
  upload: {
    maxFileSize: 10 * 1024 * 1024,  // 10MB
    maxFiles: 10,
    allowedTypes: null,              // null = 允许所有类型
  },
  cleanup: {
    interval: 30 * 60 * 1000,        // 30分钟清理一次
    maxAge: 60 * 60 * 1000,           // 文件保留1小时
  }
}
```

## API 接口文档

### 统一响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### GET /health

健康检查。

**响应**：

```json
{
  "code": 0,
  "message": "success",
  "data": { "status": "ok", "timestamp": 1700000000000, "uptime": 3600 }
}
```

### POST /api/upload/single

单文件上传。

**请求**：`multipart/form-data`，字段名 `file`

**可选 Query 参数**（见下方「测试参数」表格）

**成功响应**（200）：

```json
{
  "code": 0,
  "message": "文件上传成功",
  "data": {
    "file": {
      "id": "abc123def456",
      "originalName": "photo.jpg",
      "mimeType": "image/jpeg",
      "size": 102400,
      "path": "uploads/1700000000000-abc123-photo.jpg",
      "uploadedAt": 1700000000000
    }
  }
}
```

### POST /api/upload/multiple

多文件上传。

**请求**：`multipart/form-data`，字段名 `files`（可重复）

**成功响应**（200）：

```json
{
  "code": 0,
  "message": "多文件上传成功",
  "data": {
    "files": [ { ... }, { ... } ],
    "count": 3
  }
}
```

### POST /api/upload/progress

带进度跟踪的文件上传。需在请求头中携带 `x-upload-id` 指定上传 ID。

**请求头**：`x-upload-id: my-upload-id-123`

**成功响应**（200）：

```json
{
  "code": 0,
  "message": "文件上传成功",
  "data": {
    "file": { ... },
    "uploadId": "my-upload-id-123"
  }
}
```

### GET /api/upload/progress/:id

查询上传进度。

**成功响应**（200）：

```json
{
  "code": 0,
  "message": "进度查询成功",
  "data": {
    "uploadId": "my-upload-id-123",
    "total": 102400,
    "received": 51200,
    "percent": 50,
    "status": "uploading",
    "startedAt": 1700000000000,
    "finishedAt": null
  }
}
```

**状态值**：`uploading` | `completed` | `aborted` | `error`

### GET /api/upload/files

列出所有已上传文件。

### GET /api/upload/files/:id

查询单个文件元数据。

### DELETE /api/upload/files/:id

删除指定文件（同时删除磁盘文件）。

### POST /api/upload/cleanup

清理全部临时文件。

## 测试参数

所有上传接口支持以下 Query 参数，用于模拟各种测试场景：

| 参数         | 类型   | 说明                           | 示例                              |
| ------------ | ------ | ------------------------------ | --------------------------------- |
| `maxSize`    | string | 覆盖文件大小限制               | `?maxSize=2mb`                    |
| `accept`     | string | 覆盖允许的文件类型（逗号分隔） | `?accept=image/*,application/pdf` |
| `forceError` | number | 强制返回指定错误码             | `?forceError=500`                 |
| `delay`      | number | 延迟响应（毫秒）               | `?delay=2000`                     |
| `failRate`   | number | 随机失败概率（0~1）            | `?failRate=0.5`                   |
| `maxFiles`   | number | 最大文件数                     | `?maxFiles=5`                     |

组合示例：

```
POST /api/upload/single?maxSize=1mb&accept=image/*&delay=1000
```

## 测试场景覆盖

| 场景         | 测试方式                                                          |
| ------------ | ----------------------------------------------------------------- |
| 单文件上传   | `POST /api/upload/single`                                         |
| 多文件上传   | `POST /api/upload/multiple`                                       |
| 文件类型限制 | `?accept=image/*`，期望返回 415                                   |
| 文件大小限制 | `?maxSize=1mb`，上传大文件期望返回 413                            |
| 上传中断     | 客户端 `AbortController` 中断请求                                 |
| 上传失败     | `?forceError=500` 强制失败                                        |
| 随机失败     | `?failRate=0.5` 模拟不稳定网络                                    |
| 进度反馈     | `POST /api/upload/progress` + `GET /api/upload/progress/:id` 轮询 |
| 慢速上传     | `?delay=2000` 延迟响应，便于观察进度条                            |

## 前端测试代码示例

### 基本上传（带进度）

```javascript
const formData = new FormData();
formData.append("file", file);

const xhr = new XMLHttpRequest();

xhr.upload.addEventListener("progress", e => {
  if (e.lengthComputable) {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(`上传进度: ${percent}%`);
  }
});

xhr.addEventListener("load", () => {
  const res = JSON.parse(xhr.responseText);
  console.log("上传完成", res);
});

xhr.addEventListener("error", () => {
  console.error("上传失败");
});

xhr.open(
  "POST",
  "http://localhost:3100/api/upload/single?maxSize=5mb&accept=image/*"
);
xhr.send(formData);
```

### 带中断的上传

```javascript
const controller = new AbortController();

fetch("http://localhost:3100/api/upload/single", {
  method: "POST",
  body: formData,
  signal: controller.signal,
}).catch(err => {
  if (err.name === "AbortError") {
    console.log("上传已取消");
  }
});

// 3 秒后中断
setTimeout(() => controller.abort(), 3000);
```

### 服务端进度跟踪

```javascript
const uploadId = "my-upload-" + Date.now();

// 上传文件
fetch("http://localhost:3100/api/upload/progress", {
  method: "POST",
  headers: { "x-upload-id": uploadId },
  body: formData,
});

// 轮询服务端进度
const timer = setInterval(async () => {
  const res = await fetch(
    `http://localhost:3100/api/upload/progress/${uploadId}`
  );
  const data = await res.json();
  console.log(`服务端进度: ${data.data.percent}%`);
  if (data.data.status !== "uploading") clearInterval(timer);
}, 300);
```

## 临时文件存储与清理策略

### 存储策略

- 文件存储于 `upload-server/uploads/` 目录
- 文件命名规则：`{timestamp}-{random6}-{originalName}.{ext}`，避免命名冲突
- 元数据（文件 ID、原名、类型、大小、路径、时间）存储于内存 `Map`
- `uploads/` 目录已加入 `.gitignore`

### 清理机制

| 方式         | 触发时机                       | 说明                          |
| ------------ | ------------------------------ | ----------------------------- |
| 定时清理     | 每 30 分钟                     | 自动删除超过 1 小时的临时文件 |
| 手动清理     | `POST /api/upload/cleanup`     | 清理全部临时文件              |
| 单文件删除   | `DELETE /api/upload/files/:id` | 删除指定文件                  |
| 进程退出清理 | `SIGINT` / `SIGTERM`           | 服务器关闭时清理全部临时文件  |

### 进度数据清理

- 进度记录在上传完成后保留 5 分钟（供客户端查询），之后自动从内存移除

## 项目结构

```
upload-server/
├── package.json
├── .gitignore
├── README.md
├── src/
│   ├── app.js                   # Express 应用初始化
│   ├── config.js                # 配置项
│   ├── server.js                # 启动入口
│   ├── store/
│   │   └── progress.js          # 进度 & 文件元数据存储（内存 Map）
│   ├── middleware/
│   │   ├── cors.js              # CORS 配置
│   │   ├── logger.js            # HTTP 请求日志（文件 + 控制台）
│   │   ├── progressTracker.js   # 字节计数进度跟踪
│   │   ├── upload.js            # Multer 配置（单/多文件、类型/大小过滤）
│   │   └── errorHandler.js      # 统一错误处理
│   ├── routes/
│   │   ├── health.js            # 健康检查路由
│   │   └── upload.js            # 上传相关路由
│   └── utils/
│       ├── response.js          # 统一响应格式
│       └── cleanup.js           # 临时文件定时清理
├── public/
│   └── index.html               # 可视化测试页面
└── uploads/                     # 临时文件存储（gitignored）
```

## 技术栈

- **Express.js** 4.x — Web 框架
- **multer** 2.x — multipart/form-data 文件上传处理
- **cors** 2.8 — 跨域支持
- **morgan** 1.10 — HTTP 请求日志
- **nanoid** 3.x — 文件 ID 生成
