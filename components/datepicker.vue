<template>
    <v-menu v-model="isMenuOpen" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-text-field
          :label="label"
          :model-value="formattedDate"
          readonly
          v-bind="props"
          hide-details
        ></v-text-field>
      </template>
      <v-date-picker v-model="selectedDate" hide-actions title="" :color="color" :year="defaultYear">
        <template v-slot:header></template>
      </v-date-picker>
    </v-menu>
  </template>
  
  <script setup>
  import { ref, computed, watch, defineProps, defineEmits } from "vue";
  
  const { label, color, modelValue } = defineProps([
    "label",
    "modelValue",
  ]);
  const emit = defineEmits("update:modelValue");
  
  const isMenuOpen = ref(false);
  const selectedDate = ref(modelValue);
  
  const formattedDate = computed(() => {
    try {
      return selectedDate.value ? selectedDate.value.toLocaleDateString("en") : "";
    } catch (e) {
      return "";
    }
  });
  
  const defaultYear = new Date().getFullYear() - 12;

  watch(modelValue, (newDate) => {
    selectedDate.value = newDate;
  });
  
  watch(selectedDate, (newDate) => {
    emit("update:modelValue", newDate)
    isMenuOpen.value = false
  });
  </script>
  <style>
  .v-overlay__content:has(> .v-date-picker) {
    min-width: auto!important;
  }
  .v-picker-title {
    padding: 0 !important;
  }
  </style>`