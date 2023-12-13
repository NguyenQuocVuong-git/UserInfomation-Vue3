import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store/store';
import router from './routes/router';

const app = createApp(App);

app.use(vuetify);
app.use(store);
app.use(router);

loadFonts();

app.mount('#app');
