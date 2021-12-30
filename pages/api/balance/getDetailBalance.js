
export default async function getDetailBalance(req,res) {
    // req.setHeader('user-Agent')
  //  const {header} = req;
     const data = await fetch(`${process.env.NEXT_PUBLIC_BALANCE}`,{ 
       method: 'POST', 
       headers: {"Content-Type": "application/json"}, 
       body: req,
   });
  const json = await data.json()
  res.send(json)
 }
 export const config = {
    api: {
      bodyParser: false,
      externalResolver: true,
    },
  }
 
  