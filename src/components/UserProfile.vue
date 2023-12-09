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
            v-model="editableUser.firstName"
          />
        </div>
        <div v-else>{{ editableUser.firstName }}</div>
      </div>

      <div class="info-item">
        <label for="lastName">Last Name:</label>
        <div v-if="editing">
          <input
            type="text"
            id="lastName"
            v-model="editableUser.lastName"
          />
        </div>
        <div v-else>{{ editableUser.lastName }}</div>
      </div>

      <!-- Additional fields as required... -->

    </div>
    <div class="edit-button">
      <button @click="toggleEditing">{{ editing ? 'Save' : 'Edit' }}</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const editableUser = reactive({ ...props.user });
    const editing = ref(false);

    function toggleEditing() {
      editing.value = !editing.value;
      if (!editing.value) {
        updateUserInfo();
      }
    }

    function updateUserInfo() {
      // Implement the logic to update user information
      console.log("Updated user info:", editableUser);
      // TODO: Send the updated user info to the backend or update the Vuex store
    }

    return {
      ...toRefs(editableUser),
      editing,
      toggleEditing,
      updateUserInfo
    };
  },
};
</script>