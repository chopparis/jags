
export default async function details(req,res) {

  let obj = { "jsonrpc": "2.0", "id": 0, method: "get_session_details", params:  {"session_id": req.cookies.tocken }}


     const data = await fetch(`${process.env.NEXT_PUBLIC_SESSION_DETAILS}`,{ 
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