// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueFire from 'vuefire'
import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'

import FBSignInButton from 'vue-facebook-signin-button'

import App from './App'
import { routes } from './router/routes';  // routes.js

import Webheader from './components/webheader'

import VueRouter from 'vue-router';

import * as VueGoogleMaps from 'vue2-google-maps'

var SocialSharing = require('vue-social-sharing');

Vue.use(SocialSharing);


// explicit installation required in module environments
Vue.use(VueFire)

Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(FBSignInButton)

Vue.component('Webheader', Webheader)

Vue.use(VueRouter);

// Google Map api
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvAXLb-pZ0TMzpGyH5uolA46lq3KuRCBQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

const router = new VueRouter({
    routes: routes,          // or just 'routes' in ES6
    mode: 'history'  
});

router.beforeEach( (to, from, next) => {
  var currentUser = firebase.auth().currentUser;
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser)
    next( { name: 'Login'});
  // else if (!requiresAuth && currentUser)
  //   next( {name: 'Hello'});
  else
    next();

})



let app;

// firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(
  user => {
    if (!app) {
      app = new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App }
      })
    }
  }
)