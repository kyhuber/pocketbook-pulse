import { ref, readonly, onUnmounted } from 'vue';
import { auth } from './firebase.mjs';

const user = ref(auth.currentUser);
const loading = ref(true); // Loading state

const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
  user.value = firebaseUser;
  loading.value = false;
});

// Optional: Unsubscribe when component unmounts
onUnmounted(() => {
  unsubscribe();
});

export function useUserState() {
  return {
    user: readonly(user),
    loading: readonly(loading)
  };
}