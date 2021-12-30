import React from 'react';

import StatusMsgF from "./StatusMsgF"

const StatusMsg = (props)=>{
    return(  <div>
        <StatusMsgF {...props}/>
    </div>)
  
}


export default React.memo(StatusMsg);