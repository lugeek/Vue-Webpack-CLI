<template>
    <div class="example">{{ msg }} <img :src="url" /></div>
</template>

<script>
import logo from "./assets/logo.png";
import getData from "./api";

export default {
    data() {
        return {
            msg: "Hello vue!",
            url: logo,
        };
    },
    methods: {
        async fetchData() {
            const data = await getData();
            this.msg = data;
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style lang="less" scoped>
@bb: 100rem;
.example {
    color: red;
}
.style-less {
    height: 100/@bb;
}
</style>
