<template>
    <div>
        <h1>Hello App!</h1>
        <p>
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/">Go to Home</router-link>
            <router-link to="/about">Go to About</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>
