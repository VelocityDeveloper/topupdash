<template>
  <div class="group flex justify-center items-center gap-2 mt-5 mb-3 mx-3">
    <div class="relative">
        <img src="~/public/favicon.ico" alt="" class="child group-hover:opacity-0 max-w-[40px] transition-opacity duration-300 ease-in-out">
        <img src="~/public/logo-flash.png" alt="" class="absolute top-0 child opacity-0 group-hover:opacity-100 max-w-[40px] transition-opacity duration-300 ease-in-out">
    </div>
    <div>
      <div class="font-bold">TOPUP</div>
      <div class="text-xs opacity-50">Velocity Developer</div>
    </div>
  </div>
 
  <div class="overflow-y-auto h-full px-2">

      <PanelMenu
            :model="items"
            class="w-full border-none rounded-none !gap-0"
            :pt="{
                panel: (options) => ({
                    class: [
                        '!border-none',
                        '!bg-transparent',
                        '!pb-0',
                    ]
                }),
                rootList: (options) => ({
                    class: [
                        '!ps-0',
                    ]
                })
            }"
        >
          <template #item="{ item }">

              <button v-if="item.items" v-ripple :class="[classLink,{'bg-blue-900 text-amber-200' : isActive(item.href)}]">
                  <span class="flex justify-start items-center">
                      <Icon v-if="item.icon" :name="item.icon" mode="svg" :ssr="true" class="mr-2"/>
                      <span>{{ item.label }}</span>
                  </span>
                  <Icon v-if="item.items" name="lucide:chevron-down" />
              </button>
              <NuxtLink v-else :to="item.href" :class="[classLink,{'bg-blue-900 text-amber-200' : isActive(item.href)}]">
                  <span class="flex justify-start items-center">
                      <Icon v-if="item.icon" :name="item.icon" mode="svg" :ssr="true" class="mr-2"/>
                      <span :class="{'ml-5':isChild(item.key)}">{{ item.label }}</span>
                  </span>
              </NuxtLink>

          </template>
      </PanelMenu>

    </div>

</template>

<script setup lang="ts">
//route, cek halaman aktif
const route = useRoute()
const isActive = (path : string) => {
  return route.path === path
}

const isChild = (key : any) => {
  return key.includes('_')? true : false
}

//daftar menu
const items = ref([
  {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'lucide:layout-grid',
      href:'/',
  },
  {
      key: 'products',
      label: 'Products',
      icon: 'lucide:box',
      items: [
          {            
            key: 'products_all',
            label: 'Semua Product',
            href:'/products',
          },
          {            
            key: 'products_category',
            label: 'Category',
            href:'/products/category',
          },
          {            
            key: 'products_brand',
            label: 'Brand',
            href:'/products/brand',
          },
          {            
            key: 'products_type',
            label: 'Type',
            href:'/products/type',
          }
      ]
  },
  {
      key: 'customer',
      label: 'Customers',
      icon: 'lucide:users',
      href:'/customer',
  },
  {
      key: 'transaction',
      label: 'Transactions',
      icon: 'lucide:receipt-text',
      href:'/transaction',
  },
]);

//class untuk tombol menu
const classLink = 'w-full mb-1 flex items-center justify-between px-4 py-2 cursor-pointer rounded hover:bg-blue-900 hover:text-amber-400';
</script>
