<template>
  <div id="app">
      <transition :name="pageDirection">
        <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'app',
  created(){
  },
  computed:{
    ...mapState([
      'pageDirection'
    ])
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
.slide-right-leave-active,
.slide-left-enter-active{position: absolute;}
</style>
