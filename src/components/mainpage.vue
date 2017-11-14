

<template>

<!-- <template>
  <div class="promotion">
    
  </div>
</template>


<script>

export default {


}

</script> -->

  <div class="mainpage"  >

        <!-- Mainmenuview -->
        <div v-show="isMainview">

          <div class="col-md-8">
              <stores :Istores="stores"></stores>
          </div>

          <div class="col-md-4">

            <hr>
            <h1>Hot Promotions</h1><hr>

              <promotions :Ipromotions="promotions" ></promotions>

          </div>
        </div>   

  </div>
</template>

<script>

import Promotions from './promotion/promotions';
import Stores from './store/stores';

import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'

// var config = {
//   apiKey: "AIzaSyB6I78iXFS7h8mRww7V6fhQuSXddh0RQcA",
//   authDomain: "pay-cuisine.firebaseapp.com",
//   databaseURL: "https://pay-cuisine.firebaseio.com",
//   projectId: "pay-cuisine",
//   storageBucket: "pay-cuisine.appspot.com",
//   messagingSenderId: "971235894561"
// };

// var firebaseApp = firebase.initializeApp(config);
// var db = firebaseApp.database();

var storesRef = db.ref('Stores');
var storeRef = db.ref('Stores').child("x");
var promotionsRef = db.ref('Promotions');
var promotionRef = db.ref('Promotions').child("x");

export default {
  name: 'mainpage',
  data() {
    return {
      isMainview: true,
      isStoreview: false,
      isPromotionview: false,
      pagestatus: "mainmenu",
    }

  },
  methods: {
    selectStore: function(key) {
      this.isMainview = !this.isMainview;
      this.isStoreview = !this.isStoreview
      this.isPromotionview = false;

      this.stores.forEach(function(store) {
        if (store['.key'] == key) {
          this.store = store;
        }
      }, this);

    },
    backtoMain: function() {
      this.isMainview = true;
      this.isStoreview = false;
      this.isPromotionview = false;
    },
    onClickPage: function(pagename) {
      this.pagestatus = pagename
    },
    selectPromotion: function(key) {
      this.isMainview = !this.isMainview;
      this.isPromotionview = true;
      this.isStoreview = false;

      this.promotions.forEach(function(promotion) {
        if (promotion['.key'] == key) {
          this.promotion = promotion;
        }
      }, this);
    }
  }, firebase: {
    stores: storesRef,
    store: storeRef,
    promotions: promotionsRef,
    promotion: promotionRef,
  }
  , updated: function() {

  }, components:{
    'promotions':Promotions,
    'stores':Stores,
  }
}
</script>

<style>
</style>


