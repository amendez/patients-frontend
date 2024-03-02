<template>
    <div class="pa-4 text-center">
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            prepend-icon="mdi-account-plus"
            text="Create Patient"
            color="primary"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-account-plus"
          title="New Patient"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="4">
                <v-text-field
                  v-model="patient.first_name"
                  label="First Name"
                  required
                />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="patient.middle_name"
                  label="Middle Name"
                  required
                />
              </v-col>
  
              <v-col cols="4">
                <v-text-field
                  v-model="patient.last_name"
                  label="Last Name"
                  required
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="patient.email"
                  label="Email"
                  type="email"
                  required
                />
              </v-col>

              <v-col cols="6">
                <datepicker
                  label="Birthdate"
                  v-model="patient.date_of_birth"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="patient.status"
                  label="Status"
                  :items="['Inquiry', 'Onboarding', 'Active', 'Churned']"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" v-for="field in customFields" :key="field.id">
                <v-text-field
                  v-model="patient[`custom-${field.id}`]"
                  :label="field.name"
                />
              </v-col>
            </v-row>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Close"
              variant="plain"
              :loading="loading"
              @click="dialog = false"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Save"
              :loading="loading"
              @click="save"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script setup lang="ts">
    const dialog = ref(false)
    const patient = ref({
      status: 'Inquiry',
    })
    const loading = ref(false)
    const api = useApi()
    const customFields = ref([])
    
    const emit = defineEmits(['refresh'])

    const fetchCustomFields = async () => {
        const { data } = await api({url: '/additional_field_configurations/'})
        customFields.value = data.results
    }

    const save = async () => {
        loading.value = true

        patient.value.date_of_birth = new Date(patient.value.date_of_birth).toISOString().slice(0, 10)

        try {
          const { data } = await api({
              url: `/patients/`,
              method: 'POST',
              data: patient.value
          })
        }
        catch (error) {
          console.error(error)
        }
        loading.value = false
        dialog.value = false
        patient.value = {}
        emit('refresh')
    }

    onMounted(fetchCustomFields)
</script>