<template>
    <div class="flex grow flex-col">
        <div class="relative">
            <div id="particle-container" class="absolute w-full h-full overflow-hidden" />
            <div id="header-zone" class="py-32">
                <h1> {{ $t('tny360.name') }} </h1>
                <p class="subtitle">{{ $t('tny360.title') }}</p>
            </div>
        </div>
        <XHeader />
        <div class="flex flex-col w-full h-fit space-y-16 p-2 lg:p-8">
            <div class="flex items-center w-full min-h-[75vh] h-fit md:h-[75vh] bg-slate-200 dark:bg-slate-900 overflow-hidden rounded-lg">
                <div class="flex flex-col items-center w-full space-y-12 py-16">
                    <h2 class="text-center text-primary"> {{ $t('tny360.project.title') }} </h2>

                    <div class="flex flex-col space-y-8 px-8 md:max-w-[40em]">
                        <div class="space-y-2">
                            <div class="flex space-x-2">
                                <div class="flex w-fit items-center"> <UIcon name="i-heroicons-cube" class="w-6 h-6" /> </div>
                                <h3>{{ $t('tny360.project.print.title') }}</h3>
                            </div>
                            <p class="text-center lg:text-left pl-8">
                                {{ $t('tny360.project.print.description') }}
                            </p>
                        </div>
                        <div class="space-y-2">
                            <div class="flex space-x-2">
                                <div class="flex w-fit items-center"> <UIcon name="i-heroicons-wrench-screwdriver" class="w-6 h-6" /> </div>
                                <h3>{{ $t('tny360.project.hardware.title') }}</h3>
                            </div>
                            <p class="text-center lg:text-left pl-8">
                                {{ $t('tny360.project.hardware.description') }}
                            </p>
                        </div>
                        <div class="space-y-2">
                            <div class="flex space-x-2">
                                <div class="flex w-fit items-center"> <UIcon name="i-heroicons-code-bracket" class="w-6 h-6" /> </div>
                                <h3>{{ $t('tny360.project.software.title') }}</h3>
                            </div>
                            <p class="text-center lg:text-left pl-8">
                                {{ $t('tny360.project.software.description') }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="hidden lg:flex flex-col w-full h-full -skew-x-12 bg-primary translate-x-20">
                    <div class="flex justify-center items-center skew-x-12 grow">
                        <img src="~/assets/img/tny360-full.png" alt="" class="translate-y-4 drop-shadow-lg w-[80%]">
                    </div>
                </div>
            </div>

            <div class="flex flex-col py-16 min-h-[75vh] space-y-12">
            <h2 class="text-center text-primary"> {{ $t('tny360.sensorsAndActuators') }} </h2>

            <div class="flex w-full h-fit">
                <div class="flex flex-col w-full items-end px-3 md:px-8 space-y-8">
                    <h3 class="mx-4 border-b-2 border-slate-700 dark:border-slate-50"> {{ $t('tny360.sensors.title') }} </h3>
                    <div v-for="sensor in sensors" :key="sensor.name" class="card p-2 md:p-4 w-full max-w-96 h-48 md:h-32 space-y-2">
                        <p class="text-xl font-semibold">
                            <span class="text-primary font-semibold pr-1">x{{ sensor.number }}</span>
                            {{ $t(`tny360.sensors.${sensor.name}.title`) }}
                        </p>
                        <p> {{ $t(`tny360.sensors.${sensor.name}.description`) }} </p>
                    </div>
                </div>
                <span class="flex w-2 rounded-full bg-primary" />
                <div class="flex flex-col w-full items-start px-3 md:px-8 space-y-8">
                    <h3 class="mx-4 border-b-2 border-slate-700 dark:border-slate-50"> {{ $t('tny360.actuators.title') }} </h3>
                    <div v-for="actuator in actuators" :key="actuator.name" class="card p-2 md:p-4 w-full max-w-96 h-48 md:h-32 space-y-2">
                        <p class="text-xl font-semibold">
                            <span class="text-primary font-semibold pr-1">x{{ actuator.number }}</span>
                            {{ $t(`tny360.actuators.${actuator.name}.title`) }}
                        </p>
                        <p> {{ $t(`tny360.actuators.${actuator.name}.description`) }} </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col py-16 min-h-[75vh] space-y-12 bg-slate-200 dark:bg-slate-900 rounded-lg">
            <h2 class="text-center text-primary"> {{ $t('tny360.learn.title') }} </h2>

            <div class="flex grow w-full justify-start overflow-auto">
                <div class="flex px-2 mx-auto mb-2">
                    <div v-for="platform in platforms" :key="platform.type" class="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center space-y-8 w-64 m-4 shadow-lg card">
                        <h3>
                            {{ $t(`tny360.learn.${platform.type}.title`) }}
                        </h3>
                        <div>
                            <p> {{ $t(`tny360.learn.${platform.type}.description`) }} </p>
                        </div>
                        <div class="flex grow items-end justify-center pb-4">
                            <UButton :to="platform.link" variant="solid" size="md">
                                {{ $t(`tny360.learn.${platform.type}.button`) }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-16 min-h-[75vh] space-y-12">
            <h2 class="text-center text-primary"> {{ $t('tny360.build.title') }} </h2>

            <div class="flex flex-wrap justify-evenly">
                <div class="card flex flex-col w-full md:w-1/4 m-4 p-4 space-y-4">
                    <h3> {{ $t('tny360.build.order.title') }} </h3>
                    <p class="flex grow"> {{ $t('tny360.build.order.description') }} </p>
                    <div class="flex w-full justify-start">
                        <UButton class="w-fit" to="https://www.kickstarter.com/projects/furwaz/1456182268?ref=6fk4n3&token=4902aa56" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            {{ $t('tny360.build.order.button') }}
                        </UButton>
                    </div>
                </div>
                <div class="card flex flex-col w-full md:w-1/4 m-4 p-4 space-y-4">
                    <h3> {{ $t('tny360.build.scratch.title') }} </h3>
                    <p class="flex grow"> {{ $t('tny360.build.scratch.description') }} </p>
                    <div class="flex w-full justify-start">
                        <UButton class="w-fit" to="https://docs.tny-robotics.com" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            {{ $t('tny360.build.scratch.button') }}
                        </UButton>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: `${t('tny360.name')} - ${t('tny360.title')}`,
    description: t('tny360.description'),
    ogTitle: t('tny360.title'),
    ogDescription: t('tny360.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, sensors, actuators, learn, build',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

const sensors = [
  { number: 1, name: 'camera' },
  { number: 1, name: 'microphone' },
  { number: 2, name: 'laser' },
  { number: 12, name: 'potentiometer' },
  { number: 1, name: 'mpu' },
  { number: 4, name: 'pressure' },
];
const actuators = [
  { number: 1, name: 'screen' },
  { number: 1, name: 'speaker' },
  { number: 48, name: 'leds' },
  { number: 14, name: 'motors' },
];

const platforms = [
  {type: 'mobile', link: 'https://docs.tny-robotics.com/TNY-360/usage/mobile-app/'},
  {type: 'blocks', link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/blocks/'},
  {type: 'python', link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/python/'},
  {type: 'ros2', link: 'https://docs.tny-robotics.com/TNY-360/usage/programming/ros2/'},
  {type: 'esp32', link: 'https://docs.tny-robotics.com/TNY-360/operation/software/'}
];
</script>

<style>
@import 'tailwindcss';
.card {
    @apply rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-lg
}
</style>