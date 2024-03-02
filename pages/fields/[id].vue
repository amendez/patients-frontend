<template>
    <drawer
        v-model="drawer"
        title="Field Configuration"
        @close="close"
    >
        <v-card>
            <v-card-text>
                <v-text-field
                    v-model="field.name"
                    label="Name"
                    variant="outlined"
                />
                
                <v-select
                    label="Type"
                    :items="['Number', 'Text']"
                    v-model="field.type"
                    variant="outlined"
                />
            </v-card-text>
        </v-card>
        <template v-slot:actions-left>
            <v-btn
                :loading="loading"
                @click="close"
            >
                Close
            </v-btn>
        </template>
        <template v-slot:actions-right>
            <v-btn
                size="large"
                color="primary"
                :loading="loading"
                @click="save"
            >
                Save
            </v-btn>
        </template>
    </drawer>        
</template>

<script setup lang="ts">
    import Drawer from '@/components/drawer.vue'

    const router = useRouter()
    const route = useRoute()
    const api = useApi()
    const field = ref({})
    const drawer = ref(true)
    const loading = ref(false)

    const emit = defineEmits(['refresh'])

    onMounted(async () => {
         const { data } = await api({url: `/additional_field_configurations/${route.params.id}`})
         field.value = data
    })

    const close = () => {
        router.push({name: 'fields'})
    }

    const save = async () => {
        loading.value = true
        const { data } = await api({
            url: `/additional_field_configurations/${route.params.id}/`,
            method: 'PATCH',
            data: field.value
        })
        field.value = data
        loading.value = false
        emit('refresh')
        close()
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