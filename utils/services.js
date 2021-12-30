import axios from 'axios';

export default function requestGET(url, options = {}) {
   let k =  axios.get(url).then(response => {return response }).catch(err => {
        // what now?
        console.log(err);
      });

      return k;
  }
  