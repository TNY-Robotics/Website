<template>
    <div class="flex flex-col p-2 py-4 md:px-4 lg:px-8 space-y-8 w-full">
        <div class="py-32">
            <h1 class="text-center text-5xl md:text-6xl lg:text-7xl"> {{ $t('tny360.name') }} </h1>
            <p class="text-center text-xl md:text-2xl"> {{ $t('tny360.title') }} </p>
        </div>
        <div class="flex items-center w-full min-h-[75vh] h-fit md:h-[75vh] bg-slate-200 dark:bg-slate-900 overflow-hidden rounded-lg">
            <div class="flex flex-col items-center w-full space-y-12 py-16">
                <h2 class="text-center text-primary"> {{ $t('tny360.project.title') }} </h2>

                <div class="flex flex-col space-y-8 px-8 md:max-w-[40em]">
                    <div class="space-y-2">
                        <div class="flex space-x-2">
                            <div class="flex w-fit items-center"> <UIcon name="i-heroicons-cube" class="w-6 h-6" /> </div>
                            <h3>{{ $t('tny360.project.print.title') }}</h3>
                        </div>
                        <p class="pl-8">
                            {{ $t('tny360.project.print.description') }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <div class="flex space-x-2">
                            <div class="flex w-fit items-center"> <UIcon name="i-heroicons-wrench-screwdriver" class="w-6 h-6" /> </div>
                            <h3>{{ $t('tny360.project.hardware.title') }}</h3>
                        </div>
                        <p class="pl-8">
                            {{ $t('tny360.project.hardware.description') }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <div class="flex space-x-2">
                            <div class="flex w-fit items-center"> <UIcon name="i-heroicons-code-bracket" class="w-6 h-6" /> </div>
                            <h3>{{ $t('tny360.project.software.title') }}</h3>
                        </div>
                        <p class="pl-8">
                            {{ $t('tny360.project.software.description') }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="hidden lg:flex flex-col w-full h-full -skew-x-12 bg-primary translate-x-20">
                <div class="skew-x-12">
                    
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
                    <div v-for="platform in platforms" :key="platform.type" class="flex flex-col bg-slate-300 dark:bg-slate-800 rounded-lg p-4 text-center space-y-8 w-64 m-4 shadow-lg card">
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
                        <UButton class="w-fit" to="/robots/tny-360/order" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
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
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('tny360.title')}`,
    description: t('tny360.description'),
    ogTitle:`TNY Robotics | ${t('tny360.title')}`,
    ogDescription: t('tny360.description'),
    ogUrl: 'https://tny-robotics.com',
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
  { number: 60, name: 'leds' },
  { number: 12, name: 'motors' },
];

const platforms = [
  {type: 'mobile', link: '/mobile'},
  {type: 'blocks', link: '/blocks'},
  {type: 'python', link: '/python'},
  {type: 'ros2', link: '/ros2'},
  {type: 'esp32', link: '/esp32'}
];
</script>

<style></style>