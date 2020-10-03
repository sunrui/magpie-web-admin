<template>
</template>

<script>

import {httpUserApi} from '@/api/http/httpUserApi'
import {localUserApi} from '@/api/local/localUserApi'

export default {
  mounted() {
    httpUserApi.postLogout().then(res => {
      localUserApi.clearAll()
      this.$router.push('/user/login')
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>
