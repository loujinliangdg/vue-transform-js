<template>
  <div class="bl-button no-slectText" :class="className()" @click="clickMe">
    <label v-if="tips===''">
      <span class="bl-loading__spinner" v-show="loading">
        <i v-for="(item,index) in 12" :key="index"></i>
      </span>
    </label>
    <span>{{title}}</span>
    <span class="bl-tips" v-if="tips!==''">{{tips}}</span>
  </div>
</template>

<script>
export default {
  name: "blButton",
  props: {
    title: {
      type: String,
      default: "确定"
    },
    size: {
      type: String,
      default: "large"
    },
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: "normal"
    },
    tips: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    clickMe() {
      this.$emit("click");
    },
    className() {
      let tips = this.tips.replace(/\s+/g, "");
      if (this.disabled !== false) {
        if (tips !== "") {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " disable-button" +
            " bl-button-radius--" +
            this.radius +
            " bl-button-tips"
          );
        } else {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " disable-button" +
            " bl-button-radius--" +
            this.radius +
            " bl-button-lineH"
          );
        }
      } else {
        if (tips !== "") {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " bl-button-radius--" +
            this.radius +
            " bl-button-tips"
          );
        } else {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " bl-button-radius--" +
            this.radius +
            " bl-button-lineH"
          );
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../../assets/less/variable');
.bl-button {
  position: relative;
  display: inline-block;
  text-align: center;
  // font-size: @fontSize34;
  overflow: hidden;
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}
.no-slectText {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.bl-button-lineH {
  line-height: 100px;
  height: 100px;
}

.bl-tips {
  display: block;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.6;
}
.disable-button {
  &:active {
    opacity: 1;
  }
}
//按钮类型样式
.bl-button--default {
  border: 2px solid @defaultColor;
  color: @defaultColor;
  &:active {
    opacity: 0.3;
  }
  &.disable-button {
    box-shadow: none;
    border: 2px solid rgba(51, 51, 51, 0.1);
    color: rgba(0, 0, 0, 0.3);
    &:active {
      opacity: 1;
    }
  }
}
.bl-button--primary {
  color: #fff;
  background-color: @defaultColor;
  &:active {
    background-color: #00a96e;
    color: rgba(255, 255, 255, 0.3);
  }
}
.bl-button--primary {
  color: #fff;
  background-color: @defaultColor;
  &:active {
    background-color: #00a96e;
    color: rgba(255, 255, 255, 0.3);
  }
  &.disable-button {
    background: rgba(0, 203, 132, 0.6);
    color: #fff;
  }
}
//按钮弧度
.bl-button-radius--large {
  border-radius: 50px;
}
.bl-button-radius--middle {
  border-radius: 45px;
}
.bl-button-radius--small {
  border-radius: 28px;
}
//按钮大小
.bl-button-XXlarge {
  width: 100%;
}
.bl-button-Xlarge {
  padding: 0 150px;
}
.bl-button-large {
  padding: 0 100px;
}
.bl-button-normal {
  padding: 0 45px;
}
.bl-button-small {
  height: 56px;
  line-height: 58px;
  font-size: @fontSize24;
  padding: 0 24px;
  & > .bl-loading__spinner {
    margin-top: -5px;
    height: 30px;
    width: 30px;
  }
  & > .bl-tips {
    display: none;
  }
}
//按钮大小end
.bl-button-tips {
  padding: 15px 100px;
}
.bl-loading__spinner {
  position: relative;
  display: inline-block;
  width: 40px;
  max-width: 100%;
  height: 40px;
  max-height: 100%;
  vertical-align: middle;
  -webkit-animation: bl-rotate 0.8s linear infinite;
  animation: bl-rotate 0.8s linear infinite;
  animation-timing-function: steps(12);
  margin-top: -10px;
}
@-webkit-keyframes bl-rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes bl-rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.bl-loading__spinner i {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bl-loading__spinner i::before {
  display: block;
  width: 2px;
  height: 25%;
  margin: 0 auto;
  background-color: currentColor;
  border-radius: 40%;
  content: " ";
}
.bl-loading__spinner i:nth-of-type(1) {
  transform: rotate(30deg);
  opacity: 1;
}
.bl-loading__spinner i:nth-of-type(2) {
  transform: rotate(60deg);
  opacity: 0.9375;
}
.bl-loading__spinner i:nth-of-type(3) {
  transform: rotate(90deg);
  opacity: 0.875;
}
.bl-loading__spinner i:nth-of-type(4) {
  transform: rotate(120deg);
  opacity: 0.8125;
}
.bl-loading__spinner i:nth-of-type(5) {
  transform: rotate(150deg);
  opacity: 0.75;
}
.bl-loading__spinner i:nth-of-type(6) {
  transform: rotate(180deg);
  opacity: 0.6875;
}
.bl-loading__spinner i:nth-of-type(7) {
  transform: rotate(210deg);
  opacity: 0.625;
}
.bl-loading__spinner i:nth-of-type(8) {
  transform: rotate(240deg);
  opacity: 0.5625;
}
.bl-loading__spinner i:nth-of-type(9) {
  transform: rotate(270deg);
  opacity: 0.5;
}
.bl-loading__spinner i:nth-of-type(10) {
  transform: rotate(300deg);
  opacity: 0.4375;
}
.bl-loading__spinner i:nth-of-type(11) {
  transform: rotate(330deg);
  opacity: 0.375;
}
.bl-loading__spinner i:nth-of-type(12) {
  transform: rotate(360deg);
  opacity: 0.3125;
}
</style>