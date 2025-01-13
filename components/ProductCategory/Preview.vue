<template>
  
  <div v-for="field in fields" :key="field.key" class="border-b py-1">
    <div class="font-bold mb-1">{{ field.label }}</div>
    <div> {{ product[field.key] }} </div>
  </div>
  <div class="flex justify-end mt-4">
    <Button type="submit" severity="info" @click="$emit('edit')">
        <Icon name="lucide:edit" mode="svg"/> Edit
    </Button>
  </div>
  
</template>

<script setup>
defineEmits(['edit'])
const props = defineProps({
  product: Object
})
const product = props.product;

const fields = [
  { key: 'category_name', label: 'Product Name' },
  { key: 'category_description', label: 'Description' },
  { key: 'category_logo', label: 'Logo' },
]

</script>
