<template>
    <div class="w-75">
        <v-main>
            <v-row>
                <v-col>
                    <h1 class="mb-2">Patients</h1>
                </v-col>
                <v-col class="text-right">
                    <create-patient @refresh="fetchPatients"/>
                </v-col>
            </v-row>
        
        <v-data-table
            :items="patients"
            :headers="headers"
            :loading="loading"
            hover
            @click:row="handleClick"
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
        </v-data-table>
        </v-main>
        
        <NuxtPage @refresh="fetchPatients" />
    </div>
</template>
<script setup lang="ts">
    const api = useApi()
    const router = useRouter()

    const patients = ref([])
    const loading = ref(true)

    const headers = ref([
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'full_name',
        },
        { title: 'Birthdate', key: 'date_of_birth' },
        { title: 'City', key: 'city' },
        { title: 'Status', key: 'status' },
    ])

    const fetchPatients = async () => {
        const { data } = await api({url: '/patients/'})
        patients.value = data.results
    }

    onMounted(async () => {
        loading.value = true
        fetchPatients()
        loading.value = false
    })

    const handleClick = (_, row: any) => {
        router.push(`/patients/${row.item.id}`)
    }
</script>