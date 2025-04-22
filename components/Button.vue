<template>
  <component
    :is="tag"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  tag: 'button'
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-500 hover:bg-primary-600 text-white border-transparent focus:ring-primary-500';
    case 'secondary':
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300 focus:ring-gray-500';
    case 'outline':
      return 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-gray-500';
    case 'text':
      return 'bg-transparent hover:bg-gray-50 text-gray-700 border-transparent focus:ring-gray-500';
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs px-2 py-1';
    case 'sm':
      return 'text-sm px-3 py-1.5';
    case 'md':
      return 'text-sm px-4 py-2';
    case 'lg':
      return 'text-base px-5 py-2.5';
    default:
      return '';
  }
});
</script>
