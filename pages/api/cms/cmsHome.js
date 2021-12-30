//var parse = require('url-parse')
// const { parse } = require('url')
//const parsedUrl = parse("http://192.168.6.23/api/player/login", true)

export default async function cmsHome(req,res) {
    // const data = await fetch("https://staging-cms-wl.dragongaming.com/cms/api/gamecategories?site_code=DGTESTSITE2",{
    //     method: "GET",
    //     headers: {
    //       "access-control-allow-origin" : "*",
    //       "Content-type": "application/json; charset=UTF-8",
    //       "Content-Type": "application/json"
    //     }})

    let {site_code , language} = {...req.body.params};
    // console.log(site_code , "_________site_code__>>json>>>>>" , req.body.params)
let url = process.env.NEXT_PUBLIC_HOME_CONFIG + "?site_code=" + site_code + "&language=" + language;
        const data = await fetch(url,{ 
            // const data = await fetch('https://reqres.in/api/users',{ 
                method: 'GET', 
                headers: {"Content-Type": "application/json"}
            });
             const json = await data.json();
                 console.log(json , "___________>>json>>>>>")
           //  res.send(json)

    if(json.message == "success"){
       res.send(json.result)
    }else{
        res.send({})
    }

  }




  
  export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
  }