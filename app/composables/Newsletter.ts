const modalOpenModel = ref(false);
export const useNewsletter = () => {
  return { modalOpenModel, openModal: () => modalOpenModel.value = true };
}
