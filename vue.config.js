const fs = require("fs");
const ENV = process.env.NODE_ENV;
module.exports = {
  publicPath: ENV === "development" ? "" : "./dist/",
  devServer: {
    // proxy: {
    //   "/homework1_4_war": {
    //     target: "http://47.94.232.213:8080/homework1_4_war", //API服务器的地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/homework1_4_war": ""
    //     }
    //   }
    // }
    before(app) {
      // let tableName = "地下水样采集记录";
      // let tbHeadUrl = "/XingKaiHu1/TbHeadServlet?tableidjs=" + tableName;
      // app.get("/XingKaiHu1/TbHeadServlet*", (req, res) => {
      //   const data = fs.readFileSync(`mock/data/tableHeader.json`).toString();
      //   const json = JSON.parse(data);
      //   // console.log(req);
      //   return res.json(json);
      // });
      // app.get("/XingKaiHu1/jsonServlet*", (req, res) => {
      //   const data = fs.readFileSync(`mock/data/tableData.json`).toString();
      //   const json = JSON.parse(data);
      //   // console.log(req);
      //   return res.json(json);
      // });
      app.get("/XingKaiHu1/*", (req, res) => {
        let url = req.originalUrl;

        if (url.indexOf("satellite") !== -1) {
          fs.readFile(`mock${url}`, function(err, data) {
            res.writeHead(200, { "Content-Type": "image/jpg" });
            res.end(data);
          });
        } else if (url.indexOf("overlay") !== -1) {
          // console.log(url);
          fs.readFile(`mock${url}`, function(err, data) {
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(data);
          });
        } else if (url.indexOf("originalpaper") !== -1) {
          fs.readFile(`mock${url}`, function(err, data) {
            res.writeHead(200, { "Content-Type": "image/jpg" });
            res.end(data);
          });
        } else {
          const data = fs.readFileSync(`mock${req.path}.json`).toString();
          const json = JSON.parse(data);
          return res.json(json);
        }
      });
    }
  }
};
