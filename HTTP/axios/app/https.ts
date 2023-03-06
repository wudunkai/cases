import express from "express";
import multipart from "connect-multiparty";
const router = express.Router();
const multipartyMiddleware = multipart();

// get
router.get("/get", (req, res) => {
  const query = req.query;
  res.header("Content-Type", "application/json; charset=utf-8");
  const json = {
    statusCode: 0,
    data: query,
    msg: "get方法",
    success: true,
  };
  res.end(JSON.stringify(json));
});
// post
router.post("/post", multipartyMiddleware, (req, res) => {
  const body = req.body;
  const query = req.query;
  res.header("Content-Type", "application/json; charset=utf-8");
  let data;
  Object.keys(body).length && (data = body);
  Object.keys(query).length && (data = query);
  const json = {
    statusCode: 0,
    data,
    msg: `post方法`,
    success: true,
  };
  res.end(JSON.stringify(json));
});
// put
router.put("/put", multipartyMiddleware, (req, res) => {
  const body = req.body;
  const query = req.query;
  res.header("Content-Type", "application/json; charset=utf-8");
  let data;
  Object.keys(body).length && (data = body);
  Object.keys(query).length && (data = query);
  const json = {
    statusCode: 0,
    data,
    msg: `post方法`,
    success: true,
  };
  res.end(JSON.stringify(json));
});

export default router;
