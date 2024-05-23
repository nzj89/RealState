<template>
  <div class="result-display">
    <div class="extraButtons frontArea">
      <button class="extraButtonsChild" v-if="propertyWarehouseExists" @click="loadFromWarehouse" :disabled="loading">
        <i class="fas fa-warehouse iconStyle"></i>
        <span v-if="!loading">Load last list from the Warehouse</span>
        <span v-else class="spinner"></span>
      </button>
      <button class="extraButtonsChild" v-if="propertyListings.length > 0" @click="rankPropertiesWithAI" :disabled="loading">
        <i class="fas fa-sort-amount-down iconStyle"></i>
        <span v-if="!loading">Rank Properties with AI</span>
        <span v-else class="spinner"></span>
      </button>
    </div>

    <div class="moving-shape"></div>
    <div class="frontArea">
      <div class="frontArea" v-if="propertyListings.length > 0">
        <PropertyListing class="frontArea" v-for="property in propertyListings" :key="property.id" :property="property" />
      </div>
      <div v-else class="frontArea">
        <p>There is no property list to display.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PropertyListing from "./PropertyListing.vue";

export default {
  components: {
    PropertyListing,
  },
  created() {
    this.checkPropertyWarehouse().then(() => {
      console.log('created propertyWarehouseExists:', this.propertyWarehouseExists);
    });
    window.addEventListener('storage', this.onStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkPropertyWarehouse);
  },
  computed: {
    ...mapState(['loading', 'propertyListings']),
    ...mapGetters(['propertyWarehouseExists']),
  },
  watch: {
    loading(newLoadingState) {
      console.log('Vuex State Change: loading', newLoadingState);
    },
  },
  methods: {
    ...mapActions(['checkPropertyWarehouse']),
    // Method to load property listings from the "warehouse"
    onStorageChange(event) {
      if (event.key === 'propertyWarehouse') {
        this.checkPropertyWarehouse();
      }
    },
    loadFromWarehouse() {
      const storageList = JSON.parse(localStorage.getItem('propertyWarehouse'));
      this.$store.commit('setPropertyListings', storageList);
      this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', 'Property listings loaded from the warehouse.');
      console.log('Property listings loaded from the warehouse:', this.propertyListings);
    },

    // Method to rank properties with AI
    rankPropertiesWithAI() {
      this.$store.commit('setLoading', true);
      this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', 'Sending request to rank properties with AI.');
      console.log('propertyListings we are starting the rank with AI function on front end', this.propertyListings);

      this.$axios.post('/rank-properties', { propertiesList: this.propertyListings })
        .then(response => {
          console.log('Front end received an Axios Response from ranking properties:', response);
          const responseData = response.data;
          const rankedProperties = responseData.rankedProperties;
          this.$store.commit('setDisplayContent', rankedProperties);
          this.$store.commit('setDisplayType', 'text');
          this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', 'Received response from AI ranking.');
        })
        .catch(error => {
          console.error('Error sending request to rank properties with AI:', error);
          this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', 'Error sending request to rank properties with AI.');
        })
        .finally(() => {
          this.$store.commit('setLoading', false);
        });
    },
  }
};
</script>
<style scoped>
.result-display {
  position: relative;
  font-size: 15px;
  padding: 20px;
  background-color: #1c1c1c;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  color: #e0e0e0;
  overflow: hidden;
}

.extraButtons {
  display: flex;
  margin-bottom: 20px;
  margin-left: 40px;
  justify-content: flex-start;
}

.extraButtonsChild {
  font-size: 12px; /* Adjusted font size */
  padding: 8px 12px; /* Adjusted padding */
  margin-right: 10px;
  margin-left: 10px;
  background-color: #007BFF; /* Same color as your other buttons */
  border: none;
  border-radius: 4px; /* Adjusted border radius */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center; /* Center align the content vertically */
}

.extraButtonsChild:hover:not(:disabled) {
  background-color: #0056b3;
}

.extraButtonsChild:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.iconStyle {
  margin-right: 5px; /* Adjusted margin */
  font-size: 14px; /* Adjusted icon size */
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 14px; /* Adjusted spinner size */
  height: 14px; /* Adjusted spinner size */
  animation: spin 1s linear infinite;
}

.moving-shape {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(270deg, #4c00ff, #0051ff, #00ccff, #91ff00, #00ffea);
  background-size: 400% 400%;
  animation: moveShape 20s infinite, gradientShift 10s ease infinite, shapeShift 20s ease infinite;
  z-index: 0;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.frontArea {
  position: relative;
  z-index: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveShape {
  0% {
    left: -10px;
  }
  25% {
    left: 25%;
    animation-timing-function: ease-in-out;
  }
  50% {
    left: 50%;
    animation-timing-function: ease-in;
  }
  75% {
    left: 75%;
    animation-timing-function: ease-out;
  }
  100% {
    left: 100%;
    animation-timing-function: linear;
  }
}
@keyframes shapeShift {
  0% {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
  25% {
    clip-path: polygon(30% 0%, 70% 0%, 100% 40%, 70% 100%, 30% 100%, 0% 60%);
  }
  50% {
    clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  }
  75% {
    clip-path: polygon(35% 0%, 65% 0%, 100% 50%, 65% 100%, 35% 100%, 0% 50%);
  }
  100% {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

p {
  color: #e0e0e0;
  line-height: 1.5;
  margin: 10px 0;
}

@media (max-width: 600px) {
  .result-display {
    padding: 10px;
  }

  .extraButtons {
    flex-direction: column;
  }

  .extraButtonsChild {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
