<template>
    <div>Login view</div>
    <div>
        <div class="alert" v-if="invalidCredentials">
            <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
            Invalid Credentials
        </div>
        <ValidationErrors v-if="validationErrors" :errors="validationErrors"></ValidationErrors>
        <div class="forgot-page">
            <form action="" class="form">
                <MainInput type="text" placeholder="email" v-model="user.email"/>
                <MainButton type="submit" class="submit" @click.prevent="sendForgotPassword">Send email</MainButton>
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
    name: "ForgotPassword",
    components: {ValidationErrors, MainButton, MainInput},
    data: () => ({
        user: {
            email: '',
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
           forgotPassword: 'auth/forgotPassword'
        }),
        sendForgotPassword() {
            this.$store.dispatch('auth/forgotPassword', this.user)
        },

        checkUserState() {
            this.$store.dispatch('auth/setLoggedInstate', this.user)
        }
    },

}
</script>

<style scoped lang="scss">
.forgot-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
}
.form {
    position: relative;
    z-index: 1;
    background-color: #2e3442;
    background-size: cover;
    background-position: center;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), 0 5px 0 rgba(0, 0, 0, 0.2);
}
.submit {
    margin-top: 15px;
}
.form .input {
    font-family: "Roboto", san-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    box-sizing: border-box;
    font-size: 14px;
}
.form .message {
    margin: 15px;
    color: #b3b3b3;
    font-size: 12px;
    text-decoration: none;

}
.form .link {
    color: #c69963;
    text-decoration: none;
}

.alert {
    padding: 20px;
    background-color: #f44336;
    margin-bottom: 15px;
    color: white;
}
.close-btn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}
.close-btn:hover {
    color: black;
}


</style>
