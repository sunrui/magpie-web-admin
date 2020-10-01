import {storeApi} from './storeApi'

export const cartApi = {
  _key: 'cart',
  cart: null,
  _verifyCart() {
    this.cart = storeApi.object.get(this._key)

    if (!Boolean(this.cart)) {
      this.cart = {
        select: 0,
        price: 0,
        people: null,
        perTablewarePrice: null,
        tasteNote: '',
        foods: []
      }
    }
  },
  saveCart() {
    this.cart.select = 0
    this.cart.price = 0

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      this.cart.select += cartFood.select
      this.cart.price += cartFood.food.price * cartFood.select

      for (let index2 in cartFood.garnishes) {
        let garnish = cartFood.garnishes[index2]
        this.cart.price += garnish.price * this.cart.select
      }
    }

    if (Boolean(this.cart.perTablewarePrice)) {
      this.cart.price += this.cart.people * this.cart.perTablewarePrice
    }

    this.cart.price = Math.round(parseFloat(this.cart.price) * 100) / 100

    storeApi.object.set(this._key, this.cart)
  },
  setPeople(people) {
    this._verifyCart()
    this.cart.people = people
    this.saveCart()
  },
  setPerTablewarePrice(perTablewarePrice) {
    this._verifyCart()
    this.cart.perTablewarePrice = perTablewarePrice
    this.saveCart()
  },
  setTasteNote(tasteNote) {
    this._verifyCart()
    this.cart.tasteNote = tasteNote
    this.saveCart()
  },
  countSelectByFoodCategoryIdAndFoodId(foodCategoryId, foodId) {
    this._verifyCart()

    let select = 0

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategoryId) {
        if (cartFood.food.id === foodId) {
          select += cartFood.select
        }
      }
    }

    return select
  },
  countSelectByFoodCategoryId(foodCategoryId) {
    this._verifyCart()

    let select = 0

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategoryId) {
        select += cartFood.select
      }
    }

    return select
  },
  countByFoodGroupId(foodGroupId) {
    this._verifyCart()

    let select = 0

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.foodGroupId === foodGroupId) {
        select += cartFood.select
      }
    }

    return select
  },
  removeByFoodCategoryId(foodCategoryId) {
    this._removeByFoodCategoryId(foodCategoryId, true)
  },
  _removeByFoodCategoryId(foodCategoryId, removeOk) {
    if (!removeOk) {
      return
    }

    this._verifyCart()

    removeOk = false
    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategoryId) {
        this.cart.select -= cartFood.select
        this.cart.price -= cartFood.food.price * cartFood.select

        for (let index2 in cartFood.garnishes) {
          let garnish = cartFood.garnishes[index2]
          this.cart.price -= garnish.price
        }

        this.cart.foods.splice(index, 1)

        this.saveCart()
        removeOk = true
        break
      }
    }

    this._removeByFoodCategoryId(foodCategoryId, removeOk)
  },
  increase(foodGroupId, foodCategory, food, garnishes) {
    this._verifyCart()

    let one = null

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategory.id && cartFood.food.id === food.id) {
        one = cartFood
        break
      }
    }

    if (one == null) {
      one = {
        foodGroupId: foodGroupId,
        category: foodCategory,
        food: food,
        garnishes: garnishes,
        select: 0
      }

      this.cart.foods.push(one)
    }

    one.select++
    one.garnishes = garnishes

    this.saveCart()
  },
  update(foodCategory, food, select) {
    this._verifyCart()

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategory.id && cartFood.food.id === food.id) {
        cartFood.select = select

        if (cartFood.select === 0) {
          this.cart.foods.splice(index, 1)
          break
        }
      }
    }

    this.saveCart()
  },
  decrease(foodCategory, food) {
    this._verifyCart()

    for (let index in this.cart.foods) {
      let cartFood = this.cart.foods[index]
      if (cartFood.category.id === foodCategory.id && cartFood.food.id === food.id) {
        cartFood.select--

        if (cartFood.select === 0) {
          this.cart.foods.splice(index, 1)
          break
        }
      }
    }

    this.saveCart()
  },
  getCart() {
    this._verifyCart()
    return this.cart
  },
  isEmpty() {
    this._verifyCart()

    return this.cart.foods.length === 0
  },
  clearAll() {
    this.cart = {
      select: 0,
      price: 0,
      people: null,
      perTablewarePrice: null,
      tasteNote: '',
      foods: []
    }

    this.saveCart()
  }
}
/*
export const cartStoreApiTest = function () {
  let food0 = {
    category: {
      id: 'food_category_id_0',
      name: '土豆丝'
    },
    food: {
      id: '土豆丝一盘',
      price: 10
    }
  };

  let food1 = {
    category: {
      id: 'food_category_id_0',
      name: '土豆丝'
    },
    food: {
      id: '土豆丝小份',
      price: 12
    }
  };

  let food2 = {
    category: {
      id: 'food_category_id_0',
      name: '凉拌黄瓜'
    },
    food: {
      id: '凉拌黄瓜一盘',
      price: 8
    }
  };

  cartApi.clearAll();

  cartApi.increase(food0.category, food0.food);
  cartApi.dump();

  cartApi.increase(food0.category, food0.food);
  cartApi.dump();

  cartApi.increase(food1.category, food1.food);
  cartApi.dump();

  cartApi.increase(food2.category, food2.food);
  cartApi.dump();

  cartApi.decrease(food0.category, food0.food);
  cartApi.dump();

  cartApi.decrease(food0.category, food0.food);
  cartApi.dump();

  cartApi.decrease(food1.category, food1.food);
  cartApi.dump();

  cartApi.decrease(food2.category, food2.food);
  cartApi.dump();
};
*/
