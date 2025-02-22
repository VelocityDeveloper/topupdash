<template>
  <form>

    <form class="flex justify-end gap-2 mb-3">
      <DatePicker
        v-model="formSearch.dates"
        selectionMode="range"
        :manualInput="false"
        size="small"
        dateFormat="dd/mm/yy"
        showIcon fluid
        placeholder="Pilih Tanggal"
      />
      <Select 
          v-model="formSearch.status" 
          :options="[{label:'Semua Status',value:''},{label:'Pending',value:'pending'},{label:'Success',value:'success'},{label:'Failed',value:'failed'}]" 
          optionLabel="label" 
          optionValue="value" 
          placeholder="Pilih Status" 
          size="small"
      />
    </form>
    
    <div v-if="status=='pending'">
      <template v-for="i in 10" :key="i">
        <Skeleton height="2.5rem" class="mb-1"></Skeleton>
      </template>
    </div>

    <div v-else>
      <DataTable v-if="data?.data" :value="data.data" size="small" stripedRows scrollable>        
        <Column field="ref_id" header="Ref" class="font-bold">
          <template #body="slotProps">
            {{ slotProps.data.ref_id }}
            <div class="md:hidden">
              <TransactionStatusBadge :status="slotProps.data.status" />
            </div>
          </template>   
        </Column>                
        <Column field="date" sortable header="Tanggal">
          <template #body="slotProps">
            {{ ubahTanggal(slotProps.data.created_at )}}
          </template>   
        </Column> 
        <Column field="customer" header="Customer"  class="hidden md:table-cell">
          <template #body="slotProps">
              <NuxtLink :to="`/customer/${slotProps.data.customer_id}`" target="_blank" class="cursor-pointer hover:underline">
                {{ slotProps.data.customer.domain }}
              </NuxtLink>
          </template>
        </Column>        
        <Column field="customer_no" header="Customer No" class="hidden xl:table-cell"></Column>
        <Column field="price" header="Harga"></Column>
        <Column field="status" header="Status" class="hidden md:table-cell">
          <template #body="slotProps">
            <TransactionStatusBadge :status="slotProps.data.status" />
          </template>
        </Column>
      </DataTable>

      <div v-else>
        <Message severity="warn">
        ! No data
        </Message>  
      </div>

      <Paginator
            v-if="data?.per_page"
            :rows="data.per_page"
            :totalRecords="data.total"
            @page="onPaginate"
            :pt="{
                root: (event) => {
                    const itemForPage =  data.per_page;
                    const currentPage =  page - 1;
                    event.state.d_first = itemForPage * currentPage;
                },
            }"
            >
        </Paginator>
    </div>

  </form>
</template>

<script setup lang="ts">
  definePageMeta({
      title: "Transactions",
  });

  const route = useRoute();
  const page = ref(route.query.page ? Number(route.query.page) : 1);
  const client = useSanctumClient();

  const formSearch = ref({
    status: null,
    dates: null as any
  });

  const { data, status, error, refresh } = await useAsyncData(
      'transaction'+page.value,
      () => client('/api/transaction', {
        params: {
          page: page.value,
          status: formSearch.value.status,
          dates: formSearch.value.dates ? JSON.stringify([convertTimetoLocal(formSearch.value.dates[0]),convertTimetoLocal(formSearch.value.dates[1])]) : ''
        }
    })
  )
  const onPaginate = (event: { page: number }) => {
      page.value = event.page + 1; 
      refresh()
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
      navigateTo('/transaction?page='+page.value)
  };

  //watch form search  
  watch(
    () => formSearch.value,
    () => {
      page.value = 1;
      navigateTo('/transaction?page='+page.value);
      refresh();
      console.log(convertTimetoLocal(formSearch.value.dates[0]));
    },
    { deep: true }
  );

  function convertTimetoLocal(utcString : string) {
    if(utcString) {
      const date = new Date(utcString); // Buat objek Date dari UTC
      const timeZoneOffset = -date.getTimezoneOffset() / 60; // Ambil offset dalam jam
      date.setHours(date.getHours() + timeZoneOffset); // Sesuaikan waktu lokal
      // Format ke string ISO tanpa "Z"
      return date.toISOString().split(".")[0];
    } else {
      return ''
    }
  }

  //ubah tanggal ke format indonesia
  const ubahTanggal = (tanggal : string) => {
    const date = new Date(tanggal);
    return date.toLocaleString('id-ID', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
  }

</script>