import React from 'react';
import Head from 'next/head'


const WL_MetaData = ({title,description}) => {
  return (
    <Head>
    <title>{title ? title : "My page title"}</title>
    <meta charSet="utf-8" />

    <meta name="description" content={description ? description : "SEO friendly site"} />
    
    <meta name="author" content="Gerado Valencia"/>

    <meta property="og:title" content={title ? title : "My page title"} key="ogtitle"/>
    {/* <meta property="og:url" content={currentURL} key="ogurl" /> */}
    <meta property="og:type" content="website" key="ogtype"/>
    {/* <meta property="og:image" content={previewImage} key="ogimage" />
    <meta property="og:site_name" content={siteName} key="ogsitename" /> */}
    <meta property="og:description" content={description ? description : "SEO friendly site"} key="ogdesc"/>

    <meta property="twitter:title" content={title ? title : "My page title"} key="twtitle"/>
    <meta property="twitter:type" content="website" key="twtype"/>
    <meta property="twitter:description" content={description ? description : "SEO friendly site"}  key="twdesc"/>
    <meta name="twitter:card" content="summary" key="twcard" />
{/* <meta name="twitter:creator" content={twitterHandle} key="twhandle" /> */}


<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="images/slots/27.webp" />


    {/* Twitter */}
{/* <meta name="twitter:card" content="summary" key="twcard" />
<meta name="twitter:creator" content={twitterHandle} key="twhandle" /> */}

{/* Open Graph */}
{/* <meta property="og:url" content={currentURL} key="ogurl" />
<meta property="og:image" content={previewImage} key="ogimage" />
<meta property="og:site_name" content={siteName} key="ogsitename" />
<meta property="og:title" content={pageTitle} key="ogtitle" />
<meta property="og:description" content={description} key="ogdesc" /> */}


  </Head>
  );
}

export default WL_MetaData;