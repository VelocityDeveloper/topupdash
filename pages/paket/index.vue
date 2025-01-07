<template>
  <SubHeader>
    <div>
      <Button label="Tambah" size="small" severity="success" @click="modalPaket({})" class="w-full" >
        <Icon name="lucide:plus" size="1em" /> Tambah Paket
      </Button>
    </div>
  </SubHeader>
  <DataTable v-if="data" :value="data.data" striped-rows tableStyle="min-width: 50rem">
      <Column field="id_paket" header="ID"></Column>
      <Column field="paket" header="Paket"></Column>
      <Column field="bobot" header="Bobot"></Column>
      <Column header="">
          <template #body="slotProps" >
            <div class="flex justify-end gap-1">
              <Button severity="success" size="small" @click="modalPaket(slotProps.data)">
                  <Icon name="lucide:edit" size="1em" />
              </Button>
              <Button severity="danger" size="small" @click="deletePaket(slotProps.data)">
                  <Icon name="lucide:trash" size="1em" />
              </Button>
            </div>
          </template>
      </Column>
  </DataTable>
  <Paginator
    v-if="data.total > data.per_page"
    :rows="data.per_page"
    :totalRecords="data.total"
    @page="onPageChange"
    aria-label="page"
    :pt="{
      root: (event) => {
        const itemForPage = data.per_page;
        const currentPage = page - 1;
        event.state.d_first = itemForPage * currentPage;
      },
    }"
  >
    <template #start="slotProps">
       Menampilkan {{ data.from}} sampai {{ data.to}} dari {{ data.total }}
    </template>
  </Paginator>
  <ConfirmPopup>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="rounded p-4">
        <span>{{ message.message }}</span>
        <div class="flex items-center gap-2 mt-4">
            <Button label="Hapus" severity="danger" @click="acceptCallback" size="small"></Button>
            <Button label="Batal" severity="contrast" @click="rejectCallback" size="small"></Button>
        </div>
      </div>
    </template>
  </ConfirmPopup>
  <Toast />
  <DynamicDialog/>
</template>

<script lang="ts" setup>
  definePageMeta({
      title: "Paket",
  });
  const route = useRoute()
  const client = useSanctumClient()
  const confirm = useConfirm()
  const toast = useToast()
  const dialog = useDialog()
  const page = ref(route.query.page ? Number(route.query.page) : 1) as any
  const ModalPaket = defineAsyncComponent(() => import('~/components/ModalPaket.vue'))
  const { data, error, refresh } = await useAsyncData('paket', fetchData)
  function fetchData() {
    const query = new URLSearchParams();
    const response = client(`/api/paket?page=${page.value}&${query.toString()}`);
    return response
  }

  const deletePaket = async (paket: any) => {
    confirm.require({
      message: 'Apakah Anda yakin ingin menghapus paket ini?',
      header: 'Konfirmasi',
      icon: 'lucide:alert-triangle',
      rejectProps: {
        label: 'Batal',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Hapus'
      },
      accept: async () => {
        await client(`/api/paket/${paket.id_paket}`, {
          method: 'DELETE',
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Delete konsumen berhasil!', life: 3000 });
        refresh();
      },
    })
  }
  const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
    page.value = event.page + 1; 
    navigateTo(`/paket?page=${page.value}`);
  }
  const modalPaket = (data: any) => {
    dialog.open(ModalPaket, {
      data: data,
      props: {
        header: `${data.paket}`,
        dismissableMask: true,
        dismissable: true,
        showHeader: false,
        class: 'w-full max-w-[500px]',
        modal: true
      } as any,
      onClose: () => {
        refresh()
      }
    })
  }
  watch(page, (newPage) => {
    refresh()
  });
</script>

