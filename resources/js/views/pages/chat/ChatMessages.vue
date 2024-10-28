<template>
    <div class="messages">
        <div class="messages-content">
            <div class="chat-messages" v-for="message in messages">
                <div class="message" :class="{'justify-end': message.id !== user.id}">{{ message.message }}</div>
<!--                <div class="message" >{{ user.id }}</div>-->
            </div>
        </div>
    </div>
</template>

<script>
// :v-if="message.user_id != user.id"
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
        // await getMessages()

        this.messages = await getMessages()
        console.log('123', this.messages)
    },
}
</script>

<style lang="scss">

.messages-content {
    overflow: auto;
}
.messages {
    color: white;
}
</style>
