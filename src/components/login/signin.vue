<template>
    <div class="login">
        <center>
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h3>Sign in</h3>
                <input type="text" class="form-control" v-model="user.username" placeholder="Username"><br>
                <input type="password" class="form-control" v-model="user.password" placeholder="Password"><br>
                <button @click="login" class="btn btn-primary form-control">Login</button>
                <p>You don't have an account? You can
                    <router-link to="/signup"> create one</router-link>
                </p>

            </div>
            <div class="col-md-4"></div>
           
            <div class="col-md-12">
                <hr>
                
                </br>
                <div id="firebaseui-auth-container"></div>
            </div>
        </center>

    </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'

export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }

        }
    },
    mounted() {
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };

        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(
                user => {
                    alert('User authentication successful');
                    this.$router.push({ name: 'Home' }); // redirect to Hello
                },
                err => {
                    if (err.code === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if (err.code === 'auth/user-not-found') {
                        alert('User not found!');
                    } else if (err.code === 'auth/invalid-email') {
                        alert('Invalid email');
                    } else {
                        alert('Oops. ' + err.message);
                    }

                }
            ).catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert(error.message);
                }
            })
        },

    }
}
</script>

<style src="firebaseui/dist/firebaseui.css" />

</style>


