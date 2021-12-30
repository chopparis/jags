import Cors from 'cors'

// Initializing the cors middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD','POST'],
// })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

// export async function cmsHomeTest() {

//     let url = process.env.NEXT_PUBLIC_HOME_CONFIG + "?site_code=" + process.env.NEXT_PUBLIC_SITE_CODE + "&language=us_en";
    
//     const data = await fetch(url, {
//         method: 'GET',
//         headers: { "Content-Type": "application/json" }
//     });
//     const json = await data.json()
//     return json;

// }

export async function cmsHomeTest() {
    //const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/home/lables.json')
    // const res = await fetch(process.env.NEXT_PUBLIC_HOME_CONFIG + "?site_code=" + process.env.NEXT_PUBLIC_SITE_CODE + "&language=us_en" ,
    // {
    //     method: 'GET',
    //             headers: { "Content-Type": "application/json" },
    //              mode:'cors',
    //              'Access-Control-Allow-Origin':"*"
    // })
    // const json = await res.json()
    // return json;
 //}

 const res = await fetch(process.env.NEXT_PUBLIC_HOME_CONFIG + "?site_code=" + process.env.NEXT_PUBLIC_SITE_CODE + "&language=us_en")
 const json = await res.json()
    return json;
}
// export async function cmsHomeTest() {
//     let obj = { "jsonrpc": "2.0", "id": 0, method: "get_provider", params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, language: "en" } }
//     const data = await fetch(`${process.env.NEXT_PUBLIC_PROVIDERS}`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(obj),
//     });
//     const json = await data.json()
//     return json;

// }


// export async function mycmsMenu() {
//     let obj = { "jsonrpc": "2.0", "id": 0, method: "get_provider", params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, language: "en" } }
//     const data = await fetch(`${process.env.NEXT_PUBLIC_PROVIDERS}`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(obj),
//     });
//     const json = await data.json()
//     return json;
// }


export default async function handler(req, res) {
    console.log(req , "_____________________-req")

    // Run the middleware
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    // );

  //await runMiddleware(req, res, cors)


    // const json = await cmsHomeTest();
    // if(json.message == "success"){
    //     res.send(json.result)
    //  }else{
    //      res.send({})
    //  }
   

    // const jsonDatam = await mycmsMenu()
    // res.status(200).json(jsonDatam)
}


export const config = {
    api: {
        bodyParser: true,
        externalResolver: true,
    },
}