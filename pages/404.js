// import MainContainer from '../src/components/MainContainer/';
// import exception from '../styles/Exception.module.scss';
import Link from 'next/link';

const Custom404 =() =>{
  return (
    <div>
      {/* <MainContainer>
        <div className={exception.wraper_404}>
          <div className={exception.oops}>OOPS !</div>
          <div className={exception.errorMsg} > <span>Unfortunately, we can't find the page you were looking for.</span></div>
          <div className={exception.payBtn_wraper}>
            <div className={exception.payBtn}>

              <Link
                href={"/"} >
                <span>Instant Play</span>
              </Link>

            </div>
            <div className={exception.payBtn}>
              <Link
                href={"/"} >
                <span>Promotions</span>
              </Link>
            </div>
            <div className={exception.payBtn}>
              <Link
                href={"/"} >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

        </div>

      </MainContainer> */}
      <h1>PAGE NOT FOUND</h1>
    </div>
  )

}

export const getStaticProps = async (context) => {
  return {
    props: {},
  }
}

export default Custom404;

//   import MainContainer from '../src/components/MainContainer/';
// import CarouselWidget from '../src/components/CarouselWidget/';
// import { getRegistrationInfo } from './api/userValidations/getRegistrationInfo';

// export default function Custom404(result) {

//     return (<div>
//         <MainContainer>
//           <CarouselWidget />
//           <h2>Page Not Found</h2>
//         </MainContainer>
//     </div>)
//   }

