<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">登录</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input maxlength="6" oninput="value=value.replace(/[^\d]/g,'')" v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
            <el-button type="primary" :disabled='ruleForm2.tel.length === 0' @click="sendCode">{{ buttonText }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {httpSmsApi} from '@/api/http/httpSmsApi'

export default {
  name: 'Register',
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      http: {
        req: {
          login: {
            phone: '15068860507',
            smsCode: '123456'
          }
        },
        res: {

        }
      },
      ui: {},
      rule: {
        tel: [{validator: checkTel, trigger: 'change'}],
        smsCode: [{validator: checkSmscode, trigger: 'change'}]
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        tel: '15068860507',
        smscode: '123456'
      },
      rules1: {
        tel: [{validator: checkTel, trigger: 'change'}]
      },
      rules2: {
        pass: [{validator: validatePass, trigger: 'change'}],
        checkPass: [{validator: validatePass2, trigger: 'change'}],
        tel: [{validator: checkTel, trigger: 'change'}],
        smscode: [{validator: checkSmscode, trigger: 'change'}]
      },
      buttonText: '发送',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    // <!--发送验证码-->
    sendCode() {
      if (this.buttonText.indexOf('秒') !== -1) {
        return
      }

      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false
          let timer = setInterval(() => {
            time--
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer)
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true
            }
          }, 1000)
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          httpSmsApi.postSend('15068860507', 'LOGIN').then(res => {
          })

          // setTimeout(() => {
          //   alert('注册成功')
          // }, 400)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    // 验证手机号
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

