<template>
  <div class="sticky top-0 z-50">
    <Menubar :model="items">
            <template #start>
                <nuxt-link to="/">
                  <img src="~/assets/img/vdfav.png" class="max-w-[40px]"/>
                </nuxt-link>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <Nuxt-link :to="item.href" v-ripple class="flex text-sm items-center !px-2 !py-2" v-bind="props.action">
                  {{ item.label }}
                </Nuxt-link>
            </template>
            <template #end>
                <div class="flex justify-end">

                  <icon name="lucide:user" size="1em" @click="toggleAvatar"/>

                  <Menu ref="menuAv" id="avatar_menu" :model="menuAvatar" :popup="true" />

                </div>
            </template>
      </Menubar>
    </div>
</template>

<script setup lang="ts">
const { user,logout } = useSanctumAuth();

const menuAv = ref();
const toggleAvatar = (event) => {
  menuAv.value.toggle(event);
};


// Daftar Menu dengan label dinamis menggunakan user.name
const menuAvatar = computed(() => {
    return [
        {
            label: user.value.name,
            items: [
                { 
                    label: 'Logout',
                    command: () => logout()
                }
            ]
        }
    ];
});

const items = ref([
    {
        key: 'dashboard',
        label: 'Dashboard',
        href:'/',
    },
    {
        key: 'billing',
        label: 'Billing',
        href:'/',
    },
    {
        key: 'webhost',
        label: 'Database Web',
        href:'/webhost',
    },
    {
        key: 'paket',
        label: 'Paket',
        href:'/paket',
    },
    {
        key: 'menulain',
        label: 'Menu Lain',
        href:'#',
        items: [
            {
                key: 'webhost',
                label: 'Webhost',
                href:'/lainya/webhost',
            },
            {
                key: 'domain',
                label: 'Domain',
                href:'/lainya/domain',
            },
            {
                key: 'cuti',
                label: 'Data Cuti',
                href:'/cuti',
            },
        ]
    },
]);
</script>