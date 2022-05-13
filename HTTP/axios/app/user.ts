import express from "express";
const router = express.Router();

//判断是否存在sessionid
router.post("/login", (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  const cookies = req.headers.cookie;
  let flag = -2;
  cookies.split(";").forEach((item) => {
    if (item.split("=")[0].indexOf("sessionid") != -1) {
      flag = 1;
      const json = {
        statusCode: 1,
        top: "获取成功",
        data: req.body,
      };
      res.end(JSON.stringify(json));
    }
  });
  if (flag == -2) {
    const json = {
      statusCode: -2,
      top: "未登录",
    };
    res.end(JSON.stringify(json));
  }
});

// 退出
router.get("/logout", (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.clearCookie("sessionid"); //退出登录时清楚sessionid
  const json = {
    statusCode: -1,
    data: "退出登录",
  };
  res.end(JSON.stringify(json));
});

// 获取列表
router.post("/list", (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  const cookies = req.headers.cookie;
  let flag = -2;
  cookies.split(";").forEach((item) => {
    if (item.split("=")[0].indexOf("sessionid") != -1) {
      flag = 1;
      const data = [
        { id: 1, name: "tom" },
        { id: 2, name: "jerry" },
      ];
      const find = (data) => {
        return [data.find((item) => item.name == req.body.name)];
      };
      const json = {
        statusCode: 1,
        top: "获取成功",
        data: req.body.name ? find(data) : data,
      };
      setTimeout(() => {
        res.end(JSON.stringify(json));
      }, 1000);
      // 如果给 res.end() 方法传入一个对象，会发生报错：
      // res.send() body 参数可以是 Buffer、Object、String、Boolean 或 Array。
      // req.body.name ? res.end(JSON.stringify(json)) : res.end({});
      // res.end(JSON.stringify(json));
    }
  });
  if (flag == -2) {
    const json = {
      statusCode: -2,
      top: "未登录",
    };
    res.end(JSON.stringify(json));
  }
});

export default router;
