
export default async function profile(req,res) {

    let obj = { "jsonrpc": "2.0", "id": 0, method: "profile", params:  {"session_id": req.cookies.tocken ? req.cookies.tocken : "" }}
//   console.log(obj , "_________PROFILE")
       const data = await fetch(`${process.env.NEXT_PUBLIC_PLAYER_PROFILE}`,{ 
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