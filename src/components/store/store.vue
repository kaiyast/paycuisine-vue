
<template>
    <div class="store">
        <div v-if=" store.name != null">

            <div class="col-md-4">

            <router-link tag="img" style="width:100%; cursor: pointer" :to="{ name: 'StoreDetail', params: { store: store } }" v-bind:src="store.picurl"></router-link>
            </div>
            <div class="col-md-8">
                <span style="font-size:150%">{{store.name}}</span><br>
                 <div>
                    <span v-for="x in store.rate" style="color:yellow; font-size:150%" class="glyphicon glyphicon-star"></span>
                    <span v-for="x in 5 - store.rate" style=" font-size:150%" class="glyphicon glyphicon-star-empty"></span>
                </div>
                <span style="font-size:100%; color:gray;">{{store.type}}</span><br>
                <span style="font-size:100%; color:gray;"> " {{store.detail}} " </span><br>
                <span style="font-size:100%;">Price Rate {{store.pricerate}} Bahts</span><br>
                <span style="font-size:100%;">{{store.address}}</span>
               

                 
            </div>

        </div>
    </div>
</template>


<script>

export default {

    name: 'store',
    props: [
        'Istore'
    ],
    data() {
        return {
            store: this.Istore,
            
        }
    }, methods: {

    }

}

</script>

