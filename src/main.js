import { createApp } from 'vue';
import App from './App.vue';
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
const vuejsHostIP = window.location.hostname;
// Save it in the Store in case we need it.
store.dispatch('updateVuejsHostIP', vuejsHostIP);
console.log("Vue.js Host IP:", store.state.vuejsHostIP);

// Send it to the FastAPI.
// const fullURL = `http://${vuejsHostIP}:8080`;
// axios.post('http://127.0.0.1:8000/add-ip', null, { params: { ip: fullURL } })
//   .then(response => {
//     console.log('Response from backend after we sent our Vue JS Host IP:', response.data);
//     store.commit('setFastApiHostIp', response.data.fastApiHostIp);
//     console.log("Fast API Host IP:", store.state.fastApiHostIp);
//     // Initialize axios before setting defaults
//     const instance = axios.create({
//       baseURL: `http://${store.state.fastApiHostIp}:8000/`,
//     });
//     app.config.globalProperties.$axios = instance;
//     app.mount('#app');
//   })
//   .catch(error => {
//     console.error('Error adding IP to backend:', error);
//   });

// Use this for production with Render
const renderBackendURL = 'https://fastapi-backend4.onrender.com';
const instance = axios.create({
  baseURL: renderBackendURL,
});
app.config.globalProperties.$axios = instance;
app.mount('#app');

// Uncomment the lines below for local development
// const instance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/',
// });
// app.config.globalProperties.$axios = instance;
// app.mount('#app');

/*

Explanation:
Interceptors: These lines are used to log requests and responses for debugging purposes.
Retrieve Host IP Address: This part retrieves and logs the host IP address of the Vue.js app.
Local Testing Code: The commented-out block includes the code for sending the local IP to the FastAPI backend and configuring Axios for local development. You can uncomment these lines when you want to test locally.
Production Configuration: The code block for production configures Axios to use the Render backend URL and sets up the global Axios instance for your Vue.js application.
You can switch between local development and production by commenting/uncommenting the respective blocks of code. This approach allows you to maintain both configurations easily.
*/
