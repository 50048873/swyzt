import $ from 'jquery'
import {baseUrl, success} from './config'
import {handleError} from './util'

export function get1 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/1.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get2 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/2.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get3 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/3.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get4 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/4.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get5 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/5.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get6 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/6.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get7 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/7.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear2(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get8 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/8.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear2(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function get9 (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/manage/9.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.list.length) {
      return getDataByYear2(res.data, params)
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

export function getCompany (params) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/static/data/company.json',
    data: params
  }).then((res) => {
    if (res.status === success && res.data.length) {
      return res.data
    } else {
      handleError('无数据')
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    handleError('服务器错误')
  })
};

function getDataByYear (data, params) {
  let res = {},
    list = data.list,
    len = list.length,
    i = len - 1,
    start = 0
  while (i >= 0) {
    if (list[i].curDate.indexOf(params.curDate) > -1) {
      break
    }
    i--
  }
  if (i === -1) {
    res.list = []
  } else {
    start = i - 11 > 0 ? i - 11 : 0
    res.list = list.slice(start, i + 1)
  }
  return res
}

function getDataByYear2 (data, params) {
  if (data.curDate.indexOf(params.curDate) > -1) {
    return data
  }
  return {
    list: []
  }
}
