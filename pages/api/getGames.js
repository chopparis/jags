export default async function getGames(req, res) {
  //const { cookies } = req
 // console.log(req.cookies.tocken, "______req.cookies.tocken testing_______tockentocken______CHANGES")
  //  console.log(req , "__FROMAPI end point")
  //const data = await fetch('http://192.168.6.23/api/player/registration',{ 

  let clientObj = { ...req.body.params }
  clientObj["api_key"] = process.env.NEXT_PUBLIC_API_KEY;


  let objCookie = { "jsonrpc": "2.0", "id": 0, method: "is_valid_session", params: { "session_id": req.cookies.tocken ? req.cookies.tocken : ""} }
  const cookieInfo = await fetch(`${process.env.NEXT_PUBLIC_VALIDATE_SESSION}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objCookie),
  });

  const cookieStatus = await cookieInfo.json();

  if (cookieStatus && cookieStatus.result && cookieStatus.result.is_valid) {
    clientObj['session_id'] = req.cookies.tocken;
  } else {

  }



  // if (req.body.params.isUserLogin) {
  //   clientObj['session_id'] = req.cookies.tocken;
  // }


  // JSON.stringify({"jsonrpc":"2.0","id":0,"method":"registration","params":{"adressOne":null,"adressTwo":null,"city":null,"country":null,"zipCode":null,"phoneNum":null,"first_name":null,"last_name":null,"gender":null,"dob":"1985-09-17","nationality":"United States","currency":"USD","username":"rererrer","email":"ra@gmail.com","password":"qwerfdsa","security_question":"What is the name of your first pet?","security_answer":"aaa","checked":true,"site_code":"DGTESTSITE"}})
  let obj = { "jsonrpc": "2.0", "id": 0, method: "get_games", params: clientObj }
  // console.log(obj, "___________VV_ddd__obj________tockentocken______CHANGES")
  const data = await fetch(`${process.env.NEXT_PUBLIC_GET_GAMES}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
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