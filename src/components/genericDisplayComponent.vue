<template>
  <div class="result-display" ref="container">
    <div class="loading-figure" ref="loadingFigure"></div>
    <div class="zIndex">
      <div class="googleAIReply">AI Reply</div>
      <div v-if="componentDisplayType === 'text'" ref="content">
        <div v-html="componentDisplayContent" class="reply-content"></div>
      </div>
      <div v-else-if="componentDisplayType === 'image'">
        <img :src="componentDisplayContent" alt="Generated Image" class="generated-image" />
      </div>
    </div>
    <!-- Add more conditions for different result types -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      componentDisplayType: state => state.displayType,
      componentDisplayContent: state => state.displayContent,
    }),
  },
  methods: {
    adjustHeight() {
      this.$nextTick(() => {
        const contentElement = this.$refs.content;
        const containerElement = this.$refs.container;

        if (contentElement && containerElement) {
          const contentHeight = contentElement.scrollHeight;
          containerElement.style.height = `${Math.min(contentHeight, 300)}px`;
        }
      });
    },
    stopLoading() {
      this.loading = false;
    },
  },
  watch: {
    componentDisplayContent() {
      this.adjustHeight();
      this.stopLoading();
    },
  },
  mounted() {
    this.adjustHeight();
    // Simulate loading time for demo purposes
    setTimeout(this.stopLoading, 3000);
  },
};
</script>

<style scoped>
.result-display {
  border: 3px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  background-color: #1c1c1c;
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
  transition: max-height 0.5s ease-in-out;
  position: relative;
  z-index: 1; /* Ensure the main container has a higher z-index than the loading-figure */
}

/* Custom scrollbar styling */
.result-display::-webkit-scrollbar {
  width: 10px;
}

.result-display::-webkit-scrollbar-track {
  background: #2c3e50;
  border-radius: 10px;
}

.result-display::-webkit-scrollbar-thumb {
  background: linear-gradient(270deg, #00ccff, #91ff00, #00ffea);
  background-size: 200% 200%;
  border-radius: 10px;
  animation: gradientShift 5s linear infinite;
}

.result-display::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(270deg, #00ffea, #91ff00, #00ccff);
}

.googleAIReply {
  background-color: grey;
  font-size: 10px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  color: white;
  margin-bottom: 10px;
  animation: pulsateBounce 10s infinite;
  max-width: 100px;
}

.reply-content {
  font-size: 14px;
  line-height: 1.6;
  color: #ecf0f1;
}

.reply-content h1 {
  color: #e74c3c;
  font-size: 24px;
  margin: 10px 0;
  border-bottom: 2px solid #e74c3c;
  padding-bottom: 5px;
}

.reply-content h2 {
  color: #3498db;
  font-size: 20px;
  margin: 10px 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.reply-content h3 {
  color: #f1c40f;
  font-size: 18px;
  margin: 10px 0;
  border-bottom: 1px solid #f1c40f;
  padding-bottom: 5px;
}

.reply-content h4 {
  color: #9b59b6;
  font-size: 16px;
  margin: 10px 0;
}

.reply-content strong {
  font-weight: bold;
  color: #e74c3c;
}

.reply-content em {
  font-style: italic;
  color: #f1c40f;
}

.reply-content ul {
  padding-left: 20px;
  list-style-type: disc;
  margin: 10px 0;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 5px;
}

.reply-content li {
  margin: 5px 0;
  color: #bdc3c7;
}

p {
  color: #e0e0e0;
  line-height: 1.5;
  margin: 0 0 10px;
}

.generated-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.zIndex {
  position: relative;
  z-index: 1;
}

.loading-figure {
  width: 5px;
  height: 5px;
  background: linear-gradient(270deg, #00ccff, #91ff00, #00ffea);
  background-size: 200% 200%;
  border-radius: 50%;
  position: absolute;
  z-index: 0;
  animation: bounceAround 30s linear infinite, gradientShift 5s linear infinite;
}

@keyframes bounceAround {
  0% {
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
  12.5% {
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
  }
  25% {
    top: 0;
    left: 100%;
    transform: translate(-100%, 0);
  }
  37.5% {
    top: 50%;
    left: 75%;
    transform: translate(-75%, -50%);
  }
  50% {
    top: 100%;
    left: 100%;
    transform: translate(-100%, -100%);
  }
  62.5% {
    top: 75%;
    left: 50%;
    transform: translate(-50%, -75%);
  }
  75% {
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
  }
  87.5% {
    top: 50%;
    left: 25%;
    transform: translate(-25%, -50%);
  }
  100% {
    top: 0;
    left: 0;
    transform: translate(0, 0);
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

@media (max-width: 600px) {
  .result-display {
    padding: 10px;
  }

  .googleAIReply {
    font-size: 8px;
  }
}
</style>
