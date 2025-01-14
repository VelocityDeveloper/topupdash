<template>
  <div>

    <div class="border-b py-2 flex flex-col md:flex-row">
      <div class="md:basis-1/4 font-bold mb-1">
        Customer Code
      </div>
      <div class="md:flex-1">  
        <div class="flex">
          <InputText :value="data.customer_code" type="text" class="w-full !rounded-e-none" disabled/>
          <Button severinity="secondary" @click="copyClipboard(data.customer_code)" class="!rounded-s-none">
            <Icon name="lucide:copy"/>
          </Button>
         </div> 
      </div>
    </div>    
    <div class="border-b py-2 flex flex-col md:flex-row">
      <div class="md:basis-1/4 font-bold mb-1">
        Secret Key
      </div>
      <div class="md:flex-1">
        <div class="flex">
          <InputText :value="data.license.secret_key" type="text" class="w-full !rounded-e-none" disabled/>
          <Button severinity="secondary" @click="copyClipboard(data.license.secret_key)" class="!rounded-s-none">
            <Icon name="lucide:copy"/>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-5">
      <Button severity="danger" @click="confirmGenerate(item.id)" :loading="isLoading">
        <Icon name="lucide:refresh-cw" mode="svg"/> Perbarui Key
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: Object
})
const item = props.item;
const idCustomer = item.id;
const isLoading = ref(false);
const toast = useToast();
const confirm = useConfirm();
const client = useSanctumClient();

const { data, status, error, refresh } = await useAsyncData(
    'customersy-'+idCustomer,
    () => client('/api/customer/key/'+idCustomer)
)

const copyClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.add({
      severity: 'success',
      summary: 'Berhasil!',
      detail: 'Berhasil disalin ke clipboard',
      life: 1000
  });
}

const confirmGenerate = (id : any) => {
  confirm.require({
    message: 'Mengubah secret key mungkin akan berpengaruh ke aplikasi yang digunakan Customer',
    header: 'Generate ulang secret key ?',
    rejectLabel: 'Cancel',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Generate',
        severity: 'danger'
    },
    accept: async () => {
        isLoading.value = true;
        await client('/api/customer/generatekey/'+id, {
          method: 'POST',
          body: {
            secret_key: data.license.secret_key,
            customer_code: data.customer_code
          }
        });
        isLoading.value = false;
        refresh()
        toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil dihapus', life: 3000 });
    },
});
};

</script>