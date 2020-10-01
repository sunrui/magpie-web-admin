<template>
  <div>
    <div class="register-wrapper">
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
    </div>
  </div>
</template>

<script>
import {httpSmsApi} from '@/api/http/httpSmsApi'

export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
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

      if (this.checkMobile(this.http.req.sms.phone)) {
        httpSmsApi.postSend('15068860507', 'LOGIN').then(res => {
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

            return
          }

          if (res.maxSendReached) {
            this.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }

        })
      } else {
        alert('error')
      }
    },
    btnLogin() {
      this.$refs['refSms'].validate(valid => {
        if (valid) {
          this.$confirm('此操作将任务状态改为删除状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定的操作(调用接口)
          }).catch(() => {
            //几点取消的提示
          })
        }
      })
    },
    checkMobile(str) {
      let re = /^1\d{10}$/
      return re.test(str)
    }
  }
}
</script>

<style scoped>
.register-wrapper img {
  position: absolute;
  z-index: 1;
}

.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
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

