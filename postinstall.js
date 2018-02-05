const ncp = require('ncp')

ncp.limit = 16

const configSrc = '../../node_modules/hexo-theme-sb'
const configDest = '../../themes/hexo-theme-sb/'

const configOptions = {
  clober: false
}

ncp(configSrc, configDest, configOptions, (err) => {
  if (err) {
    return false
  }

  return true
})
