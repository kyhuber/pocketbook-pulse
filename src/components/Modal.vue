<template>
    <div class="modal-overlay" v-if="show" @click.self="closeModal">
        <div class="modal-content">
            <slot></slot>
            <button class="close-button" @click="closeModal">Close</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:show'],
    methods: {
        closeModal() {
            this.$emit('update:show', false);
        }
    }
};
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    /* Adjust blur intensity as desired */
    opacity: 1;
    /* Ensure the overlay is fully opaque */
    pointer-events: auto;
    /* Allow interaction with the modal content */
    z-index: 100;
    /* Place the overlay above other elements */
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.close-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
}</style>