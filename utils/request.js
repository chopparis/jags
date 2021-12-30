import "node-fetch";
//import { toast } from "react-toastify";

// let controller;
// let signal;
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

//  CODE = 5001
//  MESSAGE = 'User Already Registered.'


//  CODE = 5002
//  MESSAGE = 'InvalidUsername.'


//  CODE = 5003
//  MESSAGE = "Invalid Password"


//  CODE = 5004
//  MESSAGE = "InvalidEmail"


//  CODE = 5005
//  MESSAGE = "Credentials Incorrect"


//  CODE = 5006
//  MESSAGE = "Invalid Verfication Code"


//  CODE = 5007
//  MESSAGE = "Code Given expired."


//  CODE = 5008
//  MESSAGE = "Code Given expired."


//  CODE = 5009
//  MESSAGE = "None details received."


//  CODE = 5010
//  MESSAGE = "Verfication code already used"


//  CODE = 5000
//  MESSAGE = "Invalid Session."


//  CODE = 6001
//  MESSAGE = 'Insufficient Balance.'

//  CODE = 6002
//  MESSAGE = 'Insufficient Bonus Balance.'


//  CODE = 6003
//  MESSAGE = 'Invalid Transaction Type'


//  CODE = 6004
//  MESSAGE = 'Invalid Sub Transaction Type'

//  CODE = 6005
//  MESSAGE = 'Bonus is Not configured for this game'


//  CODE = 6006
//  MESSAGE = 'Bonus is not active'


//  CODE = 6007
//  MESSAGE = 'Free Spins Balance id not provided'



//  CODE = 6008
//  MESSAGE = 'Insufficient Data to fetch transaction'


//  CODE = 6009
//  MESSAGE = 'Debit Transaction not found.'


//  CODE = 6010
//  MESSAGE = 'Search Balance is not in player balances.'

//  CODE = 6011
//  MESSAGE = 'Transaction not found.'


//  CODE = 6012
//  MESSAGE = 'Not a Manual Bonus.'

//  CODE = 6013
//  MESSAGE = 'Invalid Wager Multiplier provided.'

//  CODE = 6014
//  MESSAGE = 'Invalid Amount.'


//  CODE = 6015
//  MESSAGE = 'Invalid Amount Range'

function parseJSON(response) {
  if(response.status == 500){
    return response;
  }else{
    return response.json();
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) ||response.status == 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  //toast.error(response.statusText);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options={}) {
  // console.log('ENv From RequestJS : ', process.env.URL);
  // let _options ={};
  //   _options ={
  //     ...options,
  //     credentials : "same-origin"
  //   };
 // return fetch(process.env.URL, _options)
 return fetch(url,
 {
     method: 'POST',
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(options)
 })
    .then(checkStatus)
    .then(parseJSON);
}

// function processReportsResponse(response){
//   // console.log({PRR:response});
//   if(response.status==200){
//     return response.json();
//   }
//   else{
//     let responseMessagePromise = response.json();
//     responseMessagePromise.then(
//       (responseJSON)=>{
//         let errorMessage = "Error code: "+response.status+" : "+response.statusText+" : "+responseJSON.detailedMessage;
//        // toast.error(errorMessage);
//        console.log("+++++++ERROR MESSAGE FROM SERVICE+++++" , errorMessage )
//       }
//     );
//     return({response:"NETWORK_ERROR"});
//   }
// }

// function catchReportsResponse(response){
//   // console.log({CRR:response});
//   let errorMessage = "Error : "+response.message;
//   //toast.error(errorMessage);
//   console.log("+++++++ERROR MESSAGE FROM SERVICE+++++" , errorMessage )
//   if(response.code && response.code==20){
//     return({response:"CANCEL_ERROR"});
//   }
//   else{
//     return({response:"NETWORK_ERROR"});
//   }
// }

// export function reportsRequest(url, options={}) {

//   controller = new AbortController();
//   signal = controller.signal;

//   let _options ={};

//   _options ={
//     ...options,
//     signal: signal,
//     credentials : "same-origin"
//   };

//   var promise = fetch(url, _options)
//   .then(processReportsResponse)
//   .catch(catchReportsResponse);

//   return promise;
// }

// export function cancelReportsRequest(){
//   controller.abort();
// }