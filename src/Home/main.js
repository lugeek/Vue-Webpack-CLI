import Vue from "vue";
import App from "./App.vue";
import './main.css'
import './main2.less'

new Vue({
    el: "#app",
    render: (h) => h(App),
});
/*
new Vue({
  render: function (createElement) {
    return createElement(App);
  },
});
缩写：
new Vue({
  render(createElement) {
    return createElement(App);
  },
});
缩写：
new Vue({
  render: (h) => h(App),
});
*/