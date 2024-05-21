<template>
  <div class="property-listing">
    <div class="property-image-container">
      <img :src="propertyDetails.imageUrl" alt="Property Image" class="property-image" />
    </div>
    <div class="property-details">
      <p><strong>Number of Pictures:</strong> {{ propertyDetails.numPictures }}</p>
      <p v-if="propertyDetails.status" class="status"><strong>Status:</strong> {{ propertyDetails.status }}</p>
      <p><strong>Description:</strong> {{ propertyDetails.description }}</p>
      <p><strong>Location:</strong> {{ propertyDetails.location }}</p>
      <p><strong>Price:</strong> {{ propertyDetails.price }}</p>
      <p><strong>Price per Square Meter:</strong> {{ propertyDetails.pricePerSquareMeter }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: String,
  },
  computed: {
    propertyDetails() {
      const lines = this.property.split('\n');
      return {
        imageUrl: lines[0],
        numPictures: lines[1],
        status: lines[2] === "EXCLUSIVITÉ" ? lines[2] : null,
        description: lines[2] === "EXCLUSIVITÉ" ? lines[3] : lines[2],
        location: lines[2] === "EXCLUSIVITÉ" ? lines[4] : lines[3],
        price: lines[2] === "EXCLUSIVITÉ" ? lines[5] : lines[4],
        pricePerSquareMeter: lines[2] === "EXCLUSIVITÉ" ? lines[6] : lines[5],
      };
    },
  },
};
</script>

<style scoped>
.property-listing {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  background-color: #0a0a0a;
}

.property-image-container {
  flex: 1;
  max-width: 200px;
  margin-left: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
}

.property-image {
  width: 100%;
  height: auto;
  border-right: 1px solid #ddd;
  object-fit: cover;
}

.property-details {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.property-details p {
  margin: 5px 0;
  line-height: 1.5;
}

.property-details .status {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 10px;
}

.property-details strong {
  color: #79bcff;
}

@media (max-width: 600px) {
  .property-listing {
    flex-direction: column;
  }
  .property-image {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
  .property-details {
    padding: 10px;
  }
}
</style>
