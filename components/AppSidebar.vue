<script setup>
import { useSidebar } from "@/components/ui/sidebar";

const { open } = useSidebar()
const router = useRouter()
const route = useRoute()

const menuGroups = [
    {
        title: 'App',
        items: [
            {
                title: 'Stacks',
                url: '/stacks',
                icon: 'tabler:stack-2'
            },
            {
                title: 'Logs',
                url: '/logs',
                icon: 'tabler:logs'
            },
        ]
    },
    {
        title: 'Ihr Account',
        items: [
            {
                title: 'Präferenzen',
                url: '/preferences',
                icon: 'tabler:settings'
            }
        ]
    },
    {
        title: 'System',
        items: [
            {
                title: 'Benutzerverwaltung',
                url: '/users',
                icon: 'tabler:user'
            },
            {
                title: 'Support',
                url: '/support',
                icon: 'tabler:phone-ringing'
            },
        ]
    }
]

function signOut() {
    router.push('/auth/sign-out')
}

const user = {
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@example.com',
    isAdmin: true
}

const activePath = ref(`/${route.fullPath.split('/')[1]}`)
watch(() => route.fullPath, () => {
    activePath.value = `/${route.fullPath.split('/')[1]}`
})
</script>

<template>
    <Sidebar collapsible="icon" class="select-none">
        <SidebarHeader class="flex flex-row items-center gap-4">
            <img class="w-12 rounded-md hidden dark:flex bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-violet-500/30" src="/icon-white.svg" />
            <img class="w-12 rounded-md flex dark:hidden bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-violet-500/30" src="/icon-black.svg" />
            <div v-if="open">
                <p class="text-sm">Stackalog</p>
                <p class="text-xs text-muted-foreground">v 1.0.0</p>
            </div>
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup v-for="(menuGroup, index) in menuGroups" :key="`menugroup-${index}`">
                <SidebarGroupLabel v-if="open">{{ menuGroup.title }}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="(item, index) of menuGroup.items" :key="`sidebar-item-${index}`">
                            <SidebarMenuButton asChild
                                :class="activePath == item.url ? 'bg-gradient-to-r from-blue-500 to-violet-500 shadow-lg shadow-violet-500/30 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground' : 'hover:bg-muted hover:text-foreground'"
                                class="transition-colors">
                                <NuxtLink :to="item.url">
                                    <icon :name="item.icon" />
                                    <p v-if="open">{{ item.title }}</p>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>

                    <Drawer>
                        <DrawerTrigger class="w-full">
                            <div v-if="open" class="cursor-pointer px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-foreground transition-colors">
                                <div class="flex flex-row items-center justify-start w-full gap-x-4">
                                    <Avatar class="m-0 p-0 w-12 h-12">
                                        <AvatarFallback class="text-sm">{{ user.firstName.toUpperCase().charAt(0) +
                                            user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                                    </Avatar>
                                    <div class="text-left">
                                        <p class="text-sm">{{ user.firstName + '&nbsp;' + user.lastName }}</p>
                                        <p class="text-muted-foreground text-xs">{{ user.isAdmin ? 'Administrator' : 'Benutzer' }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="cursor-pointer">
                                <Avatar class="m-0 p-0">
                                    <AvatarFallback class="text-sm">{{ user.firstName.toUpperCase().charAt(0) +
                                        user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                                </Avatar>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent>

                            <DrawerHeader class="mt-8">
                                <DrawerTitle class="flex text-center flex-col items-center justify-center gap-2">
                                    <Avatar class="h-16 w-16 mx-auto mb-4">
                                        <AvatarFallback class="text-xl">{{ user.firstName.toUpperCase().charAt(0) +
                                            user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 class="text-lg font-medium">{{ user.firstName + '&nbsp;' + user.lastName }}
                                        </h4>
                                        <p class="text-muted-foreground text-sm">{{ user.email }}</p>
                                    </div>
                                </DrawerTitle>
                                <DrawerDescription class="flex justify-center mt-4">
                                    <RoleBadge :user />
                                </DrawerDescription>
                            </DrawerHeader>

                            <DrawerFooter class="mt-16">
                                <Button class="w-fit mx-auto mb-8 cursor-pointer" @click="signOut">
                                    <Icon name="tabler:arrow-right-to-arc" />
                                    <p>Abmelden</p>
                                </Button>
                            </DrawerFooter>

                        </DrawerContent>

                    </Drawer>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>