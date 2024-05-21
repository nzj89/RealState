<template>
  <div class="letter-zone">
    <div :class="['logo-container', { 'fade-out': loading, 'fade-in': !loading }]">
      <img class="letter" src="../assets/img/N.webp" alt="Z">
    </div>
    <div :class="['loading-container', { 'fade-out': !loading, 'fade-in': loading }]">
      <span class="loading-text">Loading...</span>
      <div class="fancy-loader">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NzArea',
  computed: {
    ...mapState(['loading']),
  },
};
</script>

<style scoped>
.letter-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-right: 1px dashed rgb(146, 146, 146);
  background: linear-gradient(to bottom right, rgb(36, 36, 36) 5%, rgb(0, 0, 0));
  max-width: 100px;
  position: relative; /* Ensure positioning context for absolute elements */
}

.letter {
  flex: 1;
  max-width: 100px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the loading container */
}

.loading-text {
  animation: pulsateBounce 10s infinite;
}

.fancy-loader {
  position: relative;
  width: 30px;
  height: 30px;
  margin-top: 10px;
}

.fancy-loader .circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(270deg, #4c00ff, #0051ff, #00ccff, #91ff00, #00ffea);
  background-size: 200% 200%;
  animation: spin 1.2s linear infinite, gradientShift 5s linear infinite;
  opacity: 0.7;
}

.fancy-loader .circle::before,
.fancy-loader .circle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 4px solid transparent;
  animation: pulse 1.5s ease-in-out infinite;
}

.fancy-loader .circle::before {
  border-top-color: #fff;
  animation-delay: 0.3s;
}

.fancy-loader .circle::after {
  border-bottom-color: #fff;
  animation-delay: 0.6s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
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

@keyframes pulsateBounce {
  0%,
  100% {
    color: #00e1ff;
    transform: scale(1);
    opacity: 1;
  }
  25%,
  75% {
    color: white;
    transform: scale(0.9);
  }
  50% {
    color: rgb(192, 255, 163);
    transform: scale(0.95);
  }
}

.fade-in {
  transition: opacity 0.5s;
  opacity: 1;
  visibility: visible;
}

.fade-out {
  transition: opacity 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
</style>
