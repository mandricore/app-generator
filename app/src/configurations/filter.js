function matches (choice, match) {
  if (choice === true) return true
  if (Array.isArray(choice)) {
    if (choice.includes(match)) return true
  }
  if (typeof choice === 'object') {
    if (choice[match]) return true
  }
  return false
}

import filters from './filters'

function filter (key, choices) {
  return filters[key].reduce((obj, matcher) => {
    let matchKeys = Object.keys(matcher)
    for (let mk of matchKeys) {
      if (matches(choices[key], mk)) {
        obj[key] = matcher[mk]
      }
      return obj
    }
  }, {})
}

export default {
  // TODO: generate based on declarative filters
  filtered: (choices) => {
    let keys = Object.keys(filters)
    // test, ...
    return keys.map((key) => {
      return filters[key] ? filter(key, choices) : choices
    })
  }
}
