function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Before loading JS components
;

(function (BUNN) {
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
    xxl: '1920px' // Create a similar object without the 'px' strings

  };
  BUNN.screens = {};

  for (var _i = 0, _Object$entries = Object.entries(BUNN.screensPx); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    BUNN.screens[key] = parseInt(value);
  } // Enquire breakpoints


  BUNN.enquire = {
    xs: 'screen and (min-width: ' + BUNN.screensPx.xs + ' )',
    sm: 'screen and (min-width: ' + BUNN.screensPx.sm + ' )',
    'sm-md': 'screen and (min-width: ' + BUNN.screensPx['sm-md'] + ' )',
    md: 'screen and (min-width: ' + BUNN.screensPx.md + ' )',
    'md-lg': 'screen and (min-width: ' + BUNN.screensPx['md-lg'] + ' )',
    lg: 'screen and (min-width: ' + BUNN.screensPx.lg + ' )',
    'lg-xl': 'screen and (min-width: ' + BUNN.screensPx['lg-xl'] + ' )',
    xl: 'screen and (min-width: ' + BUNN.screensPx.xl + ' )',
    'xl-xxl': 'screen and (min-width: ' + BUNN.screensPx['xl-xxl'] + ' )',
    xxl: 'screen and (min-width: ' + BUNN.screensPx.xxl + ' )'
  };
})(window.BUNN = window.BUNN || {});