<template>
    <div class="add-asset-container">
      <h2>Add Tangible Asset</h2>
      <form @submit.prevent="addTangibleAsset">
        <!-- Asset Name -->
        <div>
          <label for="assetName">Asset Name:</label>
          <input id="assetName" v-model="tangibleAsset.assetName" type="text" required />
        </div>
  
        <!-- Estimated Value -->
        <div>
          <label for="estimatedValue">Estimated Value:</label>
          <input id="estimatedValue" v-model.number="tangibleAsset.estimatedValue" type="number" required />
        </div>
  
        <!-- Liquidity -->
        <div>
          <label for="liquidity">Liquidity:</label>
          <select id="liquidity" v-model="tangibleAsset.liquidity" required>
            <option disabled value="">Select liquidity level</option>
            <option value="Cash Equivalent">Cash Equivalent</option>
            <option value="Highly Liquid">Highly Liquid</option>
            <option value="Moderately Liquid">Moderately Liquid</option>
            <option value="Less Liquid">Less Liquid</option>
            <option value="Illiquid">Illiquid</option>
          </select>
        </div>
  
        <!-- Relevant Notes -->
        <div>
          <label for="notes">Relevant Notes:</label>
          <textarea id="notes" v-model="tangibleAsset.notes"></textarea>
        </div>
  
        <button type="submit">Add Asset</button>
      </form>
    </div>
  </template>
  
  <script>
    import { ref } from 'vue';
    import { db } from '../firebase.mjs';
    import { collection, addDoc } from 'firebase/firestore';
    import { useUserStore } from '../stores/userStore';

    export default {
      name: 'AddTangibleAsset',
      setup() {
        const tangibleAsset = ref({
          assetName: '',
          estimatedValue: 0,
          liquidity: '',
          notes: ''
        });

        const userStore = useUserStore();

        const addTangibleAsset = async () => {
          if (userStore.user) {
            try {
              await addDoc(collection(db, "tangibleAssets"), {
                ...tangibleAsset.value,
                userId: userStore.user.uid
              });
              alert("Tangible asset added successfully!");
              tangibleAsset.value = {
                assetName: '',
                estimatedValue: 0,
                liquidity: '',
                notes: ''
              };
            } catch (e) {
              console.error("Error adding tangible asset:", e);
              alert("Error adding tangible asset. Please try again.");
            }
          } else {
            alert("You must be logged in to add a tangible asset.");
          }
        };

        return {
          tangibleAsset,
          addTangibleAsset
        };
      }
    };
  </script>
  
  <style scoped>
  .add-asset-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  </style>
  