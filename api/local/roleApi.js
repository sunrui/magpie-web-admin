export const roleApi = {
  getRoleTypeName(type) {
    if (!Boolean(type)) {
      return '未知'
    }

    type = type.toLowerCase()

    if (type === 'admin') {
      return '店长'
    } else if (type === 'waiter') {
      return '服务员'
    } else if (type === 'cooker') {
      return '厨师'
    } else if (type === 'waiter') {
      return '服务员'
    } else if (type === 'cashier') {
      return '收银员'
    } else if (type === 'takeout') {
      return '外卖员'
    } else if (type === 'owner') {
      return '管理员'
    } else if (type === 'retailer') {
      return '点餐员'
    } else {
      return type
    }
  }
}
