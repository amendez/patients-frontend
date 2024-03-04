<template>
    <drawer
        v-model="drawer"
        title="Patient detail"
        @close="close"
    >
        <v-skeleton-loader v-if="loading" type="article@10"></v-skeleton-loader>
        <v-card v-else>
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
                            <create-edit-address
                                v-if="patient"
                                :patient-id="patient.id"
                                :address="address"
                                :edit="true"
                                class="d-inline rounded"
                                @refresh="refresh"
                            />

                            <div style="height:300px; width:100%">
                                <LMap
                                    ref="map"
                                    :options="{ zoomControl: false, scrollWheelZoom: false }"
                                    :zoom="zoom"
                                    :center="[address.latitude, address.longitude]"
                                >
                                    <LTileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                        layer-type="base"
                                        name="OpenStreetMap"
                                    />
                                    <l-marker :lat-lng="[address.latitude, address.longitude]" />
                                </LMap>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <create-edit-address
                            v-if="patient"
                            :patient-id="patient.id"
                            :edit="false"
                            @refresh="refresh"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    
        <template v-slot:actions-right>
            <create-edit-patient v-if="patient" :edit="true" :patient="patient" @refresh="refresh" />
        </template>
    </drawer>        
</template>

<script setup lang="ts">
    import Drawer from '@/components/drawer.vue'
    import { computed } from 'vue'

    const router = useRouter()
    const route = useRoute()
    const api = useApi()
    const patient = ref({})
    const drawer = ref(true)
    const loading = ref(false)
    const zoom = ref(15)

    const fetchPatient = async () => {
        const { data } = await api.get(`/patients/${route.params.id}`)
        patient.value = data
    }

    const emit = defineEmits(['refresh'])

    onMounted(async() => {
        loading.value = true
        await fetchPatient()
        loading.value = false
    })

    const close = () => {
        router.push({name: 'patients'})
    }

    const refresh = () => {
        fetchPatient()
        emit('refresh')
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