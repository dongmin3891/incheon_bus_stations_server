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

const busApiUrl = "http://apis.data.go.kr/6280000/busLocationService/getBusRouteLocation?"
const serviceKey = "L%2F1NA9bpn1I%2FXr0C2YPtJGNnZXPyrz3O7o3Hvn8ALqFO9DA40GocvMWlaoq6ofkUhaUTcoGKXmTLhkmTz3bVuA%3D%3D&"
const numOfRows = "2&"
const pageNo = "1&"
const routeId = "165000196"

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

app.get("/api/busData", (req, res) => {
  console.log("======[GET] busData ======");
  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.statusCode = 200;
  
  request.get(
    {
      uri: `${busApiUrl}serviceKey=${serviceKey}numOfRows=${numOfRows}pageNo=${pageNo}routeid=${routeId}`,
    },
    function (error, response, body) {
      console.log("body", body);
      console.log("error", error);
      res.send(converter.xml2json(body));
    }
  )
})
