
export async function getRegistrationInfo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REGISTRATION_INFO_PATH}`)
    const json = await res.json()
    return json;
 }


//  export default async function getRegistrationInfo(req,res) {

//       const data = await fetch(`${process.env.NEXT_PUBLIC_REGISTRATION_INFO_PATH}`,{ 
//         method: 'POST', 
//         headers: {"Content-Type": "application/json"}, 
//         body: JSON.stringify(obj),
//     });
//    const json = await data.json()
//    res.send(json)
//  }

//  export const config = {
//   api: {
//     bodyParser: false,
//     externalResolver: true,
//   },
// }