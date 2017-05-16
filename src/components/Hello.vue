<template>
  <div class="hello">
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!--<h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <button @click="plus()">+</button>
    <button @click="reduce()">-</button>-->
    <mt-button @click="popupVisible=true">fsdf</mt-button>
    <mt-button @click.native="showToat">showToat</mt-button>
    <mt-button @click.native="messageBoxs()">messageBox</mt-button>
    <mt-popup v-model="popupVisible" :modal="true" popup-transition="bottom">
      <p>fdasfsd</p>
    </mt-popup>
    <mt-cell title="Button" is-link to="/button"></mt-cell>
    <mt-cell title="Toast" is-link to="/toast"></mt-cell>
    <mt-cell title="MessageBox" is-link to="/messageBox"></mt-cell>
    <mt-cell title="Popup" is-link to="/popup">
      <span style="color: green">这里是元素</span>
    </mt-cell>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import helloStore from '../store/modules/hello.js';

import Modal from '@/ui/modal/';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js ASpp',
      popupVisible: false
    }
  },
  beforeCreate() {
    // this.$store.registerModule('helloStore');
  },
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
    ...mapMutations([
      'plus',
      'reduce'
    ]),
    showToat() {
      this.$toast({
        message: '操作成功',
        iconClass: 'mintui mintui-success'
      });
    },
    messageBoxs() {
      // console.log(this.$messageBox);
      this.$messageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      });
    }
  },
  mounted(){
    Modal({
      // title:'是的方式大幅杀跌',
      content:'这是内',
      ok:function(){},
      btns:{
        ok2:{
          text:'ok',
          callback:function(){}
        },
        tv:{
          text:'关闭',
          callback:function(){

          }
        },
        tv3:{
          text:'关闭',
          callback:function(){

          }
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
