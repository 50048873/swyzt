import $ from 'jquery'

export let toString = Object.prototype.toString

export function isArray(arr) {
  return toString.call(arr) === "[object Array]"
}

export function isString(str) {
  return toString.call(str) === "[object String]"
}

export function handleChartClick(obj) {
	this.$alert(`<div><span>${obj.category}</span><span>${obj.y}</span></div>`, 'HTML 片段', {
      dangerouslyUseHTMLString: true
    }).then((res) => {
      console.log(res)
    }).catch((res) => {
      console.log(res)
    });
    /*layer.open({
        title: '标题',
        type: 1,
        anim: 0,
        area: ['500px', '300px'],
        shadeClose: true, 
        content: `<div><span>${this.category}</span><span>${this.y}</span></div>`
    });*/
}

export function handleError(err) {
    console.log(err)
}

export function getMax(arr) {
  if (!arr.length) {
    return 0
  }
  let _arr = []
  arr.forEach((item) => {
    _arr.push(parseFloat(item.y))
  })
  return Math.max.apply(Math, _arr)
}

export function getCurrentValue(arr, key) {
  if (!arr.length) {
    return '--'
  }
  let val = arr[arr.length - 1][key]
  if (val && val.toString().indexOf('%') > -1) {
    val = val ? val : '--'
  } else {
    val = val ? parseFloat(val).toFixed(2) : '--'
  }
  return val
}

export function throttle(fn, context, time) {
    clearTimeout(fn.tId)
    fn.tId = setTimeout(function() {
        fn.call(context)
    }, time || 200)
}

export function getTabData() {
  return [
      {
        title: '2017'
      },
      {
        title: '2016'
      }
  ]
}