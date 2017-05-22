<template>
    <div class="page-search">
        <mt-header title="Search">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
        <mt-search autofocus v-model="value" :result="filterResult"></mt-search>
    </div>
</template>

<script>
import Search from '@/ui/search/';
export default {
    name: 'page-search',
    data() {
        return {
            value: '',
            defaultResult: [
                'Apple',
                'Banana',
                'Orange',
                'Durian',
                'Lemon',
                'Peach',
                'Cherry',
                'Berry',
                'Core',
                'Fig',
                'Haw',
                'Melon',
                'Plum',
                'Pear',
                'Peanut',
                'Other'
            ]
        };
    },
    computed: {
        filterResult() {
            return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
        }
    },
    components: {
        'mt-search': Search
    }
};
</script>

<style lang="css">
.page-search {
    height: 100%;
}
</style>