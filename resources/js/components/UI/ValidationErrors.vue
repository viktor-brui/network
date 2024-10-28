<template>
    <div>
        <ul>
            <li class="alert" v-for="(value, index) in validationErrors" :key="index">
                <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ValidationErrors",
    props: ['errors'],
    computed: {
        validationErrors() {
            let errors = Object.values(this.errors)
            errors = errors.flat()

            return errors
        },
    }
}
</script>

<style scoped lang="scss">
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
