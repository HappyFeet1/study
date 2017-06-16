<template>
    <div class="container">
        <mt-header title="消息中心">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="list-filter border">
            <div class="bd">
                <ul>
                    <li @click="toggle(4)" :class="{on:typeId==4}">系统公告</li>
                    <li @click="toggle(2)" :class="{on:typeId==2}">个人消息</li>
                </ul>
            </div>
        </div>
    
        <ul class="msg-list" v-infinite-scroll="syncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <li v-for="(el, index) in loadData" :class="{'new-dot':el.readStatus==1}" @click="markReaded(el.id, index)">
                <div class="content">
                    <div>
                        <h3>{{el.title}}</h3>
                        <p v-html="replaceBlank(el.content)"></p>
                    </div>
                </div>
                <p>{{el.publishTime}}</p>
            </li>
        </ul>
    
        <div class="page-infinite-loading">
            <p v-if="loading===true" class="page-infinite-loading">
                <mt-spinner type="double-bounce"></mt-spinner>
                加载中...
            </p>
            <p v-else-if="loading===-1" class="page-infinite-loading">
                没有更多了...
            </p>
            <p v-else-if="loading===-2" class="page-infinite-loading">
                没有查询结果
            </p>
        </div>
    </div>
</template>
<script>
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner from 'mint-ui/lib/spinner/';
import 'mint-ui/lib/spinner/style.css';
export default {
    data: function () {
        return {
            typeId: this.$route.query.typeId,
            loadData: [],
            loading: false
        }
    },
    watch: {
      'typeId': function(val)  {
          this.loadData = [];
          this.filterRequest.pageNo = 1;
          this.loading = false;
          this.syncData();
      }
    },
    computed: {
        filterRequest: function () {
            return {
                pageSize: 5,
                pageNo: 1,
                typeId: this.typeId
            }
        }
    },
    methods: {
        toggle(id) {
            this.typeId = id;
        },
        syncData() {
            if (this.loading) return;
            this.loading = true;
            this.$axios.get('/api/queryMsgList.do', { params: this.filterRequest })
                .then(res => {
                    if(res.data.code===-10000||res.request.responseURL.indexOf('login/index.do') > -1){
                        this.$router.push({path:'/login'});
                        return;
                    }
                    setTimeout(() => {
                        var data = res.data.list;
                        if (this.filterRequest.pageNo === 1 && !data.length) {
                            this.loading = -2;//没有查询结果
                        } else if (this.filterRequest.pageNo > 1 && !data.length) {
                            this.loading = -1;//没有更多了
                        } else {
                            var arr = this.loadData;
                            this.loadData = arr.concat(data);
                            this.filterRequest.pageNo++;
                            this.loading = false;
                        }
                    }, 1500);
                    
                })
                .catch(e => {
                    console.log(e)
                })
        },
        replaceBlank(str) {
            return str.replace(/[\r|\n|\r\n]+/g, "<br/>").replace(/[\s]+/g, function (arr) {
                return new Array(parseInt(arr.length / 2)).join('&nbsp;');
            });
        },
        markReaded(id, index){
            if(this.loadData[index].readStatus==1){
                this.$axios.post('/api/readMsg.do',{id: id})
                .then((res)=>{
                    var data = res.data
                    if(data.code===0){
                        this.loadData[index].readStatus=2;
                    }
                }).catch(e => {
                    console.log(e)
                })
            }

        }
    },

    components: {
        'mt-spinner': Spinner
    }
}
</script>
<style>
.list-filter {
    height: 54px;
}

.list-filter .bd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 54px;
    background-color: #fff;
}

.list-filter ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 100%;
}

.list-filter li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    font-size: 14px;
    position: relative;
}

.list-filter li.on {
    color: #D7980B;
}

.list-filter.border li:after {
    content: '';
    display: block;
    width: 1px;
    height: 2em;
    overflow: hidden;
    background-color: #E2E2E2;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -1em;
}

.list-filter.border li:last-child:after {
    display: none;
}

.msg-list li {
    background-color: #fff;
    border-radius: 5px;
    margin: 10px 10px 0;
    padding: 10px 15px 5px;
    position: relative;
}

.msg-list li .content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
    text-align: justify;
}

.msg-list li .content>div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    line-height: 1.6;
    ;
}

.msg-list .content h3 {
    padding-bottom: 4px;
}

.msg-list .content p {
    font-size: 12px;
    padding-top: 5px;
    text-align: justify;
    color: #A9A9A9;
    line-height: 24px;
}

.msg-list .content a {
    text-decoration: underline;
    color: #00f;
}

.msg-list li>p {
    text-align: right;
    color: #999;
    text-align: right;
    padding: 10px 0 5px;
    font-size: 12px;
}

</style>


