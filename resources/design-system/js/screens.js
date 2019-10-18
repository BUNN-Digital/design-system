// Before loading JS components
;(function (BUNN) {
  // Copied from Tailwind config
  BUNN.screensPx = {
    xs: '320px',
    sm: '480px',
    'sm-md': '620px',
    md: '768px',
    'md-lg': '980px',
    lg: '1200px',
    'lg-xl': '1440px',
    xl: '1560px',
    'xl-xxl': '1680px',
    xxl: '1920px'
  }

  // Create a similar object without the 'px' strings
  BUNN.screens = {}

  for (const [key, value] of Object.entries(BUNN.screensPx)) {
    BUNN.screens[key] = parseInt(value)
  }

  // Enquire breakpoints
  BUNN.enquire = {
    xs: 'screen and (min-width: ' + BUNN.screensPx.xs + ')',
    sm: 'screen and (min-width: ' + BUNN.screensPx.sm + ')',
    'sm-md': 'screen and (min-width: ' + BUNN.screensPx['sm-md'] + ')',
    md: 'screen and (min-width: ' + BUNN.screensPx.md + ')',
    'md-lg': 'screen and (min-width: ' + BUNN.screensPx['md-lg'] + ')',
    lg: 'screen and (min-width: ' + BUNN.screensPx.lg + ')',
    'lg-xl': 'screen and (min-width: ' + BUNN.screensPx['lg-xl'] + ')',
    xl: 'screen and (min-width: ' + BUNN.screensPx.xl + ')',
    'xl-xxl': 'screen and (min-width: ' + BUNN.screensPx['xl-xxl'] + ')',
    xxl: 'screen and (min-width: ' + BUNN.screensPx.xxl + ')'
  }
})(window.BUNN = window.BUNN || {})
