<template>
  <div class="mint-spinner-triple-bounce">
    <div class="mint-spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
  </div>
</template>

<script>
import common from './common.vue';

export default {
  name: 'triple-bounce',

  mixins: [common],

  computed: {
    spinnerSize() {
      return ((this.size || this.$parent.size || 28) / 3) + 'px';
    },

    bounceStyle() {
      return {
        width: this.spinnerSize,
        height: this.spinnerSize,
        backgroundColor: this.spinnerColor
      };
    }
  }
};
</script>

<style lang="css">
.mint-spinner-triple-bounce {}

.mint-spinner-triple-bounce-bounce1,
.mint-spinner-triple-bounce-bounce2,
.mint-spinner-triple-bounce-bounce3 {
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
  animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
}

.mint-spinner-triple-bounce-bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.mint-spinner-triple-bounce-bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes mint-spinner-triple-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

@keyframes mint-spinner-triple-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
