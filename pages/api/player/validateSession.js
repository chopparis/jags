
export default async function validateSession(req,res) {

  let obj = { "jsonrpc": "2.0", "id": 0, method: "is_valid_session", params:  {"session_id": req.cookies.tocken ? req.cookies.tocken : "" }}


     const data = await fetch(`${process.env.NEXT_PUBLIC_VALIDATE_SESSION}`,{ 
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