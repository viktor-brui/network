<template>
    <Navigation/>
    <div class="container">
        <div class="card">
            <figure class="avatar">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
            </figure>
            <div class="stats">
                <h2> Id: {{ currentUser.id  }} </h2>
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
import Navigation from "../layouts/Navigation";

export default {
    name: "UserProfile",
    components: {
        Navigation,
        MainButton
    },
    created() {
        this.$store.dispatch('auth/currentUser')
        this.checkUserState()
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
    width: max-content;
    background-color: #044f48;
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

    img {
        height: 100%;
        width: 100%;
    }
}
.stats {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
    //height: 250px;
    //width: 300px;
    color: white;
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
