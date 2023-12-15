<template>
    <div class="loading-indicator" v-if="isLoading">
    </div>
</template>

<script>
export default {
    props: {
        isLoading: Boolean,
    },
};

</script>

<style>
.loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    pointer-events: none;
}

.spinner {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #e5e7e9;
    /* Light grey */
    border: 3px solid #d4d8de;
    /* Slightly darker grey */
    animation: fade 0.8s infinite ease-in-out;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    /* Subtle drop shadow */
}

@keyframes fade {
    from {
        opacity: 0.5;
    }

    to {
        opacity: 1;
    }
}
</style>