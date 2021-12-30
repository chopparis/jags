export default async function favouriates(req,res) {
    //  console.log(req , "__FROMAPI end point")
    //const data = await fetch('http://192.168.6.23/api/player/registration',{ 

      let clientObj = {...req.body.params}
        clientObj['session_id'] = req.cookies.tocken;
        clientObj["api_key"] = process.env.NEXT_PUBLIC_API_KEY;


      // JSON.stringify({"jsonrpc":"2.0","id":0,"method":"registration","params":{"adressOne":null,"adressTwo":null,"city":null,"country":null,"zipCode":null,"phoneNum":null,"first_name":null,"last_name":null,"gender":null,"dob":"1985-09-17","nationality":"United States","currency":"USD","username":"rererrer","email":"ra@gmail.com","password":"qwerfdsa","security_question":"What is the name of your first pet?","security_answer":"aaa","checked":true,"site_code":"DGTESTSITE"}})
      let obj = { "jsonrpc": "2.0", "id": 0, method: "set_favourite", params:  clientObj}

      const data = await fetch(`${process.env.NEXT_PUBLIC_GAME_FAVOURITE}`,{ 
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