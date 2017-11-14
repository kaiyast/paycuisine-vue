
<template>
    <div class="storeDetail">

        <ol class="breadcrumb">
            <li>
                <router-link  tag="span"  style="cursor: pointer" :to="{ name:'Home' }" >Home</router-link>
            </li>
            <li class="active">{{store.name}}</li>
        </ol>

        <img style="width:500px;" v-bind:src="store.picurl">


     
        <h1>{{store.name}}

            <span v-for="x in store.rate" style="color:yellow; font-size:80%" class="glyphicon glyphicon-star"></span>
             <span v-for="x in 5 - store.rate" style=" font-size:80%" class="glyphicon glyphicon-star-empty"></span>
        </h1>
   

        <div class="container">
        " {{store.detail}} "
        </div>


<div class="container col-md-12">

        <h2 class="col-md-3" v-if="store.phone" >  <i class="fa fa-phone" style="color:orange"></i> {{store.phone}}</h2>
        <h2 class="col-md-3" v-if="store.facebook"> <i class="fa fa-facebook" style="color:blue"></i> {{store.facebook}}</h2>
        <h2 class="col-md-3" v-if="store.line"> <i class="fa fa-mobile" style="color:green"></i> {{store.line}}</h2>
        <h2 class="col-md-3" v-if="store.instagram" > <i class="fa fa-instagram" style="color:violet"></i> {{store.instagram}}</h2>

</div>
     

      <gmap-map
      :center="store.position"
      :zoom="12"
      map-type-id="terrain"
      class="col-md-12"
      style="width: 100%; height: 300px"
      v-if="store.position.lat != 0"
      >
      
        <gmap-marker 
        :position="store.position"
        :clickable="true" @click="center=store.position"
        >

        </gmap-marker>
      </gmap-map> 

      <promotions class="container col-md-12" :Ipromotions="promotions" :IstoreId="store['.key']"></promotions>

  
    <div  class="container col-md-12">
        <social-sharing url="https://vuejs.org/"
                    
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      inline-template>
  <div>
      <network network="email">
          <i class="fa fa-envelope"></i> Email
      </network>
      <network network="facebook">
        <i class="fa fa-facebook"></i> Facebook
      </network>
      <network network="googleplus">
        <i class="fa fa-google-plus"></i> Google +
      </network>
      <network network="line">
        <i class="fa fa-line"></i> Line
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"></i> Twitter
      </network>

  </div>
</social-sharing>
        </div>
    

    </div>
</template>


<script>


import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'

import Promotions from '../promotion/Promotions'
var promotionsRef = db.ref('Promotions');

export default {

    name: 'storeDetail',
    data() {
        return {
            store: this.$route.params.store,
        }
    }, methods: {

    }, components:{
        "promotions" : Promotions
    }, firebase: {
    promotions: promotionsRef,
  }

}

</script>

<style>
.promotion-detail>p>img {
    width: 100%;
}
</style>