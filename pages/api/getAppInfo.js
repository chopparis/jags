const fetch = require('node-fetch');

// import cacheData from "memory-cache";

// export async function getGamesList(url="abc", options) {
//     const value = cacheData.get(url);
//     console.log(value , "_____CACHE__")
//     if (value) {
//         return value;
//     } else {
//         const hours = 24;
//        // const res = await fetch(url, options);
//        // const data = await res.json();
//        const res = await fetch(`${process.env.NEXT_PUBLIC_GAMES_LIST_PATH}`)
//        const data = await res.json()
//         cacheData.put(url, data, 120000);
//         return data;
//     }
// }

// export async function getGamesList() {
//     //const res = await fetch('http://localhost:3000/appConfig/getMenu.json');
//    // const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/getMenu.json')
//    const res = await fetch(`${process.env.NEXT_PUBLIC_GAMES_LIST_PATH}`)
//    // const res = await fetch('http://localhost:3000/appConfig/countriesList.json');
//     const json = await res.json()
//     return json;
//  }

//  export async function getHomeLables() {
//     //const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/home/lables.json')
//     const res = await fetch(`${process.env.NEXT_PUBLIC_LABLES_PATH}`)
//     const json = await res.json()
//     return json;
//  }

 export async function getMenuList() {
   //const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/home/lables.json')
   const res = await fetch(`${process.env.NEXT_PUBLIC_MENU_PATH}`)
   const json = await res.json()
   return json;
}

// export async function getDynamicMenuList() {
//    //const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/home/lables.json')
//    const res = await fetch(`${process.env.NEXT_PUBLIC_DYNAMIC_MENU_PATH}`)
//    const json = await res.json()
//    return json;
// }


// export async function getDynamicMenuList(obj) {
//     console.log(obj , "<<<<<<<<<<<____ONBJ lng");

//    let url = process.env.NEXT_PUBLIC_HOME_CONFIG + "?site_code=" + "DGTESTSITE" + "&language=" + "us_en";
//    const data = await fetch(url,{ 
//       // const data = await fetch('https://reqres.in/api/users',{ 
//           method: 'GET', 
//           headers: {
//                   "access-control-allow-origin" : "*",
//                   "Content-type": "application/json; charset=UTF-8",
//                   "Content-Type": "application/json"
//                 }
//       });
//        const json = await data.json();
//           // console.log(json , "___________>>json>>>>>")
//      //  res.send(json)

// if(json.message == "success"){
//  res.send(json.result)
// }else{
//   res.send({})
// }

//  }

 
export async function getAppInfo() {
   //const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}`+'/appConfig/home/lables.json')
   const res = await fetch(`${process.env.NEXT_PUBLIC_APPCONFIG_PATH}`)
   const json = await res.json()
   return json;
}


  
// export const config = {
//    api: {
//      bodyParser: true,
//      externalResolver: true,
//    },
//  }