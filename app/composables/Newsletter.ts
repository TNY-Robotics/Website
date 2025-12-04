const modalOpenModel = ref(false);

export const useNewsletter = () => {
  const router = useRouter();
  const route = useRoute();

  watch(modalOpenModel, (newVal) => {
    if (newVal) {
      const query = { ...route.query, newsletter: 'true' };
      router.replace({ query });
    }
    else {
      const query = { ...route.query };
      delete query.newsletter;
      router.replace({ query });
    }
  });

  watch(() => route.query.newsletter, (newVal) => {
    modalOpenModel.value = newVal === 'true';
  }, { immediate: true });

  return { modalOpenModel, openModal: () => modalOpenModel.value = true };
}
