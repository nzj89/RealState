<template>
  <div class="promptComponent">
    <label class="labelStyle" for="promptInput">Please write a message and we'll send it to Google's AI:</label>
    <input class="inputArea" v-model="prompt" id="promptInput" type="text" placeholder="Write a message here pls..." :disabled="loading">
    <div class="buttons">
      <button class="sendButton" @click="sendMessage" :disabled="loading">
        <span v-if="!loading"><i class="fas fa-robot roboIcon"></i> Send message</span>
        <span v-else class="spinner"></span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      prompt: '', // Default prompt
    };
  },
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapMutations(['setLoading', 'setDisplayContent', 'setDisplayType', 'SET_TROUBLESHOOTING_MESSAGE']),
    
    sendMessage() {
      this.setLoading(true);
      this.SET_TROUBLESHOOTING_MESSAGE('Sending request to backend...');
      axios.post('http://127.0.0.1:8000/generate-story', { prompt: this.prompt })
        .then(response => {
          console.log('Front end received an Axios Response:', response);
          const responseData = response.data;
          console.log('This is the data part from the response: Response Data:', responseData);
          this.$store.commit('setDisplayContent', responseData.generated_story);
          this.$store.commit('setDisplayType', 'text'); // Assuming the response is text
          this.SET_TROUBLESHOOTING_MESSAGE('Received response from backend.');
        })
        .catch(error => {
          console.error('Error sending request to backend:', error);
          this.SET_TROUBLESHOOTING_MESSAGE('Error sending request to backend.');
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
};
</script>

<style scoped>
.promptComponent {
  background-color: rgb(43, 43, 43);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 12px;
  justify-content: space-between;
}

.labelStyle {
  font-size: 12px;
  margin-bottom: 4px;
}

.inputArea {
  font-size: 10px;
  padding: 4px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.12);
}

.buttons {
  display: flex;
  justify-content: center;
}

.sendButton {
  font-size: 10px;
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

.sendButton:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

.sendButton:disabled {
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

.roboIcon {
  margin-right: 2px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
