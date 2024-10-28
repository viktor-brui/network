<template>

    <div>Dashboard view</div>
    <div>
        <nav>
            <ul  class="navigation">
                <router-link to="/profile"><li><a href="">Profile</a></li></router-link>
                <router-link to="/settings"><li><a href="">Settings</a></li></router-link>
                <li><a href="">About</a></li>
            </ul>
            <div class="button">
                <MainButton @click.prevent="logout" v-if="loggedIn">Log Out</MainButton>
            </div>
        </nav>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import MainButton from "../../components/UI/MainButton";
export default {
    name: "Dashboard",
    components: {MainButton},
    data: () => ({

    }),
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

<style scoped lang="scss">

nav {
    margin: 30px;
    background-color: var(--color-gray-dark);
}

.navigation {
    list-style: none;
    float: left;

    li {
        display: inline-block;
        margin-left: 30px;

        &first-child {
            margin: 0
        }
    }
}

.button {
    float: right;
}

</style>
