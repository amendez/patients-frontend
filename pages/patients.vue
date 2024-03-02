<template>
    <div class="w-75">
        <v-main>
        <h1 class="mb-2">Patients</h1>
        
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
        
        <NuxtPage />
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

    onMounted(async () => {
        loading.value = true
        const { data } = await api({url: '/patients/'})
        patients.value = data.results
        loading.value = false
    })

    const handleClick = (_, row: any) => {
        // router.push({name: 'patients-id', params: {id: row.item.id}})
        router.push(`/patients/${row.item.id}`)
    }
</script>