<template>
    <div class="page-indexlist">
        <mt-header title="IndexList">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
        <p class="page-indexlist-desc">此例请使用手机查看</p>
        <div class="page-indexlist-wrapper">
            <mt-index-list>
                <mt-index-section v-for="(item, _) in alphabet" :index="item.initial" :key="_">
                    <mt-cell v-for="(cell, _) in item.cells" :title="cell" :key="_"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>

<style>
.page-indexlist-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
}
.page-indexlist-wrapper {
    width: 100%;
    border-top: solid 1px #ddd;
}

</style>

<script type="text/babel">

import IndexSection from '@/ui/index-section/';
import IndexList from '@/ui/index-list/';

const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];

export default {
    data() {
        return {
            alphabet: []
        };
    },

    created() {
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
            let cells = NAMES.filter(name => name[0] === initial);
            this.alphabet.push({
                initial,
                cells
            });
        });
    },
    components: {
        'mt-index-list': IndexList,
        'mt-index-section': IndexSection
    }
};
</script>
