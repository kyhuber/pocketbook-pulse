<script>
import { reactive, toRefs, ref, watch } from 'vue';

export default {
  props: {
    user: {
      type: Object,
      required: true // Consider making this required if it always needs to be passed
    },
  },
  setup(props) {
    const editableUser = reactive({ ...props.user });
    const editing = ref(false);

    // Watch for changes in user prop
    watch(() => props.user, (newUser) => {
      Object.assign(editableUser, newUser);
    });

    function toggleEditing() {
      editing.value = !editing.value;
      if (!editing.value) {
        updateUserInfo();
      }
    }

    function updateUserInfo() {
      // TODO: Implement the update logic
      console.log("Updated user info:", editableUser);
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
