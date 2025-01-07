<template>
    <div>
      <div class="text-red-500">{{ data }}</div>
    </div>  
  </template>
  
  <script lang="ts" setup>
    const client = useSanctumClient()
    const { data, error, refresh } = await useAsyncData('theme', fetchData)
    function fetchData() {
      return client(`/api/theme`);
    }
  </script>
  
  