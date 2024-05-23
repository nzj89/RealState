<template>
  <div class="mainDiv">
    <div class="content">
      <div v-if="isBetaVersion" class="isBetaVersion_style">
        <label class="websiteLabel" for="urlInput">Enter a Real Estate Website URL:</label>
        <input class="inputArea" v-model="url" type="text" id="urlInput" placeholder="https://example.com" :disabled="loading">
      </div>
      <div class="buttons">
        <button class="submitButton" v-if="isBetaVersion" @click="submitUrl" :disabled="loading">
          <i class="fas fa-paper-plane iconStyle" ></i>
          <span v-if="!loading">Submit</span>
          <span v-else class="spinner"></span>
        </button>
        <button class="loadBienIci" @click="loadBienIci" :disabled="loading">
          <i class="fas fa-home iconStyle" ></i>
          <span v-if="!loading">Load "bienici.com"</span>
          <span v-else class="spinner"></span>
        </button>
      </div>
      <div v-if="!isBetaVersion" class="description">
        This button will browse the Bienici website for listings and gather them below.
      </div>
    </div>
    <button class="toggleButton" @click="toggleVersion">
      <span v-if="isBetaVersion">Prod</span>
      <span v-else>Beta</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      url: '',
      isBetaVersion: false,
    };
  },
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapMutations(['setLoading', 'setPropertyListings', 'setPropertyWarehouse', 'SET_TROUBLESHOOTING_MESSAGE']),
    
    submitUrl() {
      this.setLoading(true);
      this.SET_TROUBLESHOOTING_MESSAGE('Sending URL to backend for processing.');
      this.$axios.post('/process-url', { url: this.url })
        .then(response => {
          const responseData = response.data;
          const listingsData = responseData.listingsArrayFromBackend;
          this.setPropertyListings(listingsData);
          localStorage.setItem('propertyWarehouse', JSON.stringify(listingsData));
          this.setPropertyWarehouse(listingsData);
          this.SET_TROUBLESHOOTING_MESSAGE('URL processed and property listings updated.');
        })
        .catch(error => {
          console.error('Error sending URL to backend:', error);
          this.SET_TROUBLESHOOTING_MESSAGE('Error sending URL to backend.');
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    
    loadBienIci() {
      this.url = 'https://www.bienici.com/recherche/achat/lassay-les-chateaux-53110';
      this.submitUrl();
    },
    
    toggleVersion() {
      this.isBetaVersion = !this.isBetaVersion;
    },
  },
};
</script>

<style scoped>
.mainDiv {
  background-color: rgb(43, 43, 43);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 15px;
  position: relative;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.websiteLabel {
  font-size: 12px;
  margin-right: 5px;
}

.inputArea {
  font-size: 12px;
  padding: 4px;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.12);
}

.buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.submitButton, .loadBienIci {
  font-size: 12px;
  padding: 4px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submitButton:hover:not(:disabled), .loadBienIci:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

.submitButton:disabled, .loadBienIci:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.description {
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}

.toggleButton {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 8px;
  padding: 2px 4px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.toggleButton:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}
.isBetaVersion_style{
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.iconStyle{
  margin-right: 5px;
}
</style>
