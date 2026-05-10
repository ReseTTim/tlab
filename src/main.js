import { createApp } from 'vue';

// plugins
import { createPinia } from 'pinia';
import { i18n } from '@/plugins/i18n';
import { router } from '@/router';

import 'open-props/style';
import "open-props/palette";
import "open-props/oklch-hues";

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount('#app');
