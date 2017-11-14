
<template>
    <div class="stores">
    
         <input v-if="searchOn" class="form-control" v-model="search" placeholder="Search something"><br>
        <div v-for="store in stores" :key="store['.key']" class="col-md-12" style="margin-bottom:10px;" v-if="checkShowStore(store)">
            
            <store :Istore="store"></store>
    
        </div>
    
    </div>
</template>


<script>
    import Store from './store'
    
    
    
    export default {
    
    
    
        name: 'stores',
    
        props: [
    
            'Istores',
    
            'IsearchOn'
    
        ],
    
        data() {
    
            return {
    
                stores: this.Istores,
                searchOn: this.IsearchOn,
                search: "",
    
            }
    
        },
    
        methods: {
    
            checkShowStore: function(store){
                var storename = String(store.name);
                if(storename.toUpperCase().includes(this.search.toUpperCase()))
                {  return true;}
                return false;
    
            }
    
        },
    
        components: {
    
            'store': Store
    
        }
    
    
    
    }
</script>

