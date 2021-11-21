//Express 모듈을 불러온다.
const express = require('express');
const converter = require('xml-js')
//Express 객체를 생성한다.
const app = express();
const https = require('https');
const port = (process.env.PORT || 443)
const request = require('request');
app.listen(port, function() {
  console.log(`Server app listening at http://localhost:${port}`);
})

//https.createServer(options, app).listen(PORT);

const busApiUrl = "http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList" //버스위치정보
const bustRouteApiUrl = "http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList" //버스노선정보
const busArrivalApiUrl = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem"
const serviceKey = "L%2F1NA9bpn1I%2FXr0C2YPtJGNnZXPyrz3O7o3Hvn8ALqFO9DA40GocvMWlaoq6ofkUhaUTcoGKXmTLhkmTz3bVuA%3D%3D"
const routeId = "232000089" // 김포 90-1번
const stationId = "168000413" //마전역

// http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey=인증키(URL Encode)&stationId=200000177&routeId=200000037&staOrder=19

app.set('port', port);

app.get("/api/test", (req, res) => {
  console.log("======[GET] test ======");
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  let data = {
    rest_ce: "100",
    resp_data: {
      "name" : "kim dong min",
      "age" : 30
    },
    resp_msg: "정상적으로 처리되었습니다."
  };
  console.log(data);
  res.send(JSON.stringify(data));
})

//버스위치정보
app.get("/api/busData", (req, res) => {
  console.log("======[GET] busData ======");
  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.statusCode = 200;
  
  request.get(
    {
      uri: `${busApiUrl}?serviceKey=${serviceKey}&routeId=${routeId}`,
    },
    function (error, response, body) {
      console.log("body", body);
      console.log("error", error);
      res.send(converter.xml2json(body));
    }
  )
})

//버스노선
app.get("/api/busRoute", (req, res) => {
  console.log("======[GET] busRoute =======");
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  request.get(
    {
      uri : `${bustRouteApiUrl}?serviceKey=${serviceKey}&routeId=${routeId}`,
    },
  
    function (error, response, body) {
      console.log("error", error)
      res.send(converter.xml2json(body));
    }
  )
});


//버스도착정보조회
app.get("/api/busArrival", (req, res) => {
  console.log("======[GET] busArrival =======");
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  request.get(
    {
      uri : `${busArrivalApiUrl}?serviceKey=${serviceKey}&stationId=${stationId}&routeId=${routeId}`,
    },
  
    function (error, response, body) {
      console.log("error", error)
      res.send(converter.xml2json(body));
    }
  )
});

// app.get("*", function (req, res) {
//   var file = path.join(dir, req.path.replace(/\/$/, "/index.html"));
//   console.log("file: " + file);
//   if (file.indexOf(dir + path.sep) !== 0) {
//       return res
//           .status(403)
//           .end("Forbidden");
//   }
//   var type = mime[
//       path
//           .extname(file)
//           .slice(1)
//           .toLowerCase()
//   ] || "text/plain";
//   console.log("type: " + type);

//   var s = fs.createReadStream(file);
//   s.on("open", function () {
//       res.set("Content-Type", type);
//       s.pipe(res);
//   });
//   s.on("error", function () {
//       res.set("Content-Type", "text/plain");
//       res
//           .status(404)
//           .end("Not found");
//   });
// })
