<template>
    <input type="text" class="input" :value="modelValue" @input="updateInput">
</template>

<script>
export default {
    name: "Main-input",
    props: {
        modelValue: [String, Number]
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style lang="scss">

.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}

</style>
