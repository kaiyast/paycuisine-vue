
<template>
    <div>
     
      <stores :Istores="stores" :IsearchOn="true"></stores>
    </div>
</template>


<script>
import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'

import Stores from './stores'


var storesRef = db.ref('Stores');

export default {

    name: 'storepage',
    data() {
        return {
        }
    }, methods: {

    }, components: {
        'stores': Stores
    }, firebase: {
    stores: storesRef,
  },created(){

  }

}

</script>

