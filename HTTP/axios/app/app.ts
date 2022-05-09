import express from "express";
const app = express();

app.use(express.urlencoded({ extended: false }));
// 配置 cors 这个中间件
import cors from "cors";
app.use(cors());

// session
import session from "express-session";
import FileStore from "session-file-store";
const FileStores = FileStore(session);
//引用文件
// 只要http请求有insurance就会创建session
app.use(
  "/login",
  session({
    name: "sessionid",
    // store: new FileStores(), //数据持久化方式，这里表示本地文件存储
    secret: "sksdfiwieriweixdif22342slsdSsdfc.#sdfdfs*",
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/", httpOnly: true },
  })
);

// req.body接值为空问题
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import router from "./user.ts";
app.use("/", router);

app.listen(7777, function () {
  console.log("http://localhost:7777/");
});
