<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <button @click="plus()">+</button>
    <button @click="reduce()">-</button>
    <mt-button @click="popupVisible=true">fsdf</mt-button>
    <mt-button @click.native="showToat">showToat</mt-button>
    <mt-popup
      v-model="popupVisible"
      :modal="true"
      popup-transition="bottom">
      <p>fdasfsd</p>
    </mt-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import helloStore from '../store/modules/hello.js';

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
    ])
  },
  methods:{
    showToat(){
      console.log(this)
      this.$toast({
        message: '操作成功',
          iconClass: 'mintui mintui-success'
      });
    }
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
