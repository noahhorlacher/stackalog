<script setup>
import { computed } from 'vue'

const props = defineProps({
    icon: { type: String, required: true },
    color: { type: String, default: 'blue' }
})

const colorMap = {
    blue: {
        glow: 'from-blue-600/10 via-cyan-600/5',
        circle: 'from-blue-500/20 to-cyan-500/10',
        dot: 'bg-blue-400',
        text: 'text-blue-300',
        icon: 'text-blue-400',
        border: 'border-blue-500/20',
        cardShadow: 'shadow-blue-500/10 hover:shadow-blue-500/20',
        gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    green: {
        glow: 'from-green-600/10 via-emerald-600/5',
        circle: 'from-green-500/20 to-emerald-500/10',
        dot: 'bg-green-400',
        text: 'text-green-300',
        icon: 'text-green-400',
        border: 'border-green-500/20',
        cardShadow: 'shadow-green-500/10 hover:shadow-green-500/20',
        gradient: 'from-green-500/20 to-emerald-500/20'
    },
    violet: {
        glow: 'from-violet-600/10 via-indigo-600/5',
        circle: 'from-violet-500/20 to-indigo-500/10',
        dot: 'bg-violet-400',
        text: 'text-violet-300',
        icon: 'text-violet-400',
        border: 'border-violet-500/20',
        cardShadow: 'shadow-violet-500/10 hover:shadow-violet-500/20',
        gradient: 'from-violet-500/20 to-indigo-500/20'
    },
    yellow: {
        glow: 'from-yellow-600/10 via-orange-600/5',
        circle: 'from-yellow-500/20 to-orange-500/10',
        dot: 'bg-yellow-400',
        text: 'text-yellow-300',
        icon: 'text-yellow-400',
        border: 'border-yellow-500/20',
        cardShadow: 'shadow-yellow-500/10 hover:shadow-yellow-500/20',
        gradient: 'from-yellow-500/20 to-orange-500/20'
    }
}

const colorClasses = computed(() => colorMap[props.color] || colorMap.blue)
</script>

<template>
  <Card
    class="rounded-md relative gap-0 pt-6 pb-8 px-6 bg-gradient-to-br from-bg via-muted-foreground/8 to-bg border-0 shadow-2xl transition-all duration-500 overflow-hidden group"
    :class="colorClasses.cardShadow"
  >
    <!-- glow -->
    <div
      :class="[
        'absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity duration-500',
        colorClasses.glow
      ]"
    />
    <div
      :class="[
        'absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700',
        colorClasses.circle
      ]"
    />

    <!-- title and icon -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div :class="['w-2 h-2 rounded-full animate-pulse', colorClasses.dot]" />
        <span :class="['text-sm font-medium uppercase tracking-wider', colorClasses.text]">
          <slot name="title" />
        </span>
      </div>
      <div
        :class="[
          'p-2 bg-gradient-to-br rounded-2xl flex items-center justify-center backdrop-blur-sm border',
          colorClasses.gradient,
          colorClasses.border
        ]"
      >
        <Icon :name="icon" :class="colorClasses.icon" size="20" />
      </div>
    </div>

    <CardContent class="p-0 mt-2">
      <div class="space-y-4">
        <div class="flex items-baseline space-x-2">
          <span class="xl:text-4xl font-bold text-foreground">
            <slot name="value" />
          </span>
        </div>
        <div class="pt-4 border-t border-muted-foreground">
          <p class="text-sm text-muted-foreground">
            <slot name="description" />
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>