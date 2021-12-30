//var parse = require('url-parse')
// const { parse } = require('url')
//const parsedUrl = parse("http://192.168.6.23/api/player/login", true)

export default async function logout(req,res) {
  //  console.log(req.body , "_dddd_FROMAPI end point")
   //const data = await fetch('http://192.168.6.23/api/player/login',{ 
  //   let obj = {
  //     "jsonrpc": "2.0", "id": 0, method: "logout",
  //     params: req.body.params
  // }

  let obj = {
    "jsonrpc": "2.0", "id": 0, method: "logout",
    params: {
      site_code: process.env.NEXT_PUBLIC_SITE_CODE, 
      "session_id": req.cookies.tocken 
    }
}

     const data = await fetch(`${process.env.NEXT_PUBLIC_LOG_OUT_PATH}`,{ 
   // const data = await fetch('https://reqres.in/api/users',{ 
       method: 'POST', 
       headers: {"Content-Type": "application/json"}, 
       body: JSON.stringify(obj),
   });
  const json = await data.json()
  res.send(json)
}

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
  }