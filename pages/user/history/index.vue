<template>
  <div><p>{{ http.res.loginHistory }}</p></div>
</template>

<script>
import {httpUserApi} from '@/api/http/httpUserApi'

export default {
  data() {
    return {
      http: {
        res: {
          loginHistory: {}
        }
      }
    }
  },
  created() {
    httpUserApi.getLoginHistory(0, 1).then(res => {
      this.http.res.loginHistory = res
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>

