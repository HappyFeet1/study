<template>
  <div class="page-loadmore">
    <mt-header title="Pull Down">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
    <p class="page-loadmore-desc">在列表顶端, 按住 - 下拉 - 释放可以获取更多数据</p>
    <p class="page-loadmore-desc">此例请使用手机查看</p>
    <p class="page-loadmore-desc">translate : {{ translate }}</p>
    <div class="loading-background" :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)' }">
      translateScale : {{ moveTranslate }} 
    </div>
    <div class="page-loadmore-wrapper" ref="wrapper" >
      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <ul class="page-loadmore-list">
          <li v-for="(item,index) in list" class="page-loadmore-listitem" :key="index">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/babel">
import Loadmore from '@/ui/loadmore/';
import Spinner from '@/ui/spinner/';
  export default {
    data() {
      return {
        list: [],
        topStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0
      };
    },

    methods: {
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      }
    },

    created() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    components: {
      'mt-loadmore':Loadmore,
      'mt-spinner':Spinner
    }
};
</script>
<style>
.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle;
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
}

.page-loadmore-desc:last-of-type {
    border-bottom: solid 1px #eee;
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
}

.page-loadmore-listitem:first-child {
    border-top: solid 1px #eee;
}

.page-loadmore-wrapper {
    overflow: scroll;
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
.loading-background{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: .2s linear;
}


</style>