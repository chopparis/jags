// /* eslint no-extend-native: 0 */
// // core-js comes with Next.js. So, you can import it like below
// import includes from 'core-js/library/fn/string/virtual/includes'
// import repeat from 'core-js/library/fn/string/virtual/repeat'
// import assign from 'core-js/library/fn/object/assign'

// // Add your polyfills
// // This files runs at the very beginning (even before React and Next.js core)
// console.log('Load your polyfills')

// String.prototype.includes = includes
// String.prototype.repeat = repeat
// Object.assign = assign
import 'core-js';

import PluralRules from 'intl-pluralrules/plural-rules'

new PluralRules('en').select(1) // 'one'
new PluralRules('en', { minimumSignificantDigits: 3 }).select(1) // 'other'
new PluralRules('en').selectRange(0, 1) // 'other'
new PluralRules('fr').selectRange(0, 1) // 'one'