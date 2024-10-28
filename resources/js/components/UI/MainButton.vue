<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Main-button"
}
</script>

<style lang="scss">

.btn {
    background-color: var(--color-primary-light);
    color: #ffffff;
    border-radius: 10px;
    font-family: 'Josefin Sans', san-serif;
    font-size: 1.5rem;
    text-transform: uppercase;
    padding: 1.8rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--color-primary-dark);
    }
}

</style>
