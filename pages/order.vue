<template>
    <div>
        Redirecting to <a href="https://tny-robotics.com/robots/tny-360/order"></a>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

router.push('/robots/tny-360/order');
</script>