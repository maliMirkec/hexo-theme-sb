const pathExists = require('path-exists')
const ncp = require('ncp')

ncp.limit = 16

const configCheck1 = '../../themes/hexo-theme-sb'
const configSrc = '../../node_modules/hexo-theme-sb'
const configDest = '../../themes/'

pathExists(configCheck1).then((exists1) => {
  if (!exists1) {
    ncp(configSrc, configDest, (err) => {
      if (err) {
        return false
      }

      return true
    })
  }

  return false
})
