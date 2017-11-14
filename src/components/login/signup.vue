<template>
  <div class="sign-up">
      <p>Let's create a new account!</p>
        <input type="text" ref="name" v-model="user.name" placeholder="Full Name"><br>
        <input type="text" ref="email" v-model="user.email" placeholder="Email"><br>
        <input type="password" v-model="user.password1" placeholder="Password"><br>
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        <input type="text" ref="phone" v-model="user.phone" placeholder="Phone number"><br>

        <button class="btn btn-primary" @click="validateBeforeSubmit">Sign Up</button>
      <p>or go back to <router-link to="/signin">login</router-link>.</p>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'

var md5 = require('md5');
let usersRef = db.ref('Users');

export default {
  name: 'signUp',
  data() {
      return {
          user: {
              name: '',
              email: '',
              password1: '',
              password2: '',
              phone: ''
          }
      }
  },
  methods: {
      validateBeforeSubmit() {
          if (this.user.email && (this.user.password1 === this.user.password2)) {
              this.signup();
          } else {
              if(!this.user.name) {
                  alert('Name cannot be empty');
                  this.$refs.name.focus();
                  return;
              }
              if(!this.user.email) {
                  alert('Email cannot be empty');
                  this.$refs.email.focus();
                  return;
              }
              if(this.user.password1 != this.user.password2) {
                  alert('Password mismatch');
                  this.$refs.password2.focus();
                  return;
              }
          }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    // var newUser = this.addUserInfo();
                    this.addUserInfo();

                    this.$router.push({ name: 'Home'});
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
      },
      addUserInfo() {
          var newUser = {
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone
          }

            // md5  ---> npm install md5 -s
          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('Users/'+ uid).set(newUser);

      }
    }
}
</script>

<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input {
        margin: 5px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>

