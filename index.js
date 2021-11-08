//Express 모듈을 불러온다.
const express = require('express');
const converter = require('xml-js')
//Express 객체를 생성한다.
const app = express();
const port = 3002;
const request = require('request');
app.listen(port, function() {
  console.log(`Server app listening at http://localhost:${port}`);
})


const busApiUrl = "http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList"
const bustRouteApiUrl = "http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList"
const serviceKey = "L%2F1NA9bpn1I%2FXr0C2YPtJGNnZXPyrz3O7o3Hvn8ALqFO9DA40GocvMWlaoq6ofkUhaUTcoGKXmTLhkmTz3bVuA%3D%3D"
const routeId = "232000089"

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

