// UseGlobalState.js
import { ref } from 'vue';

const items = ref([]);

export default function useGlobalState() {
  const addItem = (Item) => {
    items.value.push(Item);
  };

  return { items, addItem };
}