const { parse } = require('url');
var fs = require("fs");
var formidable = require("formidable");

export default async function fileUpload(req,res) {
     console.log("FILE_______>>>>!!>>>" , req.file  , "__TTTTT__FILE_QQQQQQttmmmbb_FROMAPI end point");

    
     // req.method = "forgot_password"
     // req.id = 0
     // req.jsonrpc = "2.0"
//     const data = await fetch(`${process.env.NEXT_PUBLIC_FORGOT_PWD}`,{ 
//         method: 'POST', 
//         headers: {
//          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
//           "Content-Type": "application/json"
//          }, 
//         body: req,
//     });
//    const json = await data.json()
//    res.send(json)
 }
 
 export const config = {
     api: {
       bodyParser: true,
       externalResolver: true
     },
   }