<template>
  <div id="app">
    <transition :name="pageDirection">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'app',
  created() {
  },
  computed: {
    ...mapState([
      'pageDirection'
    ])
  },
  mounted () {
    console.log(this.$router)
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.child-view {
  transition: all .3s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}

.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: .5;
  -webkit-transform: translate3d(-20%, 0, 0);
  transform: translate3d(-20%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter-active {
  z-index: 1;
}

.slide-right-leave-active,
.slide-left-enter-active {
  z-index: 2;
}
</style>
