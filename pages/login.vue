<template>
    <v-card class="mx-auto px-6 py-8 w-50">
        <v-card-title class="text-center">Sign In</v-card-title>
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
            <v-text-field
                v-model="email"
                bg-color="secondary"
                variant="solo"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Email"
                clearable
            />

            <v-text-field
                v-model="password"
                bg-color="secondary"
                variant="solo"
                :readonly="loading"
                :rules="[required]"
                label="Password"
                type="password"
                placeholder="Enter your password"
                clearable
            />

            <br>

            <v-btn
                :disabled="!form"
                :loading="loading"
                color="primary"
                size="large"
                type="submit"
                variant="elevated"
                block
            >
                <template v-slot:prepend>
                    <v-icon color="secondary">mdi-login</v-icon>
                </template>
                Sign In
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
    const api = useApi()
    const { $nt } = useNuxtApp()
    const router = useRouter()

    const form = ref(false)
    const email = ref(null)
    const password = ref(null)
    const loading = ref(false)


    const onSubmit = async () => {
        if (!form.value) return

        loading.value = true

        try {
            const { data } = await api({
                method: 'post',
                url: '/login/',
                data: {
                    email: email.value,
                    password: password.value
                }
            })
            localStorage.setItem('access-token', data.token)
            router.replace({name: 'patients'})
        } catch (error) {
            $nt.show(error.response.data.error)
        }
        loading.value = false
    }

    const required = (v: string) => {
        return !!v || 'Field is required'
    }
</script>
