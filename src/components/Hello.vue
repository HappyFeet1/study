<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <button @click="plus()">+</button>
    <button @click="reduce()">-</button>
    <mt-button>fsdf</mt-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import helloStore from '../store/modules/hello.js';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js ASpp'
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
