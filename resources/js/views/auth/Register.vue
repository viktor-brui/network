<template>
    <div>Register view</div>
    <div>
        <ValidationErrors v-if="validationErrors" :errors="validationErrors"></ValidationErrors>
        <div class="register-page">
            <form action="" class="form">
                <MainInput type="text" placeholder="name" v-model="user.name"/>
                <MainInput type="text" placeholder="email" v-model="user.email"/>
                <MainInput type="text" placeholder="password" v-model="user.password"/>
                <MainInput type="text" placeholder="confirm password" v-model="user.password_confirmation"/>
                <MainButton type="submit" class="submit" @click.prevent="register">Registration</MainButton>
                <router-link to="/login"><p class="message">Already registered? </p><a href="#" class="link">Sign In</a></router-link>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainInput from "../../components/UI/MainInput";
import MainButton from "../../components/UI/MainButton";
import ValidationErrors from "../../components/UI/ValidationErrors";
export default {
    name: "Register",
    components: {MainButton, MainInput, ValidationErrors},
    data: () => ({
        user: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }),
    computed: {
        ...mapGetters({
            validationErrors: 'auth/errors'
        })
    },
    methods: {
        register() {
            this.$store.dispatch('auth/registerUser', this.user)
        }
    }
}
</script>

<style scoped lang="scss">
.register-page {
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
</style>
