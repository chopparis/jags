import { useState, useEffect } from 'react';
import Header from '../Header/';
import Footer from '../Footer/';
import { useRouter } from "next/router";
const Layout = ({ children }) => {

    const [isLayout, setLayOut] = useState(true);

    const router = useRouter();
    useEffect(() => {
        //let defualtOpenWindow = router.query.id ? router.query.id : "";
       // console.log(router.pathname.includes("igw") , "_-<<<<<<<<<<<<defualtOpenWindow")
       if(router.pathname.includes("igw")){
        setLayOut(true);
       }
      
    }, [router.query]);

    return (
        <div>

            {/* { router.pathname.includes("igw") ||  router.pathname.includes("blocked") ?  */}
           
           {/* <div><Header/> <div>{children}</div> <Footer/> </div> */}

             <div><Header/> <div>{children}</div> <Footer/> </div>
           

            {/* : <div><Header/> <div>{children}</div><Footer/> </div>} */}

          
        </div>
    )
}
export default Layout;