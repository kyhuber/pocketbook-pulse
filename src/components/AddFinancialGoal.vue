<template>
    <div class="add-goal-container">
      <h2>Add Financial Goal</h2>
      <form @submit.prevent="addFinancialGoal">
        <!-- Goal Name -->
        <div>
          <label for="goalName">Goal Name:</label>
          <input id="goalName" v-model="financialGoal.goalName" type="text" required />
        </div>
  
        <!-- Target Amount -->
        <div>
          <label for="targetAmount">Target Amount:</label>
          <input id="targetAmount" v-model.number="financialGoal.targetAmount" type="number" required />
        </div>
  
        <!-- Target Date -->
        <div>
          <label for="targetDate">Target Date:</label>
          <input id="targetDate" v-model="financialGoal.targetDate" type="date" />
        </div>
  
        <!-- Amount Saved -->
        <div>
          <label for="amountSaved">Amount Saved:</label>
          <input id="amountSaved" v-model.number="financialGoal.amountSaved" type="number" />
        </div>
  
        <!-- Projected Rate of Return -->
        <div>
          <label for="projectedRateOfReturn">Projected Rate of Return:</label>
          <input id="projectedRateOfReturn" v-model.number="financialGoal.projectedRateOfReturn" type="number" placeholder="0" />
        </div>
  
        <!-- Priority Level -->
        <div>
          <label for="priorityLevel">Priority Level:</label>
          <select id="priorityLevel" v-model="financialGoal.priorityLevel" required>
            <option value="Critical">Critical</option>
            <option value="Important">Important</option>
            <option value="Hopefully">Hopefully</option>
            <option value="Would Be Nice">Would Be Nice</option>
          </select>
        </div>
  
        <button type="submit">Add Goal</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { db } from '../firebase.mjs';
  import { collection, addDoc } from 'firebase/firestore';
  import { auth } from '../firebase.mjs';

  export default {
    name: 'AddFinancialGoal',
    setup() {
      const initialState = {
        goalName: '',
        targetAmount: 0,
        targetDate: '',
        amountSaved: 0,
        projectedRateOfReturn: 0,
        priorityLevel: ''
      };
      const financialGoal = ref({ ...initialState });

      const addFinancialGoal = async () => {
        try {
          if (auth.currentUser) {
            const goalData = { ...financialGoal.value, userId: auth.currentUser.uid };
            await addDoc(collection(db, "financialGoals"), goalData);
            alert("Financial goal added successfully!");
            financialGoal.value = { ...initialState };
          } else {
            alert("User not authenticated.");
          }
        } catch (e) {
          alert("Error adding financial goal: " + e.message);
        }
      };

      return {
        financialGoal,
        addFinancialGoal
      };
    }
  };
  </script>

  
  <style scoped>
  .add-goal-container {
    margin-left: 250px; 
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #32424A; /* Matching the dark theme */
    color: #ffffff; /* Ensuring text is light for readability */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .add-goal-container h2 {
      margin-bottom: 20px;
      text-align: center;
      color: #ffffff; /* White color for heading */
  }

  .add-goal-container form label {
      display: block;
      margin-bottom: 10px;
      color: #ffffff; /* Light color for labels */
  }

  .add-goal-container form input[type="text"],
  .add-goal-container form input[type="number"],
  .add-goal-container form input[type="date"],
  .add-goal-container form select {
      width: 100%;
      padding: 8px;
      border: 1px solid #607d8b;
      border-radius: 4px;
      background-color: #455a64; /* Darker background for inputs */
      color: #ffffff; /* Light text color */
  }

  .add-goal-container form input[type="text"]:focus,
  .add-goal-container form input[type="number"]:focus,
  .add-goal-container form input[type="date"]:focus,
  .add-goal-container form select:focus {
      border-color: #1e88e5; /* Highlight color for focus */
      outline: none;
  }

  .add-goal-container form button {
      width: 100%;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #1e88e5; /* Bright blue for contrast */
      color: #ffffff; /* White text */
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  .add-goal-container form button:hover {
      background-color: #1565c0; /* Darker shade on hover */
  }

  </style>
  