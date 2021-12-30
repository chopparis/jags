
export default async function getGameURL(req,res) {
    // req.setHeader('user-Agent')

//     const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = Object.create(null); // or just '{}', an empty object

let clientObj = { ...req.body.params }
clientObj["api_key"] = process.env.NEXT_PUBLIC_API_KEY;
clientObj['session_id'] = req.cookies.tocken;

  //  const {header} = req;
  let obj = { "jsonrpc": "2.0", "id": 0, method: "game_launch", params:  clientObj}

     const data = await fetch(`${process.env.NEXT_PUBLIC_GAME_LAUNCHER}`,{ 
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
 
  
 