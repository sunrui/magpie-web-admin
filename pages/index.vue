<template>
  <div>
    <ul v-show="ui.userId">
      <li><router-link to="/user/logout">/user/logout</router-link></li>
      <li><router-link to="/user/history">/user/history</router-link></li>
      <li><router-link to="/user/state">/user/state</router-link></li>
    </ul>
    <ul v-show="!ui.userId">
      <li><router-link to="/user/login">/user/login</router-link></li>
    </ul>
  </div>
</template>

<script>

import {localUserApi} from '@/api/local/localUserApi'

export default {
  data() {
    return {
      ui: {
        userId: null
      }
    }
  },
  created() {
    this.ui.userId = localUserApi.getId();
  }
}

</script>

<style scoped>
</style>

