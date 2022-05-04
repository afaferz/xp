import { createApp } from 'vue'
import { store } from './store'
import router from './router/router'
import axios from 'axios'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$filters = {
    formatDate(dateInMs: number) {
        if (!dateInMs) return
        const dateObj = new Date(dateInMs)
        const datePtBr = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(dateObj)
        return datePtBr
    }
}

app.use(store)
app.use(router)
app.mount('#app')
