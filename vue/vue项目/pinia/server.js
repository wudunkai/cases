const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, ".", `qiepian`); // 切片存储目录

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  console.log(req.url)

  if (req.url === '/upload') {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log('error', err)
        return;
      }
      const [file] = files.file;
      const [fileName] = fields.fileName;
      const [chunkName] = fields.chunkName;
      // 保存切片的文件夹的路径，比如  张远-嘉宾.flac-chunks
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
      // // 切片目录不存在，创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }
      // 把切片移动到切片文件夹
      await fse.move(file.path, `${chunkDir}/${chunkName}`);
      res.end(
        JSON.stringify({
          code: 0,
          message: "切片上传成功"
        }));
    });
  }
  // 接收请求的参数
  const resolvePost = req =>
    new Promise(res => {
      let chunk = ''
      req.on('data', data => {
        chunk += data
      })
      req.on('end', () => {
        res(JSON.parse(chunk))
      })

    })
  const pipeStream = (path, writeStream) => {
    console.log('path', path)
    return new Promise(resolve => {
      const readStream = fse.createReadStream(path);
      readStream.on("end", () => {
        fse.unlinkSync(path);
        resolve();
      });
      readStream.pipe(writeStream);
    });
  }

  // 合并切片
  const mergeFileChunk = async (filePath, fileName, size) => {
    // filePath：你将切片合并到哪里，的路径
    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
    let chunkPaths = null
    // 获取切片文件夹里所有切片，返回一个数组
    chunkPaths = await fse.readdir(chunkDir);
    // 根据切片下标进行排序
    // 否则直接读取目录的获得的顺序可能会错乱
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    const arr = chunkPaths.map((chunkPath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    })
    await Promise.all(arr)
    fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
  };
  if (req.url === '/merge') {
    const data = await resolvePost(req);
    const { fileName, size } = data;
    const filePath = path.resolve(UPLOAD_DIR, fileName);
    await mergeFileChunk(filePath, fileName, size);
    res.end(
      JSON.stringify({
        code: 0,
        message: "文件合并成功"
      })
    );
  }
  if (req.url === '/verify') {
    const createUploadedList = async fileName =>
      fse.existsSync(path.resolve(UPLOAD_DIR, fileName)) ? await fse.readdir(path.resolve(UPLOAD_DIR, fileName)) : []
    const data = await resolvePost(req);
    const { fileName } = data
    const filePath = path.resolve(UPLOAD_DIR, fileName);
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      )
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(`${fileName}-chunks`)
        })
      )
    }
  }
})

server.listen(3001, () => console.log("正在监听 3001 端口"));