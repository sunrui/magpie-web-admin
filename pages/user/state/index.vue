<template>
  <p>{{ http.res.userState }}</p>
</template>

<script>
import {httpUserApi} from '@/api/http/httpUserApi'

export default {
  data() {
    return {
      http: {
        res: {
          userState: {}
        }
      }
    }
  },
  created() {
    httpUserApi.getState().then(res => {
      this.http.res.userState = res
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>

