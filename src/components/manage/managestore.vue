
<template>
  <div class="managestore">

    <div v-if="page == 'managestore'">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="col-md-8">
              <h3>Store Detail</h3>
            </th>
            <th class="col-md-4">
              <div class="pull-right">
                <button type="button" @click="addStore" class="btn btn-success">
                  <span class="glyphicon glyphicon-plus"></span> Store </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mystore in stores" :key="mystore.id">
            <td v-if="mystore.owner == userData.id">
              <div class="col-md-8">
                <img style="width:100%" v-bind:src="mystore.picurl">
              </div>
              <div class="col-md-4">
                <h4>{{ mystore.name}}</h4>
              </div>

            </td>
            <td v-if="mystore.owner == userData.id" class="pull-right">

              <!-- Single button -->
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="glyphicon glyphicon-cog"></span> &nbsp;
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="seePromotion(mystore['.key'])" style="cursor: pointer"> Promotion </a>
                  </li>
                  <li>
                    <a @click="editStore(mystore)" style="cursor: pointer"> Edit </a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a @click="store = mystore" data-toggle="modal" data-target="#myModal" style="cursor: pointer"> Del </a>
                  </li>
                </ul>
              </div>

            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div v-else-if="page == 'editstore'">
      <ol class="breadcrumb">
        <li>
          <a @click="page = 'managestore'" style="cursor: pointer">Store Manager</a>
        </li>
        <li class="active">
          <span v-if=" store.name == '' ">New Store</span>
          <span v-else>{{store.name}}</span>
        </li>
      </ol>

     
      <h2>1. Store Information</h2> <hr>

      <div class="form-group">
        <label>Name</label>
        <input class="form-control" v-model="store.name" placeholder="Name">
      </div>

      <div class="form-group">
        <label>Store Description</label>
        <input class="form-control" v-model="store.detail" placeholder="Description">
      </div>

      <div class="form-group">
            <label>Store Type</label>
            <select class="form-control" v-model="store.type">
                <option v-for="value in storeType" :key="value" :value="value">{{value}}</option>
            </select>
      </div>

       <div class="form-group">
            <label>Price Rate</label>
            <select class="form-control" v-model="store.pricerate">
              <option v-for="value in priceRate" :key="value" :value="value">{{value}}</option>
            </select>
      </div>

       <div class="form-group">
            <label>Address</label>
            <input class="form-control" v-model="store.address" placeholder="DescriptiAddresson">  
      </div>

      <div class="form-group">
        <label>Picurl</label>
        <input class="form-control" v-model="store.picurl" placeholder="Url">
        <img style="width:40%; margin-top:10px;" v-bind:src="store.picurl">
      </div>



      <h2>2. Contact Information</h2>     <hr>

      <div class="form-group">
        <label>Phone</label>
        <input class="form-control" v-model="store.phone" placeholder="0887252233">
      </div>

      <div class="form-group">
        <label>Facebook</label>
        <input class="form-control" v-model="store.facebook" placeholder="Facebook">
      </div>

      <div class="form-group">
        <label>Line</label>
        <input class="form-control" v-model="store.line" placeholder="Line">
      </div>

      <div class="form-group">
        <label>Instagram</label>
        <input class="form-control" v-model="store.instagram" placeholder="Instagram">
      </div>


      <label>Map</label>
       <button v-if="!store.hasmap" class="btn btn-default" @click="store.hasmap = true"> Show  </button> 
        <button v-if="store.hasmap" class="btn btn-default" @click="store.hasmap = false"> Hide </button> <br><br>
      <gmap-map
      :center="gmap.center"
      :zoom="12"
      @click="mapClicked"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
      v-if="store.hasmap"
      >
      
        <gmap-marker 
        v-if="gmap.enablemarker"
        :position="gmap.position"
        :clickable="true" :draggable="true" @click="center=m.position"
        >

        </gmap-marker>
      </gmap-map>


      <button class="btn btn-default" @click="submitEditStore()"> Submit </button> <br>
    </div>

    <!-- Promotion List -->
    <div v-else-if="page == 'promotion'">
      <ol class="breadcrumb">
        <li>
          <a @click="page = 'managestore'" style="cursor: pointer">Store Manager</a>
        </li>
        <li class="active">Promotions</li>
      </ol>

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="col-md-8">
              <h3>Promotion Detail</h3>
            </th>
            <th class="col-md-4">
              <div class="pull-right">
                <button type="button" @click="addPromotion" class="btn btn-success">
                  <span class="glyphicon glyphicon-plus"></span> Promotion </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mypromotion in promotions" :key="mypromotion['.key']">
            <td v-if="mypromotion.storeid == storeid">
              <div class="col-md-6">
                <img style="width:100%;" v-bind:src="mypromotion.picurl">

              </div>
              <div class="col-md-6">
                <h4> {{ mypromotion.name }}</h4>
              </div>

            </td>
            <td v-if="mypromotion.storeid == storeid" class="pull-right">

              <!-- Single button -->
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="glyphicon glyphicon-cog"></span> &nbsp;
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="editPromotion(mypromotion)" style="cursor: pointer"> Edit </a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a @click="promotion = mypromotion" data-toggle="modal" data-target="#myModal" style="cursor: pointer"> Del </a>
                  </li>
                </ul>
              </div>

            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div v-else-if="page == 'editpromotion'">

      <ol class="breadcrumb">
        <li>
          <a @click="page = 'managestore'" style="cursor: pointer">Store Manager</a>
        </li>
        <li>
          <a @click="page = 'promotion'" style="cursor: pointer">Promotion</a>
        </li>
        <li class="active">
          <span v-if=" promotion.name == '' ">New Store</span>
          <span v-else>{{promotion.name}}</span>
        </li>
      </ol>

      <div class="form-group">
        <label>Name</label>
        <input class="form-control" v-model="promotion.name" placeholder="Name">
      </div>

      
      <div class="form-group">
        <label>Price</label>
        <input type="number" class="form-control" v-model="promotion.price" placeholder="Price">
      </div>

      <div class="form-group">
        <label>Discount</label>
        <input type="number" class="form-control" v-model="promotion.discount" placeholder="Discount %">
      </div>


      <div class="form-group">
        <label>PicUrl</label>
        <input class="form-control" v-model="promotion.picurl" placeholder="Picurl">
        <img style="width:20%; margin-top:10px;" v-bind:src="promotion.picurl">
      </div>


      <div class="form-group">
        <label>Member Promotion</label>
        <input type="checkbox"  v-model="promotion.ismember" >
      </div>

      <vue-editor v-model="promotion.detail" style="height:50%;"></vue-editor> <br>

      <button @click="submitAddPromotion()" class="btn btn-success"> Submit </button> <br><br><br><br>

    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">
              Are you want to delete this
              <span v-if="page == 'managestore'"> Store ?</span>
              <span v-else> Promotion ? </span>
            </h4>
          </div>
          <div class="modal-body">
            Please Confirm by type
            <mark>
              "
              <span v-if="page == 'managestore'">{{store.name}}</span>
              <span v-else> {{promotion.name}}</span> "
            </mark><br><br>
            <input class="form-control" v-model="confirmModalText" placeholder="">
            <span style="color:red;">{{feedbackModalText}}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
            <button v-if="page == 'managestore'" @click="removeStore()" type="button" class="btn btn-primary">Confirm</button>
            <button v-else @click="delPromotion()" type="button" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import { VueEditor } from "vue2-editor";

var db = firebase.database();
var storesRef = db.ref("Stores");
var promotionsRef = db.ref("Promotions");
var storeRef = db.ref("Stores").child("-KuDD3EHxxZk87NUNV3N");



export default {
  name: "managestore",
  data() {
    return {
      userData: null,
      page: "managestore",
      gmap:{
        center: {lat:13.6993618, lng:100.51563263},
        position: {lat: 48.8538302,
          lng: 2.2982161       },
          enablemarker: false
      },
      
      store: {
        name: "",
        owner: "",
        picurl: "",
        detail: "",
        address: "",
        phone: "",
        facebook: "",
        line: "",
        instagram: "",
        type: "",
        hasmap: false,
        position:{         
          lat: 0,
          lng: 0       
        },
        rate:0,
        pricerate:"",
      },
      promotion: {
        name: "",
        storeid: "",
        picurl: "",
        price: "",
        discount: 0,
        ismember: false,
        detail: ""
      },
      storeType: {
        0: "Cafe",
        1: "Restaurant",
        2: "Minimart",
      },
      priceRate: {
        0: "<100",
        1: "100 - 500",
        2: "500 - 1000",
        3: ">1000",
      },
      isNewStore: false,
      isNewPromotion: false,
      storeid: null,
      confirmModalText: "",
      feedbackModalText: ""
    };
  },
  created: function() {
    this.userData = firebase.auth().currentUser;
    this.userData.id = this.userData.uid;
  },
  methods: {
    // Store
    addStore: function() {
      this.resetStore();
      this.page = "editstore";
      this.isNewStore = true;
      this.store.owner = this.userData.id;
    },
    editStore: function(store) {
      this.page = "editstore";
      this.isNewStore = false;
      


      this.setStore(store);

       //init googlemap
      this.gmap.enablemarker = true;
      this.gmap.center = store.position;
      this.gmap.position = store.position;
    },
    removeStore: function() {
      if (this.confirmModalText == this.store.name) {
        storesRef.child(this.store[".key"]).remove();
        this.confirmModalText = "";
        this.CloseModal();
      } else {
        this.feedbackModalText = "Wrong Confirmtext";
      }
    },
    setStore: function(store) {
      for (var key in store) {
        this.store[key] = store[key];
      }
      console.log(this.stores);
      this.isNewStore = false;
    },
    resetStore: function() {
      for (var key in this.store) {
        this.store[key] = "";
      }
    },
    submitEditStore: function() {

      this.store.position = this.gmap.position;
      if (this.isNewStore == true) {
        delete this.store[".key"];
        console.log(this.store);
        storesRef.push(this.store);
        this.isNewStore = false;
      } else {
        let key = this.store[".key"];
        delete this.store[".key"];
        storesRef.child(key).set(this.store);
      }

      this.page = "managestore";
    },mapClicked(mouseArgs) {    
      this.gmap.enablemarker = true
      this.gmap.position.lat = mouseArgs.latLng.lat();
      this.gmap.position.lng = mouseArgs.latLng.lng();
   
    },
    // Promotion
    seePromotion: function(storeid) {
      this.storeid = storeid;
      this.page = "promotion";
    },
    addPromotion: function() {
      this.resetPromotion();
      this.isNewPromotion = true;
      this.page = "editpromotion";
    },
    editPromotion: function(promotion) {
      this.setPromotion(promotion);
      this.isNewPromotion = false;
      this.page = "editpromotion";
    },
    submitAddPromotion: function() {
      if (this.isNewPromotion == true) {
        delete this.promotion[".key"];
        this.promotion.storeid = this.storeid;
        promotionsRef.push(this.promotion);
        this.isNewPromotion = false;
      } else {
        let key = this.promotion[".key"];
        delete this.promotion[".key"];
        promotionsRef.child(key).set(this.promotion);
      }

      this.page = "promotion";
    },
    delPromotion: function(promotion) {
      if (this.confirmModalText == this.promotion.name) {
        promotionsRef.child(this.promotion[".key"]).remove();
        this.page = "promotion";
        this.CloseModal();
      } else {
        this.feedbackModalText = "Wrong Confirmtext";
      }
    },
    resetPromotion: function() {
      for (var key in this.promotion) {
        this.promotion[key] = "";
      }
    },
    setPromotion: function(promotion) {
      for (var key in promotion) {
        this.promotion[key] = promotion[key];
      }
    },
    CloseModal: function() {
      $(function() {
        $("#myModal").modal("toggle");
      });
    }
  },
  computed: {},
  firebase: {
    stores: storesRef,
    promotions: promotionsRef
  },
  components: {
    VueEditor
  }
};
</script>

