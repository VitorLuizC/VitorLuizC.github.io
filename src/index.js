import Vue from 'vue';
import App from './App.vue';

const render = λ => λ(App);

const app = new Vue({ render });

document.addEventListener('DOMContentLoaded', () => app.$mount('#app'));
