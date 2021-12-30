import React from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import WL_MetaData from "../src/components/WL_MetaData";
import PropTypes from 'prop-types';
 import Head from 'next/head';
// import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from '../theme';
import Layout from '../src/components/Layout/'
import { wrapper } from "../redux/store";
import { ThemeProvider } from 'next-themes'
import PubSub from 'pubsub-js';

// import the library
// import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
// import { faMoneyBill } from '@fortawesome/pro-solid-svg-icons';
// import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';

// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

// import gStyles from '../styles/globals.scss'
// import SubscriptionUtility from "../utils/utility";
// export default function MyApp(props) {

  // export function reportWebVitals(metric) {
  //   if (metric.label === 'web-vital') {
  //     console.log(metric , "<---export matrucs") // The metric object ({ id, name, startTime, value, label }) is logged to the console
  //   }
  // }

const MyApp = (props) => {

  
  const { Component, pageProps } = props;

  // console.log(pageProps , "_______---pagePropspageProps")

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)

    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    PubSub.publish('showJackPots', "")
  }, [router.events])

  useEffect(() => {
    PubSub.publish('showJackPots', "")
  }, [])


  // console.log(props , "__AP>J")

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>

      <WL_MetaData
        title="Play online casino games at https://staging-wl.dragongaming.com/"
        description="Most popular casino games"
      />

      <WL_MetaData
        title="Play online casino games at https://staging-wl.dragongaming.com/"
        description="Most popular casino games"
      />

      <Head>
        <title>White label</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="images/slots/27.webp" />
      </Head>
      {/* <ThemeProvider theme={theme} enableSystem={false} forcedTheme={Component.theme || null}> */}
      <ThemeProvider enableSystem={false} >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <SubscriptionUtility /> */}
        <Layout>
       
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);