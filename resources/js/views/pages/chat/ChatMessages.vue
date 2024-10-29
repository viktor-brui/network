<template>
    <div class="messages">
        <div class="messages-content">
            <div class="chat-messages" v-for="message in messages">
                <div class="message" :class="{'justify-end': message.user_id !== user.id}">{{ message.message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import useChat from "../../../camposables/chat"

export default {
    name: "InputMessages",

    data: () => ({
        messages: [],
    }),
    props: {
        user: {
            type: Object,
            default: ''
        }
    },
    async mounted() {
        const {messages, getMessages} = useChat()

        this.messages = await getMessages()
    },
}
</script>

<style lang="scss">

.messages-content {
    overflow: auto;
}
.messages {
    color: white;
    .justify-end {
        justify-content: right;
        float: right !important;
    }
}
</style>
