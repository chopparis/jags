export default async function isAccountAvailavle(req,res) {
    // console.log(req.body , "_dddYYYYYYYYYY_FROMAPI end point")
  //   console.log(req , "__FROMAPI account end point")
  //  //const data = await fetch('http://192.168.6.23/api/player/is_account_available',{ 

    let obj = { "jsonrpc": "2.0", "id": 0, method: "is_account_available",  params: req.body.params}
     
    const data = await fetch(`${process.env.NEXT_PUBLIC_USER_VAILABLE_PATH}`,{ 
       method: 'POST', 
       json: true,
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
