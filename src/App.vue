<template>
  <div id="app">
      <ul>
        <li><router-link to="/">/home</router-link></li>
        <li><router-link to="/default">/default</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
      </ul>
      <p>{{pageDirection}}</p>
      <transition :name="pageDirection" @after-enter="afterEnter">
        <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'app',
  created(){
    console.log(this);
  },
  computed:{
    ...mapState([
      'pageDirection'
    ])
  },
  methods:{
    ...mapMutations([
      'afterEnter'
    ])
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  position: absolute;
  transition: all .4s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
