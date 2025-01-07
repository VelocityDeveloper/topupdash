<template>
  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="route.query.redirect && route.query.redirect !== '/'">
    Hmmm, sepertinya anda mencoba mengakses halaman
    <em>"{{ route.query.redirect }}"</em>, silahkan login terlebih dahulu
    untuk melanjutkan.
  </Message>
  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="loginError">
    {{ loginError }}
  </Message>
  <form @submit.prevent="handleLogin" ref="form" class="max-w-[400px] mx-auto rounded-lg border 
  border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 p-4
  flex justify-center flex-col gap-4 w-full" >
      <h1 class="text-2xl font-bold">Login</h1>
      <IftaLabel>
          <InputText id="email" v-model="credentials.email" class="w-full" type="email" variant="filled"/>
          <label for="email">Email</label>
      </IftaLabel>
      <IftaLabel>
          <InputText type="password" id="password" v-model="credentials.password" class="w-full" />
          <label for="password">Password</label>
      </IftaLabel>
      <div>
        <Button label="Login" type="submit" ><Icon name="lucide:log-in"/> Login</Button>
      </div>
  </form>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Login',
  })
  const { login } = useSanctumAuth()
  const route = useRoute()

  const credentials = ref({
    email: '',
    password: '',
  })

  const loginError = ref('')

  async function handleLogin() {
    try {
      await login(credentials.value)
      loginError.value = ''
    }
    catch (err: any) {
      loginError.value = err.response._data.message
    }
  }

</script>