<template>

  <div class="md:min-h-[8rem] bg-gradient-to-r from-sky-700 to-blue-400 dark:from-cyan-900 dark:to-blue-900 text-slate-50 rounded-t-lg flex items-bottom p-4 md:p-6">
    <div class="flex items-center">
      <Icon name="lucide:globe" mode="svg" size="3rem" class="mr-2 w-6 md:w-20"/>
      <div>
        <div class="md:text-2xl font-bold">
          {{ dataCust.domain }} 
          <a :href="'https://'+dataCust.domain" target="_blank">
            <Icon name="lucide:external-link" mode="svg" size="1rem" class="inline"/>
          </a>
        </div>
        <div class="text-xs md:text-base opacity-50">          
        {{ dataCust.name }}
        </div>
      </div>
    </div>
  </div>
  <Tabs :value="'/customer/'+idCust" scrollable>
      <TabList>
          <Tab v-for="tab in itemMenus" :key="tab.label" :value="tab.route">
              <!-- <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                  <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                      <i :class="tab.icon" />
                      <span>{{ tab.label }}</span>
                  </a>
              </router-link> -->
              <NuxtLink :to="tab.route" class="flex items-center gap-2 text-inherit">
                <span>{{ tab.label }}</span>
              </NuxtLink>
          </Tab>
      </TabList>
  </Tabs>

  <div class="py-4">
    <slot/>
  </div>

</template>

<script setup lang="ts">
const route = useRoute()
const idCust = route.params.id
const dataCust = ref({} as any)

const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'customer-'+idCust,
    () => client('/api/customer/'+idCust)
)
dataCust.value = data.value;

const itemMenus = [  
  { route: '/customer/'+idCust+'', label: 'Profil'},
  { route: '/customer/'+idCust+'/transaksi', label: 'Transaksi'},
  { route: '/customer/'+idCust+'/saldo', label: 'Saldo'},
  { route: '/customer/'+idCust+'/edit', label: 'Edit'},
]

</script>
