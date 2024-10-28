<template>
    <div>UserProfile view</div>
    <div class="container">
        <div>
            <nav>
                <ul  class="navigation">
                    <router-link to="/profile"><li><a href="">Profile</a></li></router-link>
                    <router-link to="/settings"><li><a href="">Settings</a></li></router-link>
                    <li><a href="">About</a></li>
                </ul>
                <div class="button">
                    <MainButton @click="logout" v-if="loggedIn">Log Out</MainButton>
                </div>
            </nav>
        </div>
        <div class="card">
            <div class="avatar"></div>
            <div class="stats">
                <h2> Name: {{ currentUser.id  }} </h2>
                <h2> Name: {{ currentUser.name  }} </h2>
                <h2> Email: {{ currentUser.email  }} </h2>
                <h2> Joined: {{ currentUser.created_at }} </h2>
            </div>

        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import MainButton from "../../components/UI/MainButton";

export default {
    name: "UserProfile",
    components: {
        MainButton
    },
    created() {
        this.$store.dispatch('auth/currentUser')
        this.checkUserState()
        console.log('currentUser', this.$store.state.auth.userDetails)
    },
    data: () => ({

    }),
    computed: {
        ...mapGetters({
            loggedIn: 'auth/loggedIn'
        }),
        currentUser: {
            get() {
                return this.$store.state.auth.userDetails
            }
        },
    },
    methods: {
        ...mapActions({
            logout: "auth/logout",
            checkUserState: 'auth/setLoggedInstate'
        })
    }
}
</script>

<style lang="scss">
.container {
    height: 100vh;
    width: 100%;
    overflow: auto;
}
.card {
    position: relative;
    height: 520px;
    width: 300px;
    background-color: #ffffff;
    margin: 100px auto 0;
    overflow: hidden;
    box-shadow: 0 5px 20px 0 rgb(0,0,0,0.3);
}
.avatar {
    height: 180px;
    width: 180px;
    border-radius: 50%;
    border: 3px solid #aaaaaa;
    overflow: hidden;
    margin: 50px auto 30px;
}
.stats {
    padding: 0;
    height: 250px;
    width: 300px;
}
h2 {
    text-align: center;
    font-size: 2.2em;
    margin: 5px 0 10px;
}
.button {
    float: right;
}
</style>
