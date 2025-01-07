<template>
  <SubHeader>
    <div>
      <Button label="Tambah" size="small" severity="success" @click="modalCuti({})" class="w-full" >
        <Icon name="lucide:plus" size="1em" /> Tambah Cuti
      </Button>
    </div>
  </SubHeader>

  <DataTable v-if="data" :value="data.data" striped-rows tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="nama" header="Nama"></Column>
      <Column field="tanggal" header="Tanggal">
          <template #body="slotProps">
             {{ FormatTanggal(slotProps.data.tanggal) }}
          </template>
      </Column>
      <Column field="jenis" header="Jenis"></Column>
      <Column field="time" header="Waktu">
          <template #body="slotProps">
             {{ FormatWaktu(slotProps.data.time) }}
          </template>
      </Column>
      <Column field="tipe" header="Tipe"></Column>
      <Column field="detail" header="Detail"></Column>
      <Column header="Tindakan">
          <template #body="slotProps" >
            <div class="flex justify-center gap-1">
              <Button severity="success" size="small" @click="modalCuti(slotProps.data)">
                  <Icon name="lucide:edit" size="1em" />
              </Button>
              <Button severity="danger" size="small" @click="deleteCuti(slotProps.data)">
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
  <DynamicDialog />
</template>

<script lang="ts" setup>
  definePageMeta({
      title: "Cuti",
  });
  const route = useRoute()
  const client = useSanctumClient()
  const confirm = useConfirm()
  const toast = useToast()
  const dialog = useDialog()
  const page = ref(route.query.page ? Number(route.query.page) : 1) as any
  const ModalCuti = defineAsyncComponent(() => import('~/components/ModalCuti.vue'))
  const { data, error, refresh } = await useAsyncData('cuti', fetchData)

  function fetchData() {
    const query = new URLSearchParams();
    const response = client(`/api/cuti?page=${page.value}&${query.toString()}`);
    return response;
  }

  const FormatTanggal = (tanggal: any) => {
    const date = new Date(tanggal);
    //longdate
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const FormatWaktu = (time) => {
    if (typeof time === "string") {
      if (time.includes("T")) {
        // Jika input dalam format ISO 8601
        const date = new Date(time); // Konversi ke objek Date
        return date.toLocaleTimeString("id-ID", { hour: "numeric", minute: "numeric" });
      } else if (time.includes(":")) {
        // Jika input dalam format "HH:mm"
        const [hour, minute] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hour, minute, 0, 0); // Set jam dan menit
        return date.toLocaleTimeString("id-ID", { hour: "numeric", minute: "numeric" });
      }
    }
    return null; // Jika format tidak valid
  }
  
  const deleteCuti = async (cuti: any) => {
    confirm.require({
      message: 'Apakah Anda yakin ingin menghapus data cuti ini?',
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
        await client(`/api/cuti/${cuti.id}`, {
          method: 'DELETE',
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Delete data cuti berhasil!', life: 3000 });
        refresh();
      },
    })
  }

  const onPageChange = (event: {page: number, first: number, rows: number, pageCount: number}) => {
    page.value = event.page + 1;
    navigateTo(`/cuti?page=${page.value}`);
  }

  const modalCuti = (data: any) => {
    dialog.open(ModalCuti, {
      data: data,
      props: {
        header: `${data.cuti}`,
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

