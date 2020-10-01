export const foodDetailApi = {
  detail(order) {
    let detail = ''
    let count = this.countFood(order)

    if (!order.orderFoods || order.orderFoods.length === 0) {
      return ''
    }

    if (count > 3) {
      let showCount = 0
      for (let index in order.orderFoods) {
        let orderFood = order.orderFoods[index]

        detail += orderFood.foodCategoryName

        if (++showCount === 3 || parseInt(index) + 1 === order.orderFoods.length) {
          break
        } else {
          detail += ', '
        }
      }

      detail += `等 ${count} 份`
    } else {
      for (let index in order.orderFoods) {
        let orderFood = order.orderFoods[index]

        detail += orderFood.foodCategoryName

        if (parseInt(index) + 1 === order.orderFoods.length) {
          break
        } else {
          detail += ', '
        }
      }
    }

    return detail
  },
  countFood(order) {
    let count = 0

    for (let index in order.orderFoods) {
      let orderFood = order.orderFoods[index]
      count += orderFood.count
    }

    return count
  },
  countWaitFood(order) {
    let count = 0

    if (!order.orderFoods || order.orderFoods.length === 0) {
      return count
    }

    for (let index in order.orderFoods) {
      let orderFood = order.orderFoods[index]

      if (orderFood.status !== 'Finish') {
        count += orderFood.count
      }
    }

    return count
  }
}
