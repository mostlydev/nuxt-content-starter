<template>
  <div
    class="content-box my-8 p-6 bg-opacity-10"
    :class="[
      roundedClass,
      shadowClass,
      paddingClass,
      variantClass,
      className
    ]"
  >
    <div :class="icon ? 'flex items-start' : ''">
      <div v-if="icon" class="mr-4 text-xl" :class="iconColorClass">
        <slot name="icon">
          <!-- Default icon slot -->
        </slot>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'primary' | 'dark' | 'gradient';
  rounded?: boolean;
  shadow?: boolean | string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: boolean;
  className?: string;
  gradientColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: true,
  shadow: false,
  padding: 'md',
  icon: false,
  className: '',
  gradientColor: ''
});

const roundedClass = computed(() => {
  return props.rounded ? 'rounded-lg' : '';
});

const shadowClass = computed(() => {
  return (props.shadow === true || props.shadow === 'true') ? 'shadow-lg' : '';
});

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'none': return 'p-0';
    case 'sm': return 'p-3';
    case 'md': return 'p-6';
    case 'lg': return 'p-8';
    case 'xl': return 'p-10';
    default: return 'p-6';
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-zinc-600';
    case 'primary':
      return 'bg-primary text-white';
    case 'gradient':
      if (props.gradientColor) {
        return `bg-gradient-to-br from-transparent via-${props.gradientColor}/25 to-transparent text-white`;
      }
      return 'bg-gradient-to-br from-transparent via-primary-500/25 to-transparent text-white';
    default:
      return 'bg-zinc-50 dark:bg-zinc-800';
  }
});

const iconColorClass = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'text-primary-500';
    case 'primary':
    case 'dark':
    case 'gradient':
      return 'text-white';
    default:
      return 'text-primary-500';
  }
});
</script>

<style scoped>
/* Ensure proper spacing for content within the box */
.content-box :deep(p:first-child) {
  @apply mt-0;
}

.content-box :deep(p:last-child) {
  @apply mb-0;
}
</style>
