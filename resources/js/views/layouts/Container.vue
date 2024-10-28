<template>
    <h1 class="container"> View-Router</h1>
    <main-button>login up</main-button>
    <main-input></main-input>
</template>

<script>
import MainButton from "../../components/UI/MainButton";
import MainInput from "../../components/UI/MainInput";
export default {
    name: "Container",
    components: {
        MainButton,
        MainInput
    }
}
</script>

<style scoped lang="scss">

.container{
    max-width: 120rem;
    margin: 8rem auto;
    background-color: var(--color-gray-light);
    box-shadow: var(--shadow-dark);
    min-height: 50rem;

    @media only screen and (max-width: 1400px) {
        margin: 0;
        max-width: 100%;
        width: 100%;

    }
}

</style>
