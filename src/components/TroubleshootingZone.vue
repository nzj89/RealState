<template>
  <div class="troubleshooting-zone">
    <div class="system-message-tag">System Messages</div>
    <div v-if="troubleshootingMessage" class="message-content" v-html="troubleshootingMessage"></div>
  </div>
</template>

<script>
export default {
  name: 'TroubleshootingZone',
  computed: {
    troubleshootingMessage() {
      return this.$store.state.troubleshootingMessage;
    }
  }
}
</script>

<style scoped>
.troubleshooting-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(45deg, #090916, #0f0f3857, #1c1c34, #00001862);
  background-size: 400% 400%;
  border: 2px solid;
  border-image: linear-gradient(45deg, #2c2c54, #24243e, #1c1c34, #0c0c24);
  border-image-slice: 1;
  border-radius: 10px;
  margin: 4px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: gradientAnimation 15s ease infinite, borderAnimation 15s ease infinite;
}

.system-message-tag {
  background-color: #333333;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  margin-bottom: 10px;
  animation: pulsateBounce 20s infinite;
}

.message-content {
  font-size: 12px;
  text-align: center;
  line-height: 1.6;
  color: #ecf0f1;
  z-index: 1;
}

@keyframes pulsateBounce {
  0%, 100% {
    color: #00e1ff;
    transform: scale(1);
    opacity: 1;
  }
  25%, 75% {
    color: white;
    transform: scale(0.95);
  }
  50% {
    color: rgb(192, 255, 163);
    transform: scale(0.97);
  }
}

@keyframes gradientAnimation {
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

@keyframes borderAnimation {
  0% {
    border-image-source: linear-gradient(45deg, #6effc3, #24243e, #1c1c34, #0c0c24);
  }
  25% {
    border-image-source: linear-gradient(45deg, #0c0c24, #28dfff, #24243e, #2c2c54);
  }
  50% {
    border-image-source: linear-gradient(45deg, #24243e, #1c1c34, #2848ff, #28dfff);
  }
  75% {
    border-image-source: linear-gradient(45deg, #0c0c24, #28dfff, #24243e, #2c2c54);
  }
  100% {
    border-image-source: linear-gradient(45deg, #67ffd9, #24243e, #1c1c34, #0c0c24);
  }


}
</style>
