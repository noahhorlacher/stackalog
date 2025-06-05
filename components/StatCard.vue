<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'blue'
    }
})
</script>

<template>
    <Card v-if="color === 'blue'" class="rounded-md relative gap-0 pt-6 pb-8 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-0 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden group">

        <!-- glow -->
        <div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />

        <!-- title and icon -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span class="text-sm font-medium text-blue-300 uppercase tracking-wider">
                    <slot name="title" />
                </span>
            </div>
            <div
                class="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/20">
                <Icon :name="icon" class="text-blue-400" size="20" />
            </div>
        </div>

        <CardContent class="p-0 mt-2">
            <div class="space-y-4">
                <div class="flex items-baseline space-x-2">
                    <span class="xl:text-4xl font-bold text-white">
                        <slot name="value" />
                    </span>
                </div>

                <div class="pt-4 border-t border-gray-700/50">
                    <p class="text-sm text-gray-400">
                        <slot name="description" />
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>

    <Card v-if="color === 'green'" class="rounded-md relative gap-0 pt-6 pb-8 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-0 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500 overflow-hidden group">

        <!-- glow -->
        <div
            className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />

        <!-- title and icon -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span class="text-sm font-medium text-green-300 uppercase tracking-wider">
                    <slot name="title" />
                </span>
            </div>
            <div
                class="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-500/20">
                <Icon :name="icon" class="text-green-400" size="20" />
            </div>
        </div>

        <CardContent class="p-0 mt-2">
            <div class="space-y-4">
                <div class="flex items-baseline space-x-2">
                    <span class="xl:text-4xl font-bold text-white">
                        <slot name="value" />
                    </span>
                </div>

                <div class="pt-4 border-t border-gray-700/50">
                    <p class="text-sm text-gray-400">
                        <slot name="description" />
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>

    <Card v-if="color === 'violet'" class="rounded-md relative gap-0 pt-6 pb-8 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-0 shadow-2xl shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-500 overflow-hidden group">

        <!-- glow -->
        <div
            className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-indigo-600/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />

        <!-- title and icon -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                <span class="text-sm font-medium text-violet-300 uppercase tracking-wider">
                    <slot name="title" />
                </span>
            </div>
            <div
                class="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-violet-500/20">
                <Icon :name="icon" class="text-violet-400" size="20" />
            </div>
        </div>

        <CardContent class="p-0 mt-2">
            <div class="space-y-4">
                <div class="flex items-baseline space-x-2">
                    <span class="xl:text-4xl font-bold text-white">
                        <slot name="value" />
                    </span>
                </div>

                <div class="pt-4 border-t border-gray-700/50">
                    <p class="text-sm text-gray-400">
                        <slot name="description" />
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>

    <Card v-if="color === 'yellow'" class="rounded-md relative gap-0 pt-6 pb-8 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-0 shadow-2xl shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-500 overflow-hidden group">

        <!-- glow -->
        <div
            className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-orange-600/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />

        <!-- title and icon -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span class="text-sm font-medium text-yellow-300 uppercase tracking-wider">
                    <slot name="title" />
                </span>
            </div>
            <div
                class="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-yellow-500/20">
                <Icon :name="icon" class="text-yellow-400" size="20" />
            </div>
        </div>

        <CardContent class="p-0 mt-2">
            <div class="space-y-4">
                <div class="flex items-baseline space-x-2">
                    <span class="xl:text-4xl font-bold text-white">
                        <slot name="value" />
                    </span>
                </div>

                <div class="pt-4 border-t border-gray-700/50">
                    <p class="text-sm text-gray-400">
                        <slot name="description" />
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
</template>