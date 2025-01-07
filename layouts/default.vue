<template>
  <div class="default">
    <div class="flex flex-col min-h-screen justify-between bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <hr class="border-zinc-200 dark:border-zinc-800" />
      <div class="grow bg-zinc-200 dark:bg-zinc-950 flex flex-col justify-center">
        <div class="flex flex-col justify-center">
          <slot />
          <Darkmode />
        </div>
      </div>
    </div>
  </div>
</template>
