<script setup lang="ts">
    const router = useRouter()

    onMounted(async () => {
        router.push('/patients')
    })
</script>