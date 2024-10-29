<template>
    <div>
        <Navigation/>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import MainButton from "../../components/UI/MainButton";
import Navigation from "../layouts/Navigation";
export default {
    name: "Dashboard",
    components: {MainButton,Navigation},
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



</style>
