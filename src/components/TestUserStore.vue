<template>
    <div>
        <h1>Test User Store</h1>
        <p v-if="user">User is logged in: {{ user.uid }}</p>
        <p v-else>User is not logged in</p>
    </div>
</template>
  
<script>
import { useUserStore } from '../stores/userStore';

export default {
    name: 'TestUserStore',
    setup() {
        const userStore = useUserStore();
        return {
            user: userStore.user,
        };
    },
};
</script>  