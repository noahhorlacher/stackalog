<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-full">
            <SidebarTrigger class="p-5 fixed ml-4 mt-4" variant="ghost" />
            
            <div class="py-12 px-24 max-w-[1400px] mx-auto">
                <slot />
            </div>

        </main>
    </SidebarProvider>
</template>