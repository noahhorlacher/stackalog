<template>
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger class="p-5 fixed ml-4 mt-4" variant="ghost" />
            
            <div class="py-12 px-24">
                <slot />
            </div>

        </main>
    </SidebarProvider>
</template>