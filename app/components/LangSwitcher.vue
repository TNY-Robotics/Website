<template>
    <div class="flex w-fit h-fit">
        <USelect icon="lucide:globe" v-model="selectedLocale" :items="localesOptions" /> 
    </div>
</template>

<script lang="ts" setup>
const { t, locale, locales, setLocale } = useI18n();

const selectedLocale = ref(locale.value);

const localesOptions = computed(() => locales.value.map((locale) => ({
    value: locale.code,
    label: t(`language.${locale.code}`)
})));

watch(locale, (val) => {
    if (val !== selectedLocale.value) {
        selectedLocale.value = val;
    }
});

watch(selectedLocale, async (val, old) => {
    if (val === old || val === locale.value) return;

    await setLocale(val);
});

</script>