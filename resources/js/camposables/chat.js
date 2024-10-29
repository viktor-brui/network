import axios from "axios";
import {ref, unref} from "vue";

export default function useChat() {
    const messages = ref([])
    const errors = ref([])

    const token = localStorage.getItem('token')

    const getMessages = async () => {
        await axios.get('/api/messages').then((response) => {
            messages.value = response.data
        })

        return unref(messages)
    }

    const addMessage = async (form) => {
        errors.value = []

        try {
            await axios.post('/api/send', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                unref(messages).push(response.data)
            })
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    return {
        messages,
        errors,
        getMessages,
        addMessage
    }
}
