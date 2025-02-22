<template>
  <Badge :severity="severity" class="capitalize">
      <Icon v-if="status == 'pending'" name="lucide:clock" mode="svg" class="mr-1"/>
      <Icon v-else-if="status == 'failed'" name="lucide:x" mode="svg" class="mr-1"/>
      <Icon v-else-if="status == 'success'" name="lucide:check" mode="svg" class="mr-1"/>
     {{ status }}
  </Badge>
</template>

<script setup lang="ts">
const props = defineProps(['status'])
const status = props.status

const severity = computed(() => {
  if(status == 'pending'){
    return 'info'
  } else if(status == 'success'){
    return 'success'
  } else if(status == 'failed'){
    return 'danger'
  } else {
    return 'secondary'
  }
})

</script>
