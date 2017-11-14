
<template>
    <div class="promotions">

         <input v-if="searchOn" class="form-control" v-model="search" placeholder="Search something"><br>
        <div v-for="promotion in promotions" :key="promotion['.key']" v-if="checkPromotionShow(promotion)">
            <promotion :Ipromotion="promotion"></promotion>
        </div>
    </div>
</template>


<script>
import Promotion from './promotion'

import firebase from 'firebase'

export default {

    name: 'promotions',
    props:[
        'Ipromotions',
        'IsearchOn',
        'IstoreId',
    ],
    data() {
        return {
            promotions:this.Ipromotions,
            isSignin:false,
            searchOn: this.IsearchOn,
            storeId: this.IstoreId,
            search: "",
        }
    },created: function() {

        var currentUser = firebase.auth().currentUser;
        if (currentUser) 
          this.isSignin = true;
    


  }
    , methods: {
        checkPromotionShow: function(promotion){
                if(promotion.ismember)
                {
                    if(!this.isSignin)
                      {return false;}
                }
                
                var promotionname = String(promotion.name);
                if(!promotionname.toUpperCase().includes(this.search.toUpperCase()))
                {  return false;}

                
                if(this.storeId)
                {
                   
                 
                    if(promotion.storeid != this.storeId)
                    { 
                         console.log(String(promotion['.key']) + "," + String(this.storeId));
                        return false;
                    }

                      
                }

                return true;
        }
    }, components: {
        'promotion': Promotion
    }

}

</script>

