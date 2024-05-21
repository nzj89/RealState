<template>
  <div class="app">
    <MenuBar />
    <div class="controlArea">
        <NzArea class="nzArea-style" />
        <ScrapeReviewsComponent class="scrapeReviewsComponent-style" />
        <PromptComponent class="PromptComponent-style" />
        <TroubleshootingZone class="tsZone"/>
        <NzArea2 class="nzArea-style" />
    </div>
    <div class="displayArea">
      <genericDisplayComponent class="resultDisplay-style"/>
      <propertiesDisplayComponent class="resultDisplay2-style"/>
    </div>
  </div>
</template>

<script>
import NzArea from './components/NzArea.vue'
import NzArea2 from './components/NzArea2.vue'
import MenuBar from './components/MenuBar.vue'
import PromptComponent from './components/PromptComponent.vue';
import ScrapeReviewsComponent from './components/ScrapeReviewsComponent.vue';
import genericDisplayComponent from './components/genericDisplayComponent.vue';
import propertiesDisplayComponent from './components/propertiesDisplayComponent.vue';
import TroubleshootingZone from './components/TroubleshootingZone.vue'
import { mapState, mapActions } from 'vuex';


export default {
  name: 'App',
  components: {
    NzArea,
    NzArea2,
    MenuBar,
    PromptComponent,
    ScrapeReviewsComponent,
    genericDisplayComponent,
    propertiesDisplayComponent,
    TroubleshootingZone
  },
  data() {
    return {
      originsCopy: [],
      showingDevTools: false
    };
  },
  methods: {
    // Map fetchOrigins action from Vuex to local component methods
    ...mapActions(['fetchOrigins']),
    showDevTools() {
      this.showingDevTools = !this.showingDevTools;
    }
  },
  computed: {
    // Map origins state from Vuex to local component state
    ...mapState(['displayType', 'displayContent', 'origins']),
  },
  watch: {
    displayType(newDisplayType) {
      console.log('Vuex State Change: displayType', newDisplayType);
    },
    displayContent(newDisplayContent) {
      console.log('Vuex State Change: displayContent', newDisplayContent);
    },
  },
  created() {
    // Dispatch the fetchOrigins action when the component is created
    this.fetchOrigins()
      .then(() => {
        console.log('Origins fetched successfully:', this.origins);
      })
      .catch(error => {
        console.error('Error fetching origins:', error);
      });
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #242424;
  color: #ffffff;
}

/* Custom scrollbar styling for the entire website */
body::-webkit-scrollbar,
.resultDisplay-style::-webkit-scrollbar,
.resultDisplay2-style::-webkit-scrollbar,
.controlArea::-webkit-scrollbar,
.displayArea::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track,
.resultDisplay-style::-webkit-scrollbar-track,
.resultDisplay2-style::-webkit-scrollbar-track,
.controlArea::-webkit-scrollbar-track,
.displayArea::-webkit-scrollbar-track {
  background: #2c3e50;
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb,
.resultDisplay-style::-webkit-scrollbar-thumb,
.resultDisplay2-style::-webkit-scrollbar-thumb,
.controlArea::-webkit-scrollbar-thumb,
.displayArea::-webkit-scrollbar-thumb {
  background: linear-gradient(270deg, #00ccff, #91ff00, #00ffea);
  background-size: 200% 200%;
  border-radius: 10px;
  animation: gradientShift 5s linear infinite;
}

body::-webkit-scrollbar-thumb:hover,
.resultDisplay-style::-webkit-scrollbar-thumb:hover,
.resultDisplay2-style::-webkit-scrollbar-thumb:hover,
.controlArea::-webkit-scrollbar-thumb:hover,
.displayArea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(270deg, #00ffea, #91ff00, #00ccff);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #ffffff;
  background-color: #242424;
  overflow: hidden; /* Prevent scrollbar from showing on the body */
  background-color: #242424;
  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%), 
                    linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%);
  background-size: 20px 20px;
}

.controlArea {
  display: flex;
  height: 40%;
  max-height: 100px;
  border: solid 2px rgb(0, 187, 187);


}

.nzArea-style, .nzArea-style2 {
  flex: 0 0 20%;
}

.scrapeReviewsComponent-style {
  flex: 3;
  max-width: 350px;
}

.PromptComponent-style {
  border-right: solid 2px rgb(146, 146, 146);
  border-left: solid 2px rgb(146, 146, 146);
  flex: 1;
  max-width: 300px;
}

.displayArea {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: solid 2px rgb(0, 187, 187);
  border-top: 0px;
  overflow-y: auto; /* Allow scrolling for the displayArea */
}

.resultDisplay-style {
  background-color: rgb(41, 41, 41);
  min-height: 100px;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: max-height 0.5s ease-in-out;
}

.resultDisplay2-style {
  border-top: 1px solid white;
  background-color: rgb(26, 26, 26);
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.tsZone{
  flex: 1;
}

/* Keyframes for gradient shift animation */
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

/* Keyframes for pulsate bounce animation */
@keyframes pulsateBounce {
  0%, 100% {
    color: #00e1ff;
    transform: scale(1);
    opacity: 1;
  }
  25%, 75% {
    color: white;
    transform: scale(0.9);
  }
  50% {
    color: rgb(192, 255, 163);
    transform: scale(0.95);
  }
}

@media (max-width: 600px) {
  .result-display {
    padding: 10px;
  }
  .googleAIReply {
    font-size: 8px;
  }
}
</style>
