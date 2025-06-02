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
    <SidebarHeader class="flex flex-row items-center">
        <img class="w-16 hidden dark:flex" src="/icon-white.svg" />
        <img class="w-16 flex dark:hidden" src="/icon-black.svg" />
        <p v-if="open">Stackalog</p>
    </SidebarHeader>

    <SidebarContent>
        <SidebarGroup v-for="menuGroup in menuGroups">
            <SidebarGroupLabel v-if="open">{{ menuGroup.title }}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem v-for="item of menuGroup.items" :key="item.title">
                        <SidebarMenuButton asChild :class="activePath == item.url ? 'bg-muted/50' : ''">
                            <NuxtLink :to="item.url">
                                <icon :name="item.icon" />
                                <p v-if="open">{{item.title}}</p>
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
                    <SidebarMenuButton v-if="open" class="cursor-pointer">
                        <div class="flex flex-row items-center justify-start w-full gap-x-2">
                            <Avatar class="m-0 p-0">
                                <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
                                <AvatarFallback class="text-sm">{{ user.firstName.toUpperCase().charAt(0) + user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                            </Avatar>
                            <p>{{ user.firstName + '&nbsp;' + user.lastName }}</p>
                        </div>
                    </SidebarMenuButton>
                    <div v-else class="cursor-pointer">
                        <Avatar class="m-0 p-0">
                            <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
                            <AvatarFallback class="text-sm">{{ user.firstName.toUpperCase().charAt(0) + user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                        </Avatar>
                    </div>
                </DrawerTrigger>
                <DrawerContent>

                    <DrawerHeader class="mt-8">
                        <DrawerTitle class="flex text-center flex-col items-center justify-center gap-2">
                            <Avatar class="h-16 w-16 mx-auto mb-4">
                                <AvatarFallback class="text-xl">{{ user.firstName.toUpperCase().charAt(0) + user.lastName.toUpperCase().charAt(0) }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 class="text-lg font-medium">{{ user.firstName + '&nbsp;' + user.lastName }}</h4>
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