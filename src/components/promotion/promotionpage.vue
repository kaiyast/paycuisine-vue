
<template>
    <div>
        <promotions :Ipromotions="promotions" :IsearchOn="true" ></promotions>
    
    </div>
</template>


<script>
import Promotions from "./Promotions";

import firebase from "firebase";
import { firebaseApp, db } from '@/firebaseConfig'


var promotionsRef = db.ref("Promotions");

export default {
  name: "promotionpage",

  data() {
    return {
      stores: this.Istores
    };
  },

  firebase: {
    promotions: promotionsRef
  },

  components: {
    Promotions: Promotions
  }
};
</script>

