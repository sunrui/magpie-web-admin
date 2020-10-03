<template>
  <div id="register">
    <p class="title">登录</p>
    <el-form
      :model="http.req.sms"
      status-icon
      :rules="rule.sms"
      ref="refSms"
      label-width="0"
    >
      <el-form-item prop="phone">
        <el-input v-model="http.req.sms.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="smsCode" class="code">
        <el-input maxlength="6" oninput="value=value.replace(/[^\d]/g,'')" v-model="http.req.sms.smsCode" placeholder="验证码"></el-input>
        <el-button type="primary" :disabled='http.req.sms.phone.length === 0' @click="btnSmsCodeSend">{{ ui.btnSmsCodeSendText }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnLogin()" style="width:100%;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {httpSmsApi} from '@/api/http/httpSmsApi'
import {httpUserApi} from '@/api/http/httpUserApi'
import {localUserApi} from '@/api/local/localUserApi'

export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }

    let checkSmsCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }

    return {
      http: {
        req: {
          sms: {
            phone: '15068860507',
            smsCode: '123456'
          }
        },
        res: {}
      },
      ui: {
        btnSmsCodeSendText: '发送'
      },
      rule: {
        sms: {
          phone: [{validator: checkPhone, trigger: 'change'}],
          smsCode: [{validator: checkSmsCode, trigger: 'change'}]
        }
      }
    }
  },
  methods: {
    btnSmsCodeSend() {
      if (this.ui.btnSmsCodeSendText.indexOf('秒') !== -1) {
        return
      }

      this.$refs['refSms'].validate(valid => {
        if (valid) {
          httpSmsApi.postSend(this.http.req.sms.phone, 'LOGIN').then(res => {
            if (res.success) {
              let time = 60
              this.ui.btnSmsCodeSendText = '已发送'
              let timer = setInterval(() => {
                time--
                this.ui.btnSmsCodeSendText = time + ' 秒'
                if (time === 0) {
                  clearInterval(timer)
                  this.ui.btnSmsCodeSendText = '重新获取'
                }
              }, 1000)

              this.http.req.sms.smsCode = res.smsCode

              return
            }

            if (res.maxSendReached) {
              this.$message({
                type: 'warning',
                message: '超过最大发送次数!'
              })
            }
          })
        }
      })
    },
    btnLogin() {
      this.$refs['refSms'].validate(valid => {
        if (valid) {
          httpSmsApi.postVerify(this.http.req.sms.phone, this.http.req.sms.smsCode, 'LOGIN').then(res => {
            if (res.verifyOk) {
              httpUserApi.postLoginPhone(this.http.req.sms.phone, this.http.req.sms.smsCode).then(res => {
                if (res.directInvitorUserIdNotExists) {
                  this.$message({
                    type: 'warning',
                    message: '直推用户 ID 不存在!'
                  })
                } else if (res.smsCodeSendNeeded) {
                  this.$message({
                    type: 'warning',
                    message: '需要发送短信验证码!'
                  })
                } else if (res.smsCodeVerifyError) {
                  this.$message({
                    type: 'warning',
                    message: '验证码校验错误!'
                  })
                } else if (res.user) {
                  localUserApi.setId(res.user.id)
                  localUserApi.setPhone(res.user.phone)

                  this.$message({
                    type: 'warning',
                    message: '登录成功!'
                  })

                  this.$router.push('/')
                }
              })
            } else if (res.verifyError) {
              this.$message({
                type: 'warning',
                message: '短信验证码验证失败!'
              })
            } else if (res.codeNotExists) {
              this.$message({
                type: 'warning',
                message: '短信验证码不存在!'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.register-wrapper img {
  position: absolute;
  z-index: 0;
}

#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 0;
}

.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}

.el-form-item {
  text-align: center;
}

.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code button {
  margin-left: 20px;
  width: 100px;
  text-align: center;
}

.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>

