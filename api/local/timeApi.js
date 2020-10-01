export const timeApi = {
  isToday(date) {
    let td = new Date()
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
    let od = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    let xc = (od - td) / 1000 / 60 / 60 / 24
    return xc === 0
  },

  getWeekDesc(date) {
    let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weekdays[date.getDay()]
  },
  getWeekDesc2(date) {
    let td = new Date()
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
    let od = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    let xc = (od - td) / 1000 / 60 / 60 / 24
    if (xc < -2) {
    } else if (xc < -1) {
      return '前天'
    } else if (xc < 0) {
      return '昨天'
    } else if (xc === 0) {
      return '今天'
    } else if (xc < 2) {
      return '明天'
    } else if (xc < 3) {
      return '后天'
    } else {
    }

    return this.getWeekDesc(date)
  },
  elapsedTime(time) {
    let seconds = parseInt(time) / 1000
    let day = parseInt(seconds / 60 / 60 / 24)
    let hour = parseInt(seconds / 60 / 60 % 24)
    let minute = parseInt(seconds / 60 % 60)
    let second = parseInt(seconds % 60)

    if (day > 0) {
      return `${day}天`
    }

    if (hour > 0) {
      return `${hour}小时`
    }

    if (minute > 0) {
      return `${minute}分钟`
    }

    return `${second}秒`
  },
  elapsedTimeDetail(time) {
    let seconds = parseInt(time) / 1000
    let day = parseInt(seconds / 60 / 60 / 24)
    let hour = parseInt(seconds / 60 / 60 % 24)
    let minute = parseInt(seconds / 60 % 60)
    let second = parseInt(seconds % 60)

    if (day > 0) {
      return `${day}天${hour}小时${minute}分钟`
    }

    if (hour > 0) {
      return `${hour}小时${minute}分钟`
    }

    if (minute > 0) {
      return `${minute}分钟`
    }

    return `${second}秒`
  },
  dateFormat(date, fmt) {
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }

    if (!fmt) {
      fmt = 'yyyy/MM/dd HH:mm:ss'
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }

    return fmt
  }
}
