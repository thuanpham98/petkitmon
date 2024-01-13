<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
const count = ref<{
  value: number;
  name: string;
  data: string[];
}>({
  name: "",
  value: 0,
  data: ["123", "213", "4324"],
});

async function increment() {
  count.value.value++;
  count.value.name = count.value.name + "432";
  await nextTick();
}
const getNameLangue = computed(() => {
  return count.value.name.length;
});
onMounted(() => {
  console.log(`${count.value}`);
});
</script>

<template>
  <span :class="{ 'text-color': count.value > 10 }">
    {{ getNameLangue }}
  </span>
  <button :id="count.value.toString()" v-on:click="increment">click me</button>

  <HelloWorld
    :name="'ew'"
    :msg="count.name"
    :class="{ 'text-color': count.value > 10 }"
  />
  <span
    :key="item + i.toString()"
    style="display: flex; flex-direction: column"
    v-for="(item, i) in count.data"
  >
    {{ item }}
    {{ i }}
  </span>
</template>

<style>
.text-color {
  color: red;
}
</style>
