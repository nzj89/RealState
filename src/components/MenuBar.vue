<template>
  <div class="menu">
    <div class="main-item item-hover" @click="toggleDescription">
      <i class="fas fa-user iconClass"></i> Nicolas Zamorano
      <div class="moving-figure"></div>
    </div>
    <div class="menu-item item-hover" @click="toggleRealEstateApp">
      <i class="fas fa-building iconClass"></i> Real Estate App
    </div>
    <div class="menu-item item-hover2" @click="toggleAbout">
      <i class="fas fa-info-circle iconClass"></i> About
    </div>
    <div class="menu-item item-hover2" @click="openLinkedIn">
      <i class="fab fa-linkedin iconClass"></i> LinkedIn
    </div>


    <div class="item-hover hamburger" @click="toggleMenu">
      <i class="fas fa-bars iconClass"></i>
    </div>
    <transition name="slide-fade">
      <div v-if="menuVisible" class="expanded-menu">
        <div v-if="!showDevToolsMenu">
          <div class="dropdown-item" @click="showDevTools">
            <i class="fas fa-tools iconClass"></i> Dev Tools
          </div>
        </div>
        <div v-else>
          <div class="dropdown-item" @click="showMainMenu">
            <i class="fas fa-arrow-left iconClass"></i> Back
          </div>
          <div class="dropdown-item" @click="getBackendIP">
            <i class="fas fa-server iconClass"></i> Get Backend IP
          </div>
          <div class="dropdown-item" @click="getRandomNumber">
            <i class="fas fa-random iconClass"></i> Get Random Number
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal for Nicolas Zamorano description -->
    <transition name="modal">
      <div class="modal-mask" v-if="showDescription">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h2>Nicolas Zamorano</h2>
    
            <p>
              I am Nicolas Zamorano, a computer scientist with a degree from The UPMC in Paris. Over the past 3.5 years at IDEXX, I have worked in the order department for 3 years and in technical support for 6 months. My experience includes managing processes, resolving technical issues, and providing excellent customer service.
            </p>
            <p>
              Currently, I am developing this website to improve my programming skills and showcase my abilities in web development, backend integration, and AI implementation. I have been leveraging AI tools extensively in this project, which has significantly helped me build and refine the site.
            </p>
            <p>
              I am proficient in several technologies including FastAPI, Vue.js, CSS, Python, and Selenium. While I am not a seasoned expert, I am dedicated to learning and growing in the field of computer science. My colleagues appreciate my strong work ethic and ability to learn quickly. I am eager to contribute to innovative projects and explore new opportunities in the industry.
            </p><button @click="toggleDescription">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal for About -->
    <transition name="modal">
      <div class="modal-mask" v-if="showAbout">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h2>About This Website</h2>
            <p>
              I used FastAPI for the backend and Vue.js for the frontend. This website integrates various technologies, including CSS, Python Selenium for web scraping, and Google AI API for intelligent features. This project has consumed a significant amount of my free time and effort, aiming to deliver a clean, functional, and impressive website.
            </p>
            <p>
              This project has allowed me to refine my skills in web development, backend integration, and artificial intelligence implementation. I am excited to continue developing and improving this website, leveraging modern technologies to create innovative solutions.
            </p>
            <button @click="toggleAbout">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal for Real Estate App -->
    <transition name="modal">
      <div class="modal-mask" v-if="showRealEstateApp">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h2>About the Real Estate App</h2>
            <p>
              This website currently allows you to open a specific real estate website on the backend, scrape listings with Selenium, and update the listings in reactive Vue.js components. You can rank the properties by sending an array and a prebuilt prompt to the Google AI API or chat directly with Google AI API.
            </p>
            <p>
              Future development includes integrating an SQL database to refine my SQL skills, which were acquired at UPMC. This is the plan for the upcoming quarters. I aim to enhance the functionality further and make it a comprehensive tool for real estate analysis.
            </p>
            <button @click="toggleRealEstateApp">Close</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'MenuBar',
  data() {
    return {
      menuVisible: false,
      showDevToolsMenu: false,
      showDescription: false,
      showAbout: false,
      showRealEstateApp: false,
    };
  },
  created() {
    const { appContext } = getCurrentInstance();
    console.log('BaseURL:', appContext.config.globalProperties.$axios.defaults.baseURL);
  },
  computed: {
    ...mapState(['troubleshootingMessage']),
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    showDevTools() {
      this.showDevToolsMenu = true;
    },
    showMainMenu() {
      this.showDevToolsMenu = false;
    },
    getBackendIP() {
      this.$axios.get('/current-ip')
        .then(response => {
          const currentIp = response.data.ip;
          const message = `This is the IP of the backend running the Python scripts: ${currentIp}`;
          this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', message);
          this.$store.commit('setFastApiHostIp', `http://${currentIp}:8080`);
          console.log('Updated the Fast API IP:', this.$store.state.fastApiHostIp);
        })
        .catch(error => {
          console.error('Error getting current IP:', error);
        });
      this.menuVisible = false;
    },
    getRandomNumber() {
      console.log('Sending request to backend...');
      this.$axios.post('/random-number')
        .then(response => {
          console.log('Front end received an Axios Response:', response);
          const responseData = response.data;
          const message = `This is just a random number generated with Python to test Axios: ${responseData}`;
          this.$store.commit('SET_TROUBLESHOOTING_MESSAGE', message);
          console.log('This is the data part from the response: Response Data:', responseData);
        })
        .catch(error => {
          console.error('Error sending request to backend:', error);
        });
      this.menuVisible = false;
    },
    openLinkedIn() {
      window.open('https://www.linkedin.com/in/nzj89/', '_blank');
    },
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    toggleAbout() {
      this.showAbout = !this.showAbout;
    },
    toggleRealEstateApp() {
      this.showRealEstateApp = !this.showRealEstateApp;
    },
  }
}
</script>


<style scoped>
.menu {
  font-size: 10px;
  display: flex;
  height: 30px;
  background-color: #333;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgb(0, 187, 187);
  border-bottom: 0px;
  border-radius: 8px 8px 0 0;
  position: relative;
  /* Added for positioning the expanded menu */
}

.main-item {
  flex: 3;
  /* Make Nicolas Zamorano take up more space */
  padding: 10px;
  padding-left: 20px;
  position: relative;
  overflow: hidden;
  border-left: 2px solid rgba(0, 187, 187, 0.5);
  border-radius: 5px 5px 0 0;
  background: linear-gradient(45deg, #222, #333);
  justify-content: center;
  align-items: center;
}

.menu-item {
  flex: 1;
  max-width: 95px;
  border-left: 2px solid rgba(0, 187, 187, 0.5);
  text-overflow: ellipsis;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-hover:hover {
  background-color: rgba(36, 36, 70, 0.8);
  color: #91ff00;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.7);
  z-index: 1;
}

.item-hover2:hover {
  background-color: rgba(0, 51, 102, 0.8);
  color: #00ccff;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.7);
  z-index: 1;
}

.iconClass {
  margin-right: 8px;
}

.hamburger {
  z-index: 2;
  /* Ensure it overlays other content */
  background-color: #333;
  /* Ensure the background matches the expanded menu */
  border-left: 2px solid rgba(0, 187, 187, 0.5);
  /* Ensure the border matches */
  display: flex;
  justify-content: center;
  /* Center the content horizontally */
  align-items: center;
  /* Center the content vertically */
  min-width: 100px;
  max-width: 100px;
}

.hamburger:hover {
  background-color: rgba(36, 36, 70, 0.8);
  color: #91ff00;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.7);
  z-index: 1;
}

.expanded-menu {
  position: absolute;
  top: 100%;
  left: auto;
  right: 0%;
  background-color: #333;
  border: solid 2px rgb(0, 187, 187);
  border-left: 2px solid rgba(0, 187, 187, 0.5);
  border-top: 0px;
  border-right: 0px;
  border-radius: 0px 0px 0px 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  min-width: 100px;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  animation: expand 0.3s ease-in-out;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: rgba(36, 36, 70, 0.8);
  color: #91ff00;
}

@keyframes expand {
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  100% {
    transform: scaleY(1);
    transform-origin: top;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.moving-figure {
  position: absolute;
  top: 50%;
  left: 150px;
  width: 50px;
  height: 50px;
  background: linear-gradient(270deg, #4c00ff, #0051ff, #00ccff, #91ff00, #00ffea);
  background-size: 400% 400%;
  animation: gradientShift 5s linear infinite, moveFigure 10s linear infinite;
  transform: translateY(-50%);
  opacity: 0.6;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
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

@keyframes moveFigure {
  0% {
    left: 150px;
    transform: translateY(-50%) rotate(0deg);
  }
  50% {
    left: calc(100% - 50px);
    transform: translateY(-50%) rotate(180deg);
  }
  100% {
    left: 150px;
    transform: translateY(-50%) rotate(360deg);
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  text-align: left;
}

.modal-container h3,
.modal-container h2 {
  margin-top: 0;
  color: #333;
}

.modal-container p {
  margin: 15px 0;
  color: #666;
}

.modal-container button {
  background-color: #007BFF;
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.modal-container button:hover {
  background-color: #0056b3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
