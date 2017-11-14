
<template>
    <div class="promotion col-md-12" >
            <div v-if=" promotion.name != null">
                <div class="col-md-4">
                    <router-link  tag="img"  style="width:100%; cursor: pointer"
                       :to="{ name: 'PromotionDetail', params: { promotion: promotion } }" 
                       v-bind:src="promotion.picurl"></router-link>
                </div>
                <div class="col-md-8">
                    <span style="font-size:150%"> {{promotion.name}}</span><br>
                    <span style="font-size:100%; color:gray;">14/09/2560 - 15/10/2560 </span>
                </div>
            </div>    
    </div>
</template>


<script>

export default {

    name: 'promotion',
    props:[
        'Ipromotion'
    ],
    data() {
        return {
            promotion:this.Ipromotion
        }
    }, methods: {

    }

}

</script>

