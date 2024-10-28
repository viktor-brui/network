<template>
    <div>Settings view</div>
    <div class="container">
        <div>
            <h1>Settings</h1>
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

        <div class="settings-page">
            <form action="" class="form">
                <div class="card-title">User Details</div>
                <MainInput type="text" placeholder="name" v-model="user.name"/>
                <div class="button">
                    <MainButton @click.prevent="changeDetails" >Save</MainButton>
                </div>
            </form>
            <ValidationErrors v-if="validationErrors" :errors="validationErrors"></ValidationErrors>
            <form action="" class="form">
                <div class="card-title">Change Password</div>
                <MainInput type="text" placeholder="old password" v-model="user.oldPassword"/>
                <MainInput type="text" placeholder="new password" v-model="user.newPassword"/>
                <MainInput type="text" placeholder="confirm new password" v-model="user.newPassword_confirmation"/>
                <div class="button">
                    <MainButton @click.prevent="changePassword" v-if="loggedIn">Change Password</MainButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import MainButton from "../../components/UI/MainButton";
import MainInput from "../../components/UI/MainInput";

export default {
    name: "Settings",
    components: {
        MainButton,MainInput
    },
    created() {
        this.$store.dispatch('auth/currentUser')
        this.checkUserState()
    },
    data: () => ({
        user: {
            name: '',
            oldPassword: '',
            newPassword: '',
            newPassword_confirmation: ''
        }
    }),
    computed: {
        ...mapGetters({
            loggedIn: 'auth/loggedIn',
            invalidCredentials: 'auth/invalidCredentials',
            validationErrors: 'auth/errors'
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
        }),

        changePassword() {
            this.$store.dispatch('auth/changePassword', this.user)
        },
        changeDetails() {
            this.$store.dispatch('auth/updateDetails', this.user)
        }
    }
}
</script>

<style lang="scss">
.container {
    height: 100vh;
    width: 100%;
    overflow: auto;
}

.card-title {
    font-weight: 700;
    text-align: center;
    font-size: 25px;
    text-shadow: 0 5px 8px rgb(0,0,0,0.65);
    overflow: hidden;
    margin: 0;
    width: 100%;
}
.settings-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
    background-color: #798394;
    align-items: center;
    flex-direction: column;
}
.form {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.button {
    margin: 15px;
}

</style>
