export let toString = Object.prototype.toString

export function isArray (arr) {
  return toString.call(arr) === '[object Array]'
}

export function isString (str) {
  return toString.call(str) === '[object String]'
}

export function handleChartClick (obj) {
  this.$alert(`<div><p>${obj.category}</p><p>${obj.y}</p></div>`, '标题', {
    dangerouslyUseHTMLString: true
  }).then((res) => {
    console.log(res)
  }).catch((res) => {
    console.log(res)
  })
}

export function handleError (err) {
  console.log(err)
}

export function getMax (arr) {
  if (!arr.length) {
    return 0
  }
  let _arr = []
  arr.forEach((item) => {
    _arr.push(parseFloat(item.y))
  })
  return Math.max.apply(Math, _arr)
}

export function getCurrentValue (arr, key) {
  if (!arr.length) {
    return '--'
  }
  let val = arr[arr.length - 1][key]
  if (val && val.toString().indexOf('%') > -1) {
    val = val || '--'
  } else {
    val = val ? parseFloat(val).toFixed(2) : '--'
  }
  return val
}

export function throttle (fn, context, time) {
  clearTimeout(fn.tId)
  fn.tId = setTimeout(function () {
    fn.call(context)
  }, time || 200)
}

export function getTabData () {
  return [
    {
      title: '2017'
    },
    {
      title: '2016'
    }
  ]
}

export function _getStaticPath (url) {
  return url
}
