// // next.config.js
// module.exports = {
//     i18n: {
//       locales: ['fr', 'fr', 'nl-NL'],
//       defaultLocale: 'fr',
//     },
//   }

// module.exports = {
//     pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
//   }
const nextTranslate = require('next-translate')
const withReactSvg = require('next-react-svg')
const path = require('path')
// const withPlugins = require('next-compose-plugins');
// const withPolyfill = require('next-with-polyfill');



module.exports = {
  optimizeFonts: true,
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'nl-NL'],
    defaultLocale: 'en',
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  images: {
    loader: 'imgix',
    // path: 'http://localhost:3000',
    // path:'https://staging-wl.dragongaming.com'
    //  path:'https://staging-cms-wl.dragongaming.com',
    path: 'https://staging-vcore.vegassoftware.com',
    // path:'https://picsum.photos'
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: 'https://stackoverflow.com/posts/66662033',
  //       permanent: false,
  //       basePath: false
  //     },
  //   ]
  // },
  //   env: {
  //     MONGO_URI: "mongodb+srv://choppari:choppari@123@cluster0.ndl6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  // },

  webpack(config) {
    const originalEntry = config.entry

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack"]
    // });




    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/polyfills.js')
      }

      return entries
    }

    return config;


  },

  ...nextTranslate()
}


  // module.exports = withReactSvg({
  //   include: path.resolve(__dirname, 'src/components/Header'),
  //   webpack(config, options) {
  //     return config
  //   }
  // })