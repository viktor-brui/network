<template>
    <div>
        <input v-model="form.message" type="text" class="message-input" placeholder="Text message..." @keyup.enter="sendMessage"/>
        <button @click.prevent="sendMessage" type="submit" class="message-submit">Send</button>
    </div>
</template>

<script>

import useChat from "../../../camposables/chat";
import {mapActions} from "vuex";

export default {
    name: "ChatForm",
    data: () => ({
        form: {
            message: '',
            userId: ''
        },
        user: {}
    }),
    props: {
      userId: {
          type: Object,
          required: true
      }
    },
    // created() {
    //     this.$store.dispatch('auth/currentUser')
    //     this.checkUserState()
    //
    // },
    methods: {
        async sendMessage() {
            this.form.userId = this.userId
            await useChat().addMessage(this.form)
            this.form.message = ''
        },
        // ...mapActions({
        //     logout: "auth/logout",
        //     checkUserState: 'auth/setLoggedInstate'
        // }),
    }
}
</script>

<style>

</style>
