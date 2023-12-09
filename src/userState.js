// userState.js
import { ref, readonly } from 'vue';
import { auth } from './firebase.mjs';

const user = ref(auth.currentUser);

auth.onAuthStateChanged((firebaseUser) => {
  user.value = firebaseUser;
});

export function useUserState() {
  return {
    user: readonly(user)
  };
}
