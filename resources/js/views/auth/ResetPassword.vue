<template>
    <div>Login view</div>
    <div>
        <div class="alert" v-if="invalidCredentials">
            <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
            Invalid Credentials
        </div>
        <ValidationErrors v-if="validationErrors" :errors="validationErrors"></ValidationErrors>
        <div class="reset-page">
            <form action="" class="form">
                <MainInput type="text" placeholder="email" v-model="user.email"/>
                <MainInput type="text" placeholder="new password" v-model="user.password"/>
                <MainInput type="text" placeholder="confirm new password" v-model="user.password_confirmation"/>
                <MainButton type="submit" class="submit" @click.prevent="sendResetPassword">Send email</MainButton>
                <router-link to="/login"><p class="message">Go to login page </p><a href="#" class="link">Sign In</a></router-link>
            </form>
        </div>
    </div>
</template>

<script>
import MainInput from "../../components/UI/MainInput";
import MainButton from "../../components/UI/MainButton";
import { mapActions, mapGetters } from "vuex";
import ValidationErrors from "../../components/UI/ValidationErrors";

export default {
    name: "ResetPassword",
    components: {ValidationErrors, MainButton, MainInput},
    data: () => ({
        user: {
            email: '',
            password: '',
            password_confirmation: '',
        }
    }),
    created() {
        this.checkUserState()
    },
    computed: {
        ...mapGetters({
            invalidCredentials: 'auth/invalidCredentials',
            validationErrors: 'auth/errors'
        })
    },
    methods: {
        ...mapActions({
            checkUserState: 'auth/setLoggedInstate',
            resetPassword: 'auth/resetPassword'
        }),

        sendResetPassword() {
            const token = this.$route.params.token
            this.resetPassword({...this.user, token})
            window.location.replace('/login')
        },

        checkUserState() {
            this.$store.dispatch('auth/setLoggedInstate', this.user)
        }
    },

}
</script>

<style lang="scss">
.reset-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
}
</style>
