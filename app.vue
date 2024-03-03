<template>
  <v-app>
    <v-layout>
      <v-app-bar class="bg-secondary text-primary" image="/sand.png">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(241,234,222,.8), rgba(237,118,47,.7)"
          ></v-img>
        </template>
        
        <v-app-bar-title class="text-h5 text-black font-weight-black">
          Patients dashboard
        </v-app-bar-title>
        
        <v-spacer></v-spacer>

        <v-btn
          color="black"
          variant="tonal"
          prepend-icon="mdi-account-multiple-outline"
          class="rounded-pill mr-1"
          @click="router.push('/patients')"
        >
          Patients
        </v-btn>

        <v-btn
          variant="tonal"
          class="rounded-pill mr-1"
          color="black"
          prepend-icon="mdi-cog-outline"
          @click="router.push('/fields')"
        >
          Field configuration
        </v-btn>

        <v-btn
          color="error"
          variant="tonal"
          prepend-icon="mdi-logout-variant"
          class="rounded-pill"
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