<template>
  <div class="randomNumberArea-style">
    <button class="rnButton-style" @click="getRandomNumber">Get Random Number</button>
    <div v-if="randomNumber !== null" class="randomNumber-style" >
      <div>{{ randomNumber }}</div>
    </div>
    <div v-else class="pending-style">
      <div class="spinIcon">
        <i class="fas fa-spinner fa-spin"></i> <!-- Font Awesome spinner icon for pending state -->
      </div>
      <div>Pending...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      randomNumber: null,
    };
  },
  methods: {
    getRandomNumber() {
      console.log('Sending request to backend...');
      axios.post('http://localhost:8000/random-number')
        .then(response => {
          console.log('Front end received an Axios Response:', response);
          const responseData = response.data;
          this.randomNumber = responseData;
          // Check the structure of responseData to see where 'listingsArrayFromBackend' is located
          console.log('This is the data part from the response: Response Data:', responseData);
        })
        .catch(error => {
          console.error('Error sending request to backend:', error);
        })
    },
  },
};
</script>

<style scoped>
.randomNumberArea-style {
  display: flex;
  flex-direction: column;
  background-color: rgb(43, 43, 43);
  color: #fff;
}
.rnButton-style {
  font-size: 10px;
  border: 1px solid rgb(134, 134, 134);
  border-radius: 3px;
  margin: 3px;
  flex: 1;
}
/* Encountered a weird interaction where the style renders even if rn is null.*/
.randomNumber-style{
  flex: 2;
  display: flex;
  font-size: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(194, 194, 194);
}
.pending-style {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.spinIcon {
  font-size: 15px;
  margin: 2px;
}
</style>