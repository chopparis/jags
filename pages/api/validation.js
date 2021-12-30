import nextConnect from "next-connect";
const handler = nextConnect();
const requestIp = require('request-ip') 

handler.post(async (req, res, next) => {


let obj = { "jsonrpc": "2.0", "id": 0, method: "login", params: req.body.params }

  // let options = {
  //   "jsonrpc": "2.0", "id": 0, method: "login",
  //   params: {
  //     //...values,
  //     username: req.query._u,
  //     password: req.query._p,
  //     site_code: process.env.NEXT_PUBLIC_SITE_CODE,
  //   }
  // }

  //if (req.method === 'POST') {

   let ip = requestIp.getClientIp(req)

    console.log(ip ,  "<__VV____LOGIN_______________IPIPIPIPIPI");

    // var ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    //   if (ip.substr(0, 7) == "::ffff:") {
    //     ip = ip.substr(7)
    //     console.log(ip , "<_____________________IPIPIPIPIPI")
    //   }
  //}


  const data = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_PATH}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  });
  // body: JSON.stringify(objectWithData),
  const json = await data.json()
  res.send(json)

  //req.hello = "world";
  //next(); // call to proceed to next in chain
});
export default handler;


export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

