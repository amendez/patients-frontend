<template>
  <v-app>
    <v-layout>
      <v-app-bar class="bg-secondary text-primary" image="/public/sand.png">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(241,234,222,.8), rgba(237,118,47,.7)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-img
            src="/public/logo.png"
          />
        </template>
        
        <v-app-bar-title class="text-h5">
          Patients dashboard
        </v-app-bar-title>
        
        <v-spacer></v-spacer>

        <v-btn
          color="secondary"
          text
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