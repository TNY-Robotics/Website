<template>
    <div class="space-y-32 pb-64">
        <div class="flex w-full h-fit px-4 lg:px-24 pt-8 bg-white dark:bg-slate-900">
            <div class="flex flex-col w-full lg:w-1/2 space-y-4 justify-center items-center lg:items-start py-32 lg:py-48">
                <h1 class="whitespace-nowrap text-5xl lg:text-7xl font-extrabold text-center lg:text-start">TNY - 360</h1>
                <p class="text-xl lg:text-4xl text-center lg:text-start"> Un condensé de technologie pour <span class="text-primary">comprendre</span>, <span class="text-primary">intéragir</span> et <span class="text-primary">apprendre</span> !</p>
                <div class="pt-8">
                    <UButton label="S'inscrire à la liste d'attente" size="xl" @click="emailModal = true" />
                </div>
            </div>
        </div>

        <div class="px-4 lg:px-8">
            <div class="flex items-center w-full min-h-[75vh] h-fit md:h-[75vh] bg-white border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-900 overflow-hidden rounded-lg">
                <div class="flex flex-col items-center w-full space-y-12 py-16">
                    <h2 class="text-center px-4"> Un projet <span class="text-primary">100% <span class="whitespace-nowrap">Open-Source</span></span> ! </h2>

                    <div class="flex flex-col space-y-8 px-4 lg:px-8 md:max-w-[40em]">
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-cube" class="w-8 h-8" /> </div>
                                <h3 class="text-center lg:text-left">Pièces 3D imprimables facilement</h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                Toutes les pièces du TNY-360 sont conçues pour être imprimées en 3D avec un minimum de supports, sur n'importe quel type d'imprimante FDM !
                            </p>
                        </div>
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-wrench-screwdriver" class="w-8 h-8" /> </div>
                                <h3 class="text-center lg:text-left">Schémas matériels accessibles</h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                Tous les schémas matériels et plans sont disponibles gratuitement pour construire son propre TNY-360 !
                            </p>
                        </div>
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-code-bracket" class="w-8 h-8" /> </div>
                                <h3 class="text-center lg:text-left">Logiciel collaboratif ouvert</h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                Tout le logiciel est open-source et ouvert aux contributions, pour rendre le TNY-360 encore meilleur !
                            </p>
                        </div>
                    </div>
                </div>
                <div class="hidden xl:flex flex-col w-full h-full -skew-x-12 bg-primary-400 translate-x-20 shadow-2xl border-l-4 border-primary-500 dark:border-primary-400">
                    <div class="flex justify-center items-center skew-x-12 grow">
                        <img src="~/assets/img/tny360-full.png" alt="" class="translate-y-4 drop-shadow-lg w-[80%]">
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col py-16 min-h-[75vh] space-y-12">
            <h2 class="text-center px-4"> Commences à apprendre <span class="text-primary">à n'importe quel niveau</span> </h2>

            <div class="flex grow w-full justify-start overflow-auto">
                <div class="flex w-full justify-evenly">
                    <div v-for="platform in platforms" :key="platform.type" class="flex flex-col bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4 pt-8 text-center space-y-8 w-1/6 min-w-64 lg:min-w-75 m-4 shadow-lg card">
                        <h3 class="text-primary">
                            {{ platform.title }}
                        </h3>
                        <div>
                            <p> {{ platform.description }} </p>
                        </div>
                        <div class="flex grow items-end justify-center pb-4">
                            <UButton :to="platform.link" variant="solid" size="lg">
                                {{ platform.button }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 lg:px-16">
            <div class="space-y-4">
                <h2 class="text-3xl lg:text-4xl font-bold"> Spécifications techniques </h2>
                <div class="w-2/5">
                    <table class="table-auto w-full">
                        <thead>
                            <tr>
                                <th class="dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 text-left"> Composant </th>
                                <th class="dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 text-left"> Détail </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="line in specs" :key="line.component">
                                <td class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2"> {{ line.component }} </td>
                                <td class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2"> {{ line.detail }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="relative flex flex-col py-16 space-y-12">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-200 dark:bg-slate-900 translate-y-4 scale-y-120 scale-x-200"></div>
            <h2 class="text-center z-20 px-4"> <span class="text-primary">Construis</span> ou <span class="text-primary">commandes</span> ton propre TNY-360 ! </h2>

            <div class="flex flex-wrap justify-evenly z-20">
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg flex flex-col w-full md:w-1/3 m-4 p-8 space-y-4">
                    <h3> Tu te sens aventurier ? </h3>
                    <p class="flex grow"> Tu peux construire ton propre TNY-360 en recevant les pièces détachées et le guide d'assemblage ! </p>
                    <div class="flex w-full justify-start pt-4">
                        <UButton class="w-fit" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            Se lancer dans l'aventure
                        </UButton>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg flex flex-col w-full md:w-1/3 m-4 p-8 space-y-4">
                    <h3> Tu veux commencer maintenant ? </h3>
                    <p class="flex grow"> Commandes ton TNY-360 maintenant et reçois-le chez toi, entièrement assemblé ou à construire toi-même ! </p>
                    <div class="flex w-full justify-start pt-4">
                        <UButton class="w-fit" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            Commander maintenant
                        </UButton>
                    </div>
                </div>
            </div>
        </div>

        <UModal v-model:open="emailModal" title="Rejoindre la liste d'attente">
            <template #body>
                <div class="flex flex-col justify-start items-start space-y-4">
                    <p> Inscrivez-vous à notre liste d'attente pour être informé de la sortie officielle du <span class="text-primary">TNY - 360</span> ! </p>
                    <p> En vous inscrivant, vous recevrez des mises à jour exclusives, des offres spéciales et la possibilité de précommander le robot avant son lancement public. </p>
                    <UForm :schema="emailFormSchema" :state="emailFormState" @submit="onEmailFormSubmit" class="w-fit mx-auto text-center py-8 space-y-4">
                        <UFormField name="email" label="" class="">
                            <UInput v-model="emailFormState.email" type="email" placeholder="john.doe@exemple.com" :disabled="emailButtonDisabled" />
                        </UFormField>
                        <UAlert v-show="emailSent" variant="subtle" color="success" icon="i-heroicons-check-circle-20-solid" class="flex text-start justify-center items-center"
                            title="Inscription réussie !"
                            description="Merci de vous être inscrit à la liste d'attente ! Nous vous enverrons bientôt des nouvelles.">
                        </UAlert>
                        <UButton type="submit" label="Rejoindre la liste d'attente" size="lg" class="mt-4" :loading="emailButtonLoading" :disabled="emailButtonDisabled" />
                    </UForm>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, type InferType } from 'yup';

const emailModal = ref(false);

const emailFormSchema = object({
    email: string().email('Veuillez entrer une adresse e-mail valide').required('L\'adresse e-mail est requise'),
});
const emailFormState = reactive({
    email: '',
});
const emailButtonLoading = ref(false);
const emailSent = ref(false);
const emailButtonDisabled = computed(() => {
    return emailButtonLoading.value || emailSent.value;
});

type EmailFFormSchema = InferType<typeof emailFormSchema>;

function onEmailFormSubmit(event: FormSubmitEvent<EmailFFormSchema>) {
    emailButtonLoading.value = true;
    setTimeout(() => { // TODO : send to backend
        emailSent.value = true;
        emailButtonLoading.value = false;
    }, 2000);
}

const specs = [
    { component: 'Processeur', detail: 'ESP32-S3 version N16R8' },
    { component: 'Moteurs', detail: '12x Servomoteurs MG996R 180° 14kg.cm, avec retour de position' },
    { component: 'Caméra', detail: 'Caméra HD OV2640, FOV 120°' },
    { component: 'Écran', detail: 'Écran OLED 1.3" 128x64 avec controlleur SH1106' },
    { component: 'IMU', detail: 'MPU6050 6-axes (Accéléromètre + Gyroscope)' },
    { component: 'Communication', detail: 'Wi-Fi 2.4GHz 802.11 b/g/n, Bluetooth 4.0' },
    { component: 'Alimentation', detail: 'Batterie Li-Po 3S 12.6V 5000mAh' },
];

const platforms = [
    {
        type: 'mobile',
        link: 'https://docs.tny-robotics.com/TNY-360/usage/mobile-app/',
        title: 'Application mobile compagnon',
        description: 'Contrôle ton TNY-360 avec ton smartphone, et vois les retours de ses capteurs en temps réel !',
        button: 'Télécharger l\'application'
    },
    {
        type: 'blocks',
        link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/blocks/',
        title: 'Programmation par blocs',
        description: 'Programme ton TNY-360 avec une interface par blocs, et commence la robotique en un rien de temps !',
        button: 'Essayer maintenant'
    },
    {
        type: 'python',
        link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/python/',
        title: 'Programmation Python',
        description: 'Écris tes propres scripts en Python pour contrôler ton TNY-360, et libère tout son potentiel !',
        button: 'Commencer à coder'
    },
    {
        type: 'ros2',
        link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/ros2/',
        title: 'Intégration ROS 2',
        description: 'Intègre ton TNY-360 au Robot Operating System, et bénéficie d\'un middleware robotique puissant !',
        button: 'En savoir plus'
    },
    {
        type: 'esp32',
        link: 'https://docs.tny-robotics.com/TNY-360/operation/software/',
        title: 'Développement ESP32',
        description: 'Développe ton propre firmware pour l\'ESP32, et personnalise ton TNY-360 à volonté !',
        button: 'Voir plus'
    },
];

</script>

<style></style>