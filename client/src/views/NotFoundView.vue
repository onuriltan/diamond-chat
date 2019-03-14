<template>
    <div class="container">
        <div class="container__notfound">
            <div class="container__notfound__statement">
                NOT FOUND IN THIS UNIVERSE, MAYBE IN ANOTHER DIMENSION?
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFoundView"
    }
</script>

<style scoped lang="scss">
    .container__notfound {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(50vh);

        &__statement {
            text-align: center;
            font-size: 32px;
            color: white;
            font-weight: bold;
        }
    }

</style>
