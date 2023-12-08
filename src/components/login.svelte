//login.svelte

<script>
    import { onMount } from 'svelte';
    import { auth } from './firebase.js';
    
    let email = '';
    let password = '';
    let loginError = '';
    
    async function handleLogin() {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        // Handle successful login here, e.g., redirect or update UI
      } catch (error) {
        loginError = error.message; // Display error messages to the user
      }
    }
    
    onMount(() => {
        email = '';
        password = '';
        loginError = '';
        });
    </script>
    
    <form on:submit|preventDefault={handleLogin}>
      <div class="mb-4 flex flex-col">
        <label for="email" class="mb-2 font-bold">Email:</label>
        <input id="email" type="email" bind:value={email} required class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    
      <div class="mb-4 flex flex-col">
        <label for="password" class="mb-2 font-bold">Password:</label>
        <input id="password" type="password" bind:value={password} required class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    
      {#if loginError}
        <p class="error mb-4">{loginError}</p>
      {/if}
    
      <button type="submit" class="bg-primary text-white rounded px-4 py-2 font-bold shadow hover:bg-blue-600">Login</button>
    </form>
    
    <style>
      .error {
        color: red;
      }
    </style>