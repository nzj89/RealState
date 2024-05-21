// src/store.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    loading: false,
    propertyListings: [],
    propertyWarehouse: null,
    displayContent: null,
    displayType: null,
    origins: [], // Initialize origins as an empty array
    vuejsHostIP: '',
    fastApiHostIp: '',
    troubleshootingMessage: 'Waiting for user input.'
  },
  mutations: {
    SET_TROUBLESHOOTING_MESSAGE(state, message) {
      state.troubleshootingMessage = message
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setPropertyListings(state, pList) {
      state.propertyListings = pList;
    },
    setPropertyWarehouse(state, propertyWarehouse) {
      state.propertyWarehouse = propertyWarehouse;
    },
    setDisplayContent(state, content) {
      //console.log('Setting display content:', content);
      state.displayContent = content;
    },
    setDisplayType(state, type) {
      //console.log('Setting display type:', type);
      state.displayType = type || 'text';
    },
    setDisplayContent2(state, content) {
      //console.log('Setting display content:', content);
      state.displayContent2 = content;
    },
    setDisplayType2(state, type) {
      //console.log('Setting display type:', type);
      state.displayType2 = type || 'text';
    },
    setOrigins(state, origins) {
      state.origins = origins; // Set the origins state with the received data
    },
    addOrigin(state, newOrigin) {
      state.origins.push(newOrigin);
    },
    setVuejsHostIP(state, vuejsHostIP) {
      state.vuejsHostIP = vuejsHostIP;
    },
    setFastApiHostIp(state, fastApiHostIp) {
      state.fastApiHostIp = fastApiHostIp;
    }
  },
  actions: {
    fetchOrigins({ commit }) {
      return axios.get('http://localhost:8000/allowed-origins')
        .then(response => {
          commit('setOrigins', response.data.allowed_origins); // Call the mutation to set origins
        })
        .catch(error => {
          console.error('Error fetching allowed origins:', error);
        });
    },
    updateVuejsHostIP({ commit }, vuejsHostIP) {
      commit('setVuejsHostIP', vuejsHostIP);
    },
    checkPropertyWarehouse({ commit }) {
      const propertyWarehouse = localStorage.getItem('propertyWarehouse');
      const propertyWHExists = propertyWarehouse !== null && propertyWarehouse !== 'null' && propertyWarehouse !== undefined;
      console.log('Does property warehouse exist?', propertyWHExists);
      if (propertyWHExists) {
        commit('setPropertyWarehouse', propertyWarehouse);
      } else {
        commit('setPropertyWarehouse', null);
      }
    },
    updateTroubleshootingMessage({ commit }, message) {
      commit('SET_TROUBLESHOOTING_MESSAGE', message)
    }
  },
getters: {
    propertyWarehouseExists: state => state.propertyWarehouse !== null,
  },  
});
