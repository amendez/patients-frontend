<template>
  <v-app>
    <v-layout>
      <v-app-bar class="bg-secondary text-primary" image="/bar.png">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(241,234,222,.3), rgba(237,118,47,.4)"
          ></v-img>
        </template>
        
        <v-app-bar-title class="font-weight-black">
          <div class="bg-secondary rounded-pill pa-3 text-primary elevation-4 d-inline-block">
            Patients Dashboard
          </div>
        </v-app-bar-title>
        
        <v-spacer></v-spacer>

        <v-btn
          elevation="4"
          class="rounded-pill mr-2 bg-secondary"
          color="primary"
          prepend-icon="mdi-account-multiple-outline"
          @click="router.push('/patients')"
        >
          Patients
        </v-btn>

        <v-btn
          elevation="4"
          class="rounded-pill mr-4 bg-secondary"
          color="primary"
          prepend-icon="mdi-cog-outline"
          @click="router.push('/fields')"
        >
          Field configuration
        </v-btn>

        <v-btn
          elevation="4"
          class="rounded-pill bg-secondary"
          color="error"
          prepend-icon="mdi-logout-variant"
          @click="logout"
        >
        Log out
        </v-btn>
      </v-app-bar>
      
      <v-main class="d-flex align-top justify-center mt-8" style="min-height: 300px;">
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-app>
</template>
<script setup lang="ts">
  const router = useRouter()
  onMounted(() => {
    const token = localStorage.getItem('access-token') || undefined
    if (!token) {
      const router = useRouter()
      router.push('/login')
    }
  })
  const logout = () => {
    localStorage.removeItem('access-token')
    const router = useRouter()
    router.push('/login')
  }
</script>