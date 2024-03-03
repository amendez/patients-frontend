<template>
    <div>
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            :prepend-icon="props.edit ? 'mdi-pencil' : 'mdi-account-plus'"
            :text="props.edit ? 'Edit Patient' : 'Create Patient'"
            :color="props.edit ? 'secondary' : 'primary'"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          :prepend-icon="props.edit ? 'mdi-pencil' : 'mdi-account-plus'"
          :title="props.edit ? 'Edit Patient' : 'Create Patient'"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="4">
                <v-text-field
                  v-model="internalPatient.first_name"
                  label="First Name"
                  required
                />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="internalPatient.middle_name"
                  label="Middle Name"
                  required
                />
              </v-col>
  
              <v-col cols="4">
                <v-text-field
                  v-model="internalPatient.last_name"
                  label="Last Name"
                  required
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="internalPatient.email"
                  label="Email"
                  type="email"
                  required
                />
              </v-col>

              <v-col cols="6">
                <datepicker
                  label="Birthdate"
                  v-model="internalPatient.date_of_birth"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="internalPatient.status"
                  label="Status"
                  :items="['Inquiry', 'Onboarding', 'Active', 'Churned']"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" v-for="field in customFields" :key="field.id">
                <v-text-field
                  v-model="internalPatient[`custom-${field.id}`]"
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
import type { mergeProps } from 'vue';

    const dialog = ref(false)
    const internalPatient = ref({
      status: 'Inquiry',
    })
    const loading = ref(false)
    const api = useApi()
    const customFields = ref([])
    const { $nt } = useNuxtApp()

    const props = defineProps({
      patient: {
          type: Object,
          default: () => ({})
      },
      edit: {
          type: Boolean,
          default: false
      }
    })

    watch(dialog, (newVal) => {
        if (props.edit && newVal) {
          internalPatient.value = {...props.patient}
          internalPatient.value.additional_fields.map(field => {
            internalPatient.value[`custom-${field.id}`] = field.value
          })
        }
    })

    const emit = defineEmits(['refresh'])

    const fetchCustomFields = async () => {
        const { data } = await api({url: '/additional_field_configurations/'})
        customFields.value = data.results
    }

    const save = async () => {
        loading.value = true
        let url, method

        try {
          internalPatient.value.date_of_birth = new Date(internalPatient.value.date_of_birth).toISOString().slice(0, 10)
        }
        catch (error) {
          $nt.show('Invalid date format')
          loading.value = false
          return
        }

        if (props.edit) {
            url = `/patients/${props.patient.id}/`
            method = 'PATCH'
        } else {
            url = `/patients/`
            method = 'POST'
        }

        try {
          const { data } = await api({
              url,
              method,
              data: internalPatient.value
          })
          dialog.value = false
          internalPatient.value = {}
          emit('refresh')
        }
        catch (error) {          
          for (const key of Object.keys(error.response.data)) {
              $nt.show(`${key}: ${error.response.data[key]}`)
          }
        }
        loading.value = false
    }

    onMounted(fetchCustomFields)
</script>