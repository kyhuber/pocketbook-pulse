<template>
    <div class="user-profile">
      <h2>User Profile</h2>
      <div class="user-info">
        <div class="info-item">
          <label for="firstName">First Name:</label>
          <div v-if="editing">
            <input
              type="text"
              id="firstName"
              v-model="user.firstName"
              @input="updateUserInfo"
            />
          </div>
          <div v-else>{{ user.firstName }}</div>
        </div>
        <div class="info-item">
          <label for="lastName">Last Name:</label>
          <div v-if="editing">
            <input
              type="text"
              id="lastName"
              v-model="user.lastName"
              @input="updateUserInfo"
            />
          </div>
          <div v-else>{{ user.lastName }}</div>
        </div>
        <div class="info-item">
          <label for="age">Age:</label>
          <div v-if="editing">
            <input
              type="number"
              id="age"
              v-model="user.age"
              @input="updateUserInfo"
            />
          </div>
          <div v-else>{{ user.age }}</div>
        </div>
        <div class="info-item">
          <label for="location">Location:</label>
          <div v-if="editing">
            <input
              type="text"
              id="location"
              v-model="user.location"
              @input="updateUserInfo"
            />
          </div>
          <div v-else>{{ user.location }}</div>
        </div>
      </div>
      <div class="edit-button">
        <button @click="toggleEditing">{{ editing ? 'Save' : 'Edit' }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object, // Pass the user object with firstName, lastName, age, and location properties
    },
    data() {
      return {
        editing: false,
      };
    },
    methods: {
      toggleEditing() {
        this.editing = !this.editing;
      },
      updateUserInfo() {
        // Implement a function to update user information in the database
        // You can use Firebase or any other backend service for this purpose
        // Example:
        // this.$store.dispatch('updateUserInfo', this.user);
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .user-info {
    margin-top: 20px;
  }
  
  .info-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  label {
    width: 120px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
  }
  
  .edit-button {
    margin-top: 20px;
    text-align: center;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  