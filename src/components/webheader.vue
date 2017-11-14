
<template>
  <div class="webheader">
  
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
          <router-link :to="{ name: 'Home'}" class="navbar-brand" style="cursor: pointer"> Paycuisine </router-link>
        </div>
  
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  
          <ul class="nav navbar-nav navbar-right">
            <li>
              <div style="padding:10px;">
                <router-link to="/storepage" type="button" class="btn btn-primary "> Store</router-link>
                <router-link to="/promotionpage" type="button" class="btn btn-primary"> Promotion</router-link>
              </div>
            </li>
            <li v-if="!isSignin">
              <div style="padding:10px;">
                <router-link to="/signin" type="button" class="btn btn-primary pull-right"> Login</router-link>
              </div>
            </li>
            <li v-else-if="isSignin">
  
              <div style="padding:10px;">
                <!-- {{userData}} -->
  
                <router-link tag="button" :to="{ name: 'ManageStore'}" type="button" class="btn btn-success"> Manage market </router-link>
                <button type="button" class="btn btn-default" @click="signOut"> Sign out</button>
              </div>
  
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
  
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {
    firebaseApp,
    db
  } from '@/firebaseConfig'
  
  export default {
    name: 'webheader',
    data() {
      return {
        isSignin: false,
        userData: null,
  
      }
    },
    created: function() {
  
      firebase.auth().onAuthStateChanged(
        user => {
          var currentUser = firebase.auth().currentUser;
          if (currentUser) {
            this.isSignin = true;
            console.log(currentUser)
          }
  
        }
      )
  
  
    },
    methods: {
      manageMarket: function() {
        this.$emit('ClickManageMarket')
      },
      mainMenu: function() {
        this.$emit('ClickMainMenu')
      },
      signOut: function() {
        firebase.auth().signOut();
        alert('Sign Out Done');
        this.isSignin = false;
  
      }
    }
  }
</script>

