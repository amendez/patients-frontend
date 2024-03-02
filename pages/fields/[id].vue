<template>
    <drawer
        v-model="drawer"
        title="Field Configuration"
        @close="close"
    >
        <v-card>
            <v-card-title>
                <h4>{{ field.name }}</h4>
                {{ field.type }}
            </v-card-title>
        </v-card>
    </drawer>        
</template>

<script setup lang="ts">
    import Drawer from '@/components/drawer.vue'

    const router = useRouter()
    const route = useRoute()
    const api = useApi()
    const field = ref({})
    const drawer = ref(true)

    onMounted(async () => {
         const { data } = await api({url: `/additional_field_configurations/${route.params.id}`})
         field.value = data
    })

    const close = () => {
        router.push({name: 'fields'})
    }
</script>

<style>
.drawer-header {
  height: 64px;
  position: absolute;
  width: 100%;
}

.drawer-content {
  height: calc(100vh - 169px);
  margin-bottom: 105px;
  margin-top: 64px;
  overflow-y: auto;
}

.drawer-footer {
  bottom: 0;
  height: 105px;
  position: absolute;
  width: 100%;
}
</style>