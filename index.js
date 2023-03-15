const express = require('express');
const converter = require('xml-js')
const app = express();
const port = (process.env.PORT || 4000)
const cors = require('cors');
const request = require('request');
const KJUR = require('jsrsasign')

app.listen(port, function() {
  console.log(`Server app listening at http://localhost:${port}`);
})
app.use(cors());

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlVCYkNTbFJ1UnlHeUx2VGh5VlFtcVEiLCJleHAiOjE2NzkzODEwMzcsImlhdCI6MTY3ODc3NjIzOH0.lwbHgvSCkZSE7LrqWaguiY37lp_ZwhktiKJs59ZdIxs'
// http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey=인증키(URL Encode)&stationId=200000177&routeId=200000037&staOrder=19

app.set('port', port);

app.get("/api/test", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // res.headers["authorization"] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlVCYkNTbFJ1UnlHeUx2VGh5VlFtcVEiLCJleHAiOjE2Nzg4NTY4MjAsImlhdCI6MTY3ODc3MDQyMX0.ZMhUBtNCeb_lm_eYzOTXznz9TKJw86NDppwQka9JL8'
  
  res.statusCode = 200;
  // api 요청 할 때마다 토큰을 재생성 해줌으로 사이트가서 안긁어와도 됨
  // const authorization = generateVideoSdkApiJwt(VIDEO_SDK_API_KEY, VIDEO_SDK_SECRET_KEY)

  const options = {
    method: 'GET',
    url: 'https://api.zoom.us/v2/videosdk/sessions?type=past&from=2023-03-10',
    // url: 'https://api.zoom.us/v2/users',

    headers: {
      authorization: `Bearer ${JWT_TOKEN}`, // Do not publish or share your token publicly.
    },
  };
  request(options, function(error, response, body) {
      res.send(body);
  })
});

function generateVideoSdkApiJwt(sdkApiKey, sdkApiSecret) {

  const iat = Math.round((new Date().getTime() - 30000) / 1000)
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    iss: sdkApiKey,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const videosdk_api_token = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkApiSecret)
  return videosdk_api_token
}
