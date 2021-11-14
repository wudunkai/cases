<template>
  <div class="home-dialog">
    <transition name="el-fade-in-linear">
      <div class="modal-wrapper-dialog" v-show="showVisible !== ''">
        <div class="dialog-container">
          <div class="modal-wrapper-top">
            <i class="modal-close" @click="toggleModal('')"></i>
          </div>
          <div class="modal-wrapper-left"></div>
          <div class="modal-wrapper-right">
            <!-- 注册模块begin -->
            <div
              class="register-modal modail-right-item"
              v-show="showVisible === 'register'"
            >
              <div class="modal-header__row">
                <span class="modal-title">加入未来云开发者中心</span>
                <span class="font">已有账号？</span>
                <a
                  href="javascript:void(0)"
                  id="tologin"
                  class="link"
                  @click="toggleModal('quick')"
                  >去登录</a
                >
              </div>
              <div class="modal-content">
                <form action="#" id="register-form">
                  <div class="register-block">
                    <!-- 错误信息提示 -->
                    <div class="form-tip">
                      <i
                        class="el-icon-warning-outline"
                        v-show="warnMessage"
                      ></i>
                      <span v-show="warnMessage">{{ warnMessage }}</span>
                    </div>
                    <!-- 错误信息提示 -->
                    <!-- 手机号 -->
                    <div class="form-group">
                      <div class="input-box">
                        <input
                          type="text"
                          autocomplete="off"
                          placeholder="请输入手机号"
                          name="cellphone"
                          v-model="register.cellphone"
                        />
                      </div>
                    </div>
                    <!-- 手机号 -->
                    <!-- 验证码 -->
                    <div class="form-group">
                      <div class="input-box">
                        <div
                          style="display: flex; justify-content: space-between"
                        >
                          <input
                            type="text"
                            autocomplete="off"
                            placeholder="请输入验证码"
                            name="check"
                            style="width: 240px"
                            v-model="register.code"
                          />
                          <a
                            v-if="showCode"
                            href="javascript:void(0)"
                            class="link"
                            @click="checkPhoneExist(register.cellphone)"
                            >获取验证码</a
                          >
                          <small v-else>{{ countDown }}秒重新发送</small>
                        </div>
                      </div>
                    </div>
                    <!-- 验证码 -->
                    <!-- 密码 -->
                    <div class="form-group">
                      <div class="input-box">
                        <input
                          type="password"
                          autocomplete="new-password"
                          placeholder="设置登录密码 (数字+字母，6-16位)"
                          name="password"
                          @blur="checkPassword(register.password)"
                          v-model="register.password"
                        />
                      </div>
                    </div>
                    <!-- 密码 -->
                    <!-- 重复密码 -->
                    <div class="form-group">
                      <div class="input-box">
                        <input
                          type="password"
                          autocomplete="new-password"
                          placeholder="再次输入登录密码"
                          name="pass"
                          @blur="
                            checkRepeat(
                              register.confirmPassword,
                              register.password
                            )
                          "
                          v-model="register.confirmPassword"
                        />
                      </div>
                    </div>
                    <!-- 重复密码 -->
                    <div class="check-box">
                      <!-- <el-checkbox v-model="register.isCheck"
                        ><span class="pre-text">我已阅读并接受</span>
                        <span class="highlighter-text">《未来云用户协议》</span>
                      </el-checkbox> -->
                    </div>
                    <button
                      type="button"
                      class="button register-button"
                      @click="handleRegisterForm"
                    >
                      注册
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!--  注册模块end-->

            <!-- 账号密码登录begin -->
            <div
              class="login-modal modail-right-item"
              v-show="showVisible === 'login'"
            >
              <div class="modal-header__col">
                <span class="modal-title">账号密码登录</span>
                <p class="modal-tip">使用未来云开发者中心账号或邮箱登录</p>
              </div>
              <div class="modal-content">
                <form action="#" id="login-form">
                  <div class="login-block">
                    <!-- 错误信息提示 -->
                    <div class="form-tip">
                      <i
                        class="el-icon-warning-outline"
                        v-show="warnMessage"
                      ></i>
                      <span v-show="warnMessage">{{ warnMessage }}</span>
                    </div>
                    <!-- 错误信息提示 -->
                    <!-- 手机号 -->
                    <div class="form-group">
                      <div class="input-box">
                        <p class="fontlabel">用户名/邮箱/手机号</p>
                        <input
                          type="text"
                          autocomplete="off"
                          name="tel"
                          v-model="login.account"
                          @blur="checkValue(login.account, '用户名')"
                        />
                      </div>
                    </div>
                    <!-- 手机号 -->
                    <!-- 密码 -->
                    <div class="form-group">
                      <div class="input-box">
                        <p class="fontlabel">密码</p>
                        <input
                          type="password"
                          autocomplete="new-password"
                          name="password"
                          @blur="checkValue(login.password, '密码')"
                          v-model="login.password"
                        />
                      </div>
                    </div>
                    <!-- 密码 -->
                    <div class="btn-box">
                      <a
                        href="javascript:void(0)"
                        class="forget-btn"
                        @click="toForget"
                        >忘记密码?</a
                      >
                    </div>
                    <button
                      type="button"
                      class="button register-button"
                      @click="handleLoginForm"
                    >
                      登录
                    </button>
                    <div class="toggle-btn">
                      <a
                        href="javascript:void(0)"
                        class="link-btn"
                        @click="toggleModal('quick')"
                        >手机快捷登录</a
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!--  账号密码end-->

            <!-- 快速登录模块begin -->
            <div
              class="login-modal modail-right-item"
              v-show="showVisible === 'quick'"
            >
              <div class="modal-header__col">
                <span class="modal-title">手机快捷登录</span>
                <p class="modal-tip">使用手机快捷登录，无账号将自动注册</p>
              </div>
              <div class="modal-content">
                <form action="#" id="quick-form">
                  <div class="quick-block">
                    <!-- 错误信息提示 -->
                    <div class="form-tip">
                      <i
                        class="el-icon-warning-outline"
                        v-show="warnMessage"
                      ></i>
                      <span v-show="warnMessage">{{ warnMessage }}</span>
                    </div>
                    <!-- 错误信息提示 -->
                    <!-- 手机号 -->
                    <div class="form-group">
                      <div class="input-box">
                        <p class="fontlabel">手机号</p>
                        <input
                          type="text"
                          autocomplete="off"
                          name="tel"
                          @blur="checkTel(quick.phone)"
                          v-model="quick.phone"
                        />
                      </div>
                    </div>
                    <!-- 手机号 -->
                    <!-- 密码 -->
                    <div class="form-group">
                      <div class="input-box input-cehck">
                        <p class="fontlabel">手机验证码</p>
                        <div
                          style="display: flex; justify-content: space-between"
                        >
                          <input
                            type="text"
                            autocomplete="off"
                            name="check"
                            style="width: 240px"
                            v-model="quick.code"
                          />
                          <a
                            v-if="showCode"
                            href="javascript:void(0)"
                            class="link"
                            @click="getCheckCode(quick.phone)"
                            >获取验证码</a
                          >
                          <small v-else>{{ countDown }}秒重新发送</small>
                        </div>
                      </div>
                    </div>
                    <!-- 密码 -->
                    <div class="btn-box"></div>
                    <button
                      type="button"
                      class="button register-button"
                      @click="handleQuickForm"
                    >
                      登录
                    </button>
                    <div class="toggle-btn">
                      <a
                        href="javascript:void(0)"
                        class="link-btn"
                        @click="toggleModal('login')"
                        >账号密码登录</a
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- 快速登录模块end -->

            <!-- 设置密码模块 -->
            <div
              class="login-modal modail-right-item"
              v-show="showVisible === 'password'"
            >
              <div class="modal-header__col">
                <span class="modal-title">设置登录密码</span>
                <p class="modal-tip">
                  这是您第一次登录，我们为您创建新的平台账号，完善登录密码
                </p>
              </div>
              <div class="modal-content">
                <form action="#" id="pass-form">
                  <div class="pass-block">
                    <!-- 错误信息提示 -->
                    <div class="form-tip">
                      <i
                        class="el-icon-warning-outline"
                        v-show="warnMessage"
                      ></i>
                      <span v-show="warnMessage">{{ warnMessage }}</span>
                    </div>
                    <!-- 错误信息提示 -->
                    <!-- 手机号 -->
                    <div class="form-group">
                      <div class="input-box">
                        <p class="fontlabel">
                          设置登录密码（字母+数字，最少6位）
                        </p>
                        <input
                          type="password"
                          autocomplete="off"
                          name="tel"
                          @blur="checkPassword(repeat.password)"
                          v-model="repeat.password"
                        />
                      </div>
                    </div>
                    <!-- 手机号 -->
                    <!-- 密码 -->
                    <div class="form-group">
                      <div class="input-box">
                        <p class="fontlabel">再次输入密码</p>
                        <input
                          type="password"
                          autocomplete="off"
                          name="pass"
                          v-model="repeat.confirmPassword"
                          @blur="
                            checkRepeat(repeat.confirmPassword, repeat.password)
                          "
                        />
                      </div>
                    </div>
                    <!-- 密码 -->
                    <!-- <div class="btn-box"></div> -->
                    <button
                      type="button"
                      class="button pass-button"
                      @click="handleRepeatForm"
                    >
                      立即设置
                    </button>
                    <div class="toggle-btn">
                      <a
                        href="javascript:void(0)"
                        class="link-btn"
                        @click="toggleModal('')"
                        >暂不设置， 跳过</a
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- 设置密码模块 -->
          </div>
        </div>
        <div id="captcha"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { checkPhone, checkPass } from "@/consts/check.js";
import { mapActions, mapState } from "vuex";
import { throttle } from "../../utils/tool"
import "@/utils/gt.js";
export default {
  name: "homeDialog",

  components: {},
  model: {
    event: "click",
    prop: "showVisible"
  },
  props: ["showVisible"],
  data() {
    return {
      check: true,
      warnMessage: "",
      showCode: true,
      countDown: 60,
      timer: null,
      // 注册逻辑开始
      register: {
        cellphone: "",
        code: "",
        password: "",
        confirmPassword: ""
        // isCheck: false
      },
      //登录逻辑
      login: {
        account: "",
        password: ""
      },
      // 快速登录逻辑
      quick: {
        phone: "",
        code: ""
      },
      // 重置密码流程
      repeat: {
        password: "",
        confirmPassword: ""
      }
    };
  },

  computed: {
    ...mapState("homeDialog", ["code", "msg", "setPass"]),
    ...mapState(["gt", "challenge"])
  },

  methods: {
    ...mapActions([
      "getInitCode",
      "sendUserCode",
      "getUserInfo",
      "handleCheckExist"
    ]),
    ...mapActions("homeDialog", [
      "subRegisterForm",
      "subLoginForm",
      "getCheckPassword",
      "setPassword"
    ]),
    toggleModal(val) {
      // v-model的val
      this.$emit("click", val);
      this.warnMessage = "";
    },
    //进入忘记密码页面
    toForget() {
      this.$router.push({
        path: "/forget/find"
      });
    },
    // 检测手机号
    checkTel(tel) {
      if (!this.checkValue(tel, "手机号")) {
        return false;
      }

      if (!checkPhone(tel)) {
        this.warnMessage = "手机号格式错误，请重新输入";
        return false;
      }
      this.warnMessage = "";
      return true;
    },
    //检测密码
    checkPassword(pass) {
      if (!this.checkValue(pass, "密码")) {
        return false;
      }

      if (!checkPass(pass)) {
        this.warnMessage = "密码格式错误，字母数字组合，6-16位";
        return false;
      }
      this.warnMessage = "";
      return true;
    },
    //检测重复输入的密码
    checkRepeat(repeatPass, pass) {
      if (!this.checkValue(repeatPass, "确认密码")) {
        return false;
      }
      if (repeatPass !== pass) {
        this.warnMessage = "两次输入密码不一致";
        return false;
      }
      this.warnMessage = "";
      return true;
    },
    // 检测值是否存在
    checkValue(name, warn) {
      if (!name) {
        this.warnMessage = warn + "不能为空";
        return false;
      }
      this.warnMessage = "";
      return true;
    },
    checkPhoneExist(phone) {
      if (!this.checkTel(phone)) {
        return false;
      }
      this.handleCheckExist({
        phone
      }).then(res => {
        if (res.code === "success") {
          this.getCheckCode(phone);
        }
        if (res.code === "failed") {
          this.warnMessage = "该手机号已经注册";
        }
      });
    },
    handleRegisterForm() {
      // 提交表单的注册信息
      if (!this.checkTel(this.register.cellphone)) {
        return false;
      }
      if (!this.checkValue(this.register.code, "验证码")) {
        return false;
      }
      if (!this.checkPassword(this.register.password)) {
        return false;
      }
      if (
        !this.checkRepeat(this.register.confirmPassword, this.register.password)
      ) {
        return false;
      }
      // if (!this.register.isCheck) {
      //   this.warnMessage = "请接受未来云协议";
      //   return false;
      // }
      // 校验结束，ajax发送数据
      this.warnMessage = "";
      this.subRegisterForm(this.register).then(res => {
        if (res.code === "success") {
          // 注册登录成功
          this.register = {
            cellphone: "",
            code: "",
            password: "",
            confirmPassword: ""
          };
          this.handleLoginRes();
        } else if (res.code === "failed") {
          this.showMsg(this.msg);
        }
      });
    },
    handleLoginForm() {
      // 提交表单的登录信息
      if (!this.checkValue(this.login.account, "用户名")) {
        return false;
      }
      if (!this.checkValue(this.login.password, "密码")) {
        return false;
      }

      // 表单验证通过，开发发送请求
      this.warnMessage = "";
      this.subLoginForm(this.login).then(res => {
        if (res.code === "success") {
          this.login = {
            account: "",
            password: ""
          };
          // 帐号密码登录成功
          this.handleLoginRes();
        } else if (res.code === "failed") {
          this.showMsg(this.msg);
        }
      });
    },
    handleQuickForm() {
      // 提交表单的快速登录信息
      if (!this.checkTel(this.quick.phone)) {
        return false;
      }
      if (!this.checkValue(this.quick.code, "验证码")) {
        return false;
      }
      //  通过表单校验
      this.warnMessage = "";
      // 发送数据
      this.subLoginForm(this.quick).then(res => {
        if (res.code === "success") {
          // 快速登录成功 关闭弹框放在下一个接口
          this.getUserInfo();
          localStorage.setItem("userStatus", "logined");
          //获取用户信息
          this.getCheckPassword().then(res => {
            if (res.code === "success") {
              this.toggleModal("");
              this.quick = {
                phone: "",
                code: ""
              };
            } else if (res.code === "failed") {
              this.toggleModal("password");
            }
          });
        } else if (res.code === "failed") {
          this.showMsg(this.msg);
        }
      });
    },
    handleRepeatForm() {
      //提交表单重置密码信息
      if (!this.checkPassword(this.repeat.password)) {
        return false;
      }
      if (
        !this.checkRepeat(this.repeat.confirmPassword, this.repeat.password)
      ) {
        return false;
      }
      // 校验通过
      this.warnMessage = "";
      this.setPassword(this.repeat).then(res => {
        if (res.code === "success") {
          this.toggleModal("");
          this.repeat = {
            password: "",
            confirmPassword: ""
          };
        } else if (res.code === "failed") {
          this.showMsg(this.msg);
        }
      });
    },
    // 第三方极验begin
    getCheckCode(val) {
      if (!this.checkTel(val)) {
        return false;
      }
      this.getInitCode().then(res => {
        if (res.success === 1) {
          window.initGeetest(
            {
              gt: this.gt,
              challenge: this.challenge,
              offline: 0,
              new_captcha: true,
              product: "bind",
              width: "100%"
            },
            captchaObj => {
              captchaObj.appendTo("#captcha");
              captchaObj.onReady(function() {
                captchaObj.verify();
              });
              this.handlerCheck(captchaObj, val);
            }
          );
        } else {
          this.showMsg("初始化失败");
        }
      });
    },
    handlerCheck(captchaObj, phone) {
      captchaObj.onSuccess(() => {
        let result = captchaObj.getValidate();
        if (!result) {
          return alert("请完成验证");
        }
        this.sendUserCode({
          phone,
          challenge: result.geetest_challenge,
          validate: result.geetest_validate,
          seccode: result.geetest_seccode
        }).then(res => {
          if (res.code === "success") {
            // 发送验证码成功
            this.showCode = false;
            this.downTimer();
          } else if (res.code === "failed") {
            // 发送验证码失败
            this.showMsg("发送验证失败，请重试");
          }
        });
      });
      captchaObj.onError(() => {
        this.showMsg("初始化失败");
      });
    },
    // 第三方极验end

    // 弹出错误
    showMsg: throttle(function(msg) {
      this.$message.closeAll();
      this.$message.error({
        message: msg,
        showClose: true,
        offset: "100"
      })
    },300),
    // 倒计时
    downTimer() {
      if (!this.showCode) {
        this.timer = setInterval(() => {
          if (this.countDown === 1) {
            window.clearInterval(this.timer);
            this.showCode = true;
            this.countDown = 60;
            return;
          }
          this.countDown--;
        }, 1000);
      }
    },
    // 处理登录成功
    handleLoginRes() {
      // 持久化存储状态
      localStorage.setItem("userStatus", "logined");
      this.getUserInfo().then(res => {
        if (res.code === "success") {
          this.toggleModal("");
        }
      }); // 获取用户信息
    }
  },

  watch: {
    showVisible() {
      this.warnMessage = "";
      this.countDown = 60;
      this.showCode = true;
      window.clearInterval(this.timer);
      // 清楚所有数据
      (this.register = {
        cellphone: "",
        code: "",
        password: "",
        confirmPassword: ""
        // isCheck: false
      }),
        //登录逻辑
        (this.login = {
          account: "",
          password: ""
        }),
        // 快速登录逻辑
        (this.quick = {
          phone: "",
          code: ""
        }),
        // 重置密码流程
        (this.repeat = {
          password: "",
          confirmPassword: ""
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-dialog {
  height: 0px;
  width: 100%;
  .modal-wrapper-dialog {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog-container {
      display: flex;
      position: relative;
      .modal-wrapper-top {
        .modal-close {
          background-image: url("../../assets/images/home/close.png");
          display: inline-block;
          width: 31px;
          height: 70px;
          position: absolute;
          top: -50px;
          right: 0;
          z-index: -1;
          cursor: pointer;
        }
      }
      .modal-wrapper-left {
        width: 320px;
        height: 400px;
        background: url("../../assets/images/home/futter.png") #688be8 no-repeat
          center;
        background-size: contain;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      .modal-wrapper-right {
        width: 380px;
        padding: 40px 25px 20px 25px;
        background-color: #ffffff;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;

        .link {
          color: #2f60e2;
          cursor: pointer;
        }

        .modal-header__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .modal-title {
            font-size: 18px;
            font-weight: bold;
            color: #313131;
          }

          .font {
            color: #b5b5b5;
            font-size: 12px;
            margin-right: 35px;
          }
        }

        .modal-header__col {
          .modal-tip {
            margin-top: 8px;
            font-size: 14px;
            color: #828282;
          }
          .modal-title {
            font-size: 18px;
            font-weight: bold;
            color: #313131;
          }
        }

        .modal-content {
          .form-tip {
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffab95;
          }
          .form-group {
            width: 100%;
            border-bottom: 1px solid #b8b8b8;
            line-height: 20px;
            margin-top: 30px;
            position: relative;

            &:nth-of-type(2) {
              margin-top: 0px;
            }
          }
          .input-box {
            font-size: 14px;
            line-height: 26px;

            input {
              width: 320px;
              height: 28px;
              border: none;
              color: #808080;
              font-size: 14px;
              &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px white inset !important;
              }
            }

            a {
              font-size: 12px;
              display: inline-block;
            }

            small {
              font-size: 12px;
            }

            .fontlabel {
              font-size: 14px;
              color: #808080;
              line-height: 20px;
            }
          }
          .check-box,
          .btn-box {
            margin-top: 15px;
            line-height: 20px;
          }

          .btn-box {
            display: flex;
            justify-content: flex-end;
            margin-right: 8px;
            min-height: 20px;
          }

          .forget-btn {
            color: #808080;
          }

          .toggle-btn {
            margin-top: 18px;

            .link-btn {
              font-weight: 500;
              color: rgba(47, 96, 226, 1);
            }
          }

          .pass-button {
            margin-top: 40px;
          }

          .register-button {
            letter-spacing: 18px;
          }
        }
        .button {
          width: 320px;
          height: 40px;
          background: rgba(47, 96, 226, 1);
          box-shadow: 0px 4px 6px 0px rgba(47, 96, 226, 0.7);
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          border: none;
          margin-top: 22px;
        }
      }
    }
  }
  #captcha {
    position: absolute;
  }
}
</style>
