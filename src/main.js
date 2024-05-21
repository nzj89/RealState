import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import store from './store';

const app = createApp(App);

app.config.productionTip = false;

app.use(store);

// Add this before the axios instance
axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

// Retrieve host IP address upon Vue.js app startup.
const vuejsHostIP = window.location.hostname
// Save it in the Store in case we need it.
store.dispatch('updateVuejsHostIP', vuejsHostIP);
console.log("Vue.js Host IP:", store.state.vuejsHostIP)
// Send it to the FastAPI.
const fullURL = `http://${vuejsHostIP}:8080`;
axios.post('http://127.0.0.1:8000/add-ip', null, { params: { ip: fullURL } })
  .then(response => {
    console.log('Response from backend after we sent our Vue JS Host IP:', response.data);
    store.commit('setFastApiHostIp', response.data.fastApiHostIp);
    console.log("Fast API Host IP:", store.state.fastApiHostIp)
    // Initialize axios before setting defaults
    const instance = axios.create({
      baseURL: `http://${store.state.fastApiHostIp}:8000/`,
    });
    app.config.globalProperties.$axios = instance;
    app.mount('#app');
  })
  .catch(error => {
    console.error('Error adding IP to backend:', error);
  });



// npm run serve