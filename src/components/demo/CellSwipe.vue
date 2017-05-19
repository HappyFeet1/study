<template>
    <div class="container">
        <mt-header title="CellSwipe">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <mt-cell-swipe v-for="n in 10" :right="rightButtons" :key="n" title="swipe me">
        </mt-cell-swipe>
    </div>
</template>

<script>
import cellSwipe from '@/ui/cell-swipe/';
export default {
    created() {
        this.rightButtons = [
            {
                content: 'Mark as Unread',
                style: { background: 'lightgray', color: '#fff' },
                handler: (e) => { this.leftButtonHandler(e) }
            },
            {
                content: 'Delete',
                style: { background: 'red', color: '#fff' },
                handler: () => this.$toast('delete')
            }
        ];
    },

    methods: {
        leftButtonHandler(evt) {
            console.log(123);
        }
    },
    components: {
        'mt-cell-swipe': cellSwipe
    }
};
</script>

<style>
.mint-cell-swipe{border-bottom: 1px solid #ddd;;}
</style>
