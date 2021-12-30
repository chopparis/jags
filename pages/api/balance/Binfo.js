
export default async function Binfo(req,res) {
   // req.setHeader('user-Agent')
 //  const {header} = req;


 let obj = { "jsonrpc": "2.0", "id": 0, method: "get_balance", params: { "session_id": req.cookies.tocken ? req.cookies.tocken : ""} }

    const data = await fetch(`${process.env.NEXT_PUBLIC_BALANCE}`,{ 
      method: 'POST', 
      headers: {"Content-Type": "application/json"}, 
      body:  JSON.stringify(obj)
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

 
