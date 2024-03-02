<template>
    <drawer
        v-model="drawer"
        title="Patient detail"
        @close="close"
    >
        <v-card>
            <v-card-title>
                <h4>{{ fullName }}</h4>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <div class="text-caption">
                            Date of birth:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ patient.date_of_birth }}
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-caption">
                            Status:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ patient.status }}
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="text-caption">
                            Email:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ patient.email }}
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-caption">
                            Patient since:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ patient.created_at }}
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" v-for="field in patient.additional_fields" :key="field.id">
                        <div class="text-caption">
                            {{ field.name }}:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ field.value }} 
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" v-for="address in patient.addresses" :key="address.id">
                        <div class="text-caption">
                            Address:
                        </div>
                        <div class="text-body-1 font-weight-bold">
                            {{ address.address1 }} {{ address.address2 }}, {{ address.city }}, {{ address.state }}, {{ address.zip_code }}, {{ address.country }} 
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    
        <template v-slot:actions-left>
            <v-btn color="secondary">Edit patient</v-btn>
        </template>
        <template v-slot:actions-right>
            <v-btn icon="mdi-delete" color="error" />
        </template>
    </drawer>        
</template>

<script setup lang="ts">
    import Drawer from '@/components/drawer.vue'
    import { computed } from 'vue';

    const router = useRouter()
    const route = useRoute()
    const api = useApi()
    const patient = ref({})
    const drawer = ref(true)

    onMounted(async () => {
         const { data } = await api({url: `/patients/${route.params.id}`})
         patient.value = data
    })

    const close = () => {
        router.push({name: 'patients'})
    }

    const fullName = computed(() => {
        return `${patient.value?.first_name ?? ''} ${patient.value?.middle_name ?? ''} ${patient.value?.last_name ?? ''}`
    })
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