export default async function resetPassword(req,res) {
  // const data = await fetch('http://192.168.6.23/api/player/reset_password',{ 
    const data = await fetch(`${process.env.NEXT_PUBLIC_REGISTRATION_PATH}`,{ 
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