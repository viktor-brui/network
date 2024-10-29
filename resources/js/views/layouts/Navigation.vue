<template>
    <div>
        <nav>
            <ul  class="navigation">
                <router-link to="/profile"><li><a href="">Profile</a></li></router-link>
                <router-link to="/settings"><li><a href="">Settings</a></li></router-link>
                <router-link to="/chat"><li><a href="">Chat</a></li></router-link>
            </ul>
            <div class="button">
                <div class="auth">
                    <router-link to="/login"><li><a href="" v-if="!loggedIn">Log In</a></li></router-link>
                    <router-link to="/register"><li><a href="">Registration</a></li></router-link>
                    <MainButton @click.prevent="logout" v-if="loggedIn">Log Out</MainButton>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import MainButton from "../../components/UI/MainButton";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Navigation",
    components: {MainButton},
    created() {
        this.checkUserState()
    },
    mounted() {
        this.$store.dispatch('auth/currentUser')
    },
    computed: {
        ...mapGetters({
            loggedIn: 'auth/loggedIn'
        }),
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            checkUserState: 'auth/setLoggedInstate'
        })
    }
}
</script>

<style lang="scss">
nav {
    margin: 30px;
    background-color: var(--color-gray-dark);
}

.navigation {
    list-style: none;
    float: left;
}


li {
    display: inline-block;
    margin-left: 30px;

    &first-child {
        margin: 0
    }

    a {
        padding: 15px 40px;
        color: white;
        background-color: #044f48;
    }
}

.button {
    float: right;
}
</style>
