<template>
  <div
    class="full-width-section relative w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] left-[50%] ml-[calc(-50vw+0.75rem)] sm:ml-[calc(-50vw+1rem)] bg-opacity-10"
    :class="[
      roundedClass,
      paddingClass,
      variantClass,
      className
    ]"
    :style="backgroundStyles"
  >
    <div
      v-if="parsedPatternOverlay"
      class="absolute top-0 left-0 w-full h-full bg-repeat opacity-20 mix-blend-multiply z-0"
      :style="{
        backgroundImage: 'url(/images/hex-pattern.svg)',
        backgroundSize: '20px'
      }"
    ></div>
    <div class="w-full sm:w-11/12 max-w-screen-lg mx-auto my-0 px-4 sm:px-4 relative z-10" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'primary' | 'dark' | 'gradient';
  rounded?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundImage?: string;
  patternOverlay?: boolean | string;
  className?: string;
  contentClass?: string;
  gradientColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: true,
  padding: 'md',
  backgroundImage: '',
  patternOverlay: false,
  className: '',
  contentClass: '',
  gradientColor: ''
});

// Parse the patternOverlay prop to handle both boolean and string values
const parsedPatternOverlay = computed(() => {
  if (typeof props.patternOverlay === 'boolean') {
    return props.patternOverlay;
  }
  return props.patternOverlay === 'true';
});

const roundedClass = computed(() => {
  return props.rounded ? 'rounded-lg' : '';
});

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'none': return 'py-0';
    case 'sm': return 'py-2';
    case 'md': return 'py-4';
    case 'lg': return 'py-8';
    case 'xl': return 'py-12';
    default: return 'py-4';
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-zinc-800 dark:bg-zinc-800';
    case 'primary':
      return 'bg-primary-500 text-white';
    case 'dark':
      return 'bg-zinc-900 text-white';
    case 'gradient':
      if (props.gradientColor) {
        return `bg-gradient-to-br from-transparent via-${props.gradientColor}/50 to-transparent text-white`;
      }
      return 'bg-gradient-to-br from-transparent via-primary-500/50 to-transparent text-white';
    default:
      return 'bg-zinc-800 dark:bg-zinc-800';
  }
});

const backgroundStyles = computed(() => {
  if (!props.backgroundImage) return {};

  return {
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
});
</script>

<style scoped>
</style>
