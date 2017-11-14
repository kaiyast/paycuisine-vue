
<template>
    <div class="promotionDetail" >

        <ol class="breadcrumb">
            <li>
                <router-link  tag="span"  style="cursor: pointer" :to="{ name:'Home' }" >Home</router-link>
            </li>
            <li class="active">{{promotion.name}}</li>
        </ol>
        <div>
            <span class="promotion-detail" v-html="promotion.detail"></span>

        </div>

    </div>
</template>


<script>

import firebase from 'firebase'

var firebaseApp = firebase;
var db = firebaseApp.database();

export default {

    name: 'promotionDetail',
    data() {
        return {
            promotion: this.$route.params.promotion,           
        }
    }, methods: {

    }

}

</script>

<style>
.promotion-detail > p > img{
  width:100%;
}

</style>