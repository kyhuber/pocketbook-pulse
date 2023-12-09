<template>
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <p>This is where your financial data and information will be displayed.</p>
      <button @click="signOut">Sign Out</button>
    </div>
  </template>
  
  <script>
  import { useUserState } from '../userState'; // Adjust the path as necessary
  import { auth } from '../firebase.mjs';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const { user } = useUserState();
      const router = useRouter();

      // Method to sign out the user
      const signOut = () => {
        auth.signOut()
          .then(() => {
            router.push('/login');
          })
          .catch((error) => {
            console.error('Sign out error:', error);
          });
      };

      return {
        user,
        signOut,
      };
    },
  };
  </script>