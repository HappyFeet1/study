<template>
    <div class="container">
        <router-view class="child-view"></router-view>
        <mt-tabbar v-model="selected" fixed v-show="$store.state.mainTabbarVisible">
            <mt-tab-item id="index" @click.native="go()">
                <i slot="icon" class="icon icon-home"></i>
                首页
            </mt-tab-item>
            <mt-tab-item id="project" @click.native="go()">
                <i slot="icon" class="icon icon-product"></i>
                理财
            </mt-tab-item>
            <mt-tab-item id="mine" @click.native="go()">
                <i slot="icon" class="icon icon-mine"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import 'mint-ui/lib/tabbar/style.css';
import 'mint-ui/lib/tab-item/style.css';

import Tabbar from 'mint-ui/lib/tabbar/';
import TabItem from 'mint-ui/lib/tab-item/';

export default {
    data() {
        return {
            selected: this.$route.name || 'index'
        }
    },
    methods: {
        go: function () {
            let name = { name: this.selected !== 'index' ? this.selected : 'main' };
            this.$store.state.selected = this.selected;
            this.$router.push(name);
        }
    },
    components: {
        'mt-tabbar': Tabbar,
        'mt-tab-item': TabItem,
    }
}
</script>

<style>
.mint-tabbar .icon-home {
    background-position: 0 0;
}
.mint-tabbar .icon-product {
    background-position: 0 -25px;
}
.mint-tabbar .icon-mine {
    background-position: 0 -75px;
}
.mint-tabbar .is-selected .icon-home {
    background-position: -25px 0;
}
.mint-tabbar .is-selected .icon-product {
    background-position: -25px -25px;
}
.mint-tabbar .is-selected .icon-mine {
    background-position: -25px -75px;
}
</style>
