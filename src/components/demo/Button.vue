<template>
<div class="container">
    <mt-header title="Bottom">
        <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    
    <div class="page-button-group">
        <mt-button size="large">default</mt-button>
        <mt-button size="large" type="primary">primary</mt-button>
        <mt-button size="large" type="danger">danger</mt-button>
    </div>
    
    <div class="page-button-group">
        <mt-button>default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
    </div>
    
    <div class="page-button-group">
        <mt-button size="small">default</mt-button>
        <mt-button size="small" type="primary">primary</mt-button>
        <mt-button size="small" type="danger">danger</mt-button>
    </div>
    
    <div class="page-button-group">
        <mt-button disabled size="large">default</mt-button>
        <mt-button disabled size="large" type="primary">primary</mt-button>
        <mt-button disabled size="large" type="danger">danger</mt-button>
    </div>
    
    <div class="page-button-group">
        <mt-button plain size="large">default</mt-button>
        <mt-button plain size="large" type="primary">primary</mt-button>
        <mt-button plain size="large" type="danger">danger</mt-button>
    </div>
    
   
</div>
</template>

<style>
    .page-button-group{
        border-top: 20px solid #eee;
        padding: 0 10px 10px 10px;
    }
    .page-button-group button{
        margin-top: 10px;
    }
</style>