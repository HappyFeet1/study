<template>
  <div id="app">
    <transition :name="pageDirection">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import Header from 'mint-ui/lib/header/';
import 'mint-ui/lib/header/style.css';

import Button from 'mint-ui/lib/button/';
import 'mint-ui/lib/button/style.css';

import Toast from 'mint-ui/lib/toast/';
import 'mint-ui/lib/toast/style.css';


Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

Vue.toast = Vue.prototype.toast = Toast;


export default {
  name: 'app',
  created() {
  },
  computed: {
    ...mapState([
      'pageDirection'
    ])
  },
  mounted() {
    // console.log(this.$route)

  }
}
</script>

<style>
html,
body,
#app {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.child-view {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000;
  -webkit-perspective: 1000;
  background-color: #f2f2f2;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}
/*路由前进，退出*/
.slide-left-leave-active{
  animation: pageFromCenterToLeft 400ms forwards;
  z-index: 1;
}
/*路由后退，进入*/
.slide-right-enter-active{
  animation: pageFromLeftToCenter 400ms forwards;
  z-index: 1;
}
/*路由后退，退出*/
.slide-right-leave-active{
  animation: pageFromCenterToRight 400ms forwards;
  z-index: 10;
}
/*路由前进，进入*/
.slide-left-enter-active{
  animation: pageFromRightToCenter 400ms forwards;
  z-index: 10;
}

/*-------------------------------*/
/*路由前进，进入*/
@keyframes pageFromRightToCenter {
  from {
    transform: translate3d(100%, 0, 0);
    opacity: .9;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
/*路由前进，退出*/
@keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
  }
}
/*路由后退，进入*/
@keyframes pageFromLeftToCenter {
  from {
    opacity: .5;
    transform: translate3d(-20%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/*路由后退，退出*/
@keyframes pageFromCenterToRight {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    opacity: .9;
  }
}
</style>
