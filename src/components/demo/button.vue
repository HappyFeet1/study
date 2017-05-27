<template>
   <div>
        <mt-button type="default">
           default</mt-button>
       <mt-button type="primary">primary</mt-button>
       <mt-button type="danger">danger</mt-button>
   </div>
</template>
<script>
import Vue from 'vue';
// import '#/lib/button/';
import Button from 'mint-ui/lib/button/';
import 'mint-ui/lib/button/style.css'
// Vue.component(Button.name, Button);
export default {
    components: {
        'mt-button': Button
    }
}
</script>


