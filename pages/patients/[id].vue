<template>
      <v-navigation-drawer
        v-model="drawer"
        temporary
        location="right"
        width="720"
        @update:model-value="close"
      >
      <div class="d-flex drawer-header align-center justify-space-between bg-background px-3">
        <div class="qtm-h1 text-uppercase" v-text="'Patient detail'" />
            <v-hover v-slot="{ isHovering }">
                <v-btn variant="text" :color="isHovering ? 'secondary' : 'primary'" icon="mdi-close" @click="close" />
            </v-hover>
        </div>
        <div class="drawer-content px-3">
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
                        <v-col v-for="field in patient.additional_fields" :key="field.id">
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
        </div>
        <div class="bg-white drawer-footer d-flex align-center justify-space-between pa-8">
            <div>
                <v-btn color="secondary">Edit patient</v-btn>
            </div>
            <div>
                <v-btn icon="mdi-delete" color="error" />
            </div>
        </div>
      </v-navigation-drawer>        
</template>

<script setup lang="ts">
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