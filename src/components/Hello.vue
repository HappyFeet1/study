<template>
  <div class="hello">
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      
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
    <mt-cell title="Modal" is-link to="/modal"></mt-cell>
    <mt-cell title="Popup" is-link to="/popup"><span style="color: green">这里是元素</span></mt-cell>
    <mt-cell title="ActionSheet" is-link to="/actionsheet"></mt-cell>
    <mt-cell title="Badge" is-link to="/badge"></mt-cell>
    <mt-cell title="CellSwipe" is-link to="/cell-swipe"></mt-cell>
    <mt-cell title="CheckList" is-link to="/checklist"></mt-cell>
    <mt-cell title="Picker" is-link to="/picker"></mt-cell>
    <mt-cell title="DateTime-Picker" is-link to="/datetime-picker"></mt-cell>
    <mt-cell title="Field" is-link to="/field"></mt-cell>
    <mt-cell title="Index-List" is-link to="/index-list"></mt-cell>
    <mt-cell title="Indicator" is-link to="/indicator"></mt-cell>
    <mt-cell title="InfiniteScroll" is-link to="/infinite-scroll"></mt-cell>
    <mt-cell title="LazyLoad" is-link to="/lazy-load"></mt-cell>
    <mt-cell title="Loadmore" is-link to="/loadmore"></mt-cell>
    <mt-cell title="Navbar" is-link to="/navbar"></mt-cell>
    <mt-cell title="Progress" is-link to="/progress"></mt-cell>
    <mt-cell title="Radio" is-link to="/radio"></mt-cell>
    <mt-cell title="Range" is-link to="/range"></mt-cell>
    <mt-cell title="Search" is-link to="/search"></mt-cell>
    <mt-cell title="Swipe" is-link to="/swipe"></mt-cell>
    <mt-cell title="Switch" is-link to="/switch"></mt-cell>
    <mt-cell title="Tabbar" is-link to="/tabbar"></mt-cell>
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
