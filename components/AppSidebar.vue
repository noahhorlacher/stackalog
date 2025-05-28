<script setup>
const router = useRouter()
import { useSidebar } from "@/components/ui/sidebar";

const { open } = useSidebar()

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
        title: 'System',
        items: [
            {
                title: 'Benutzerverwaltung',
                url: '/users',
                icon: 'tabler:user'
            },
                        {
                title: 'Einstellungen',
                url: '/preferences',
                icon: 'tabler:settings'
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
</script>

<template>
<Sidebar collapsible="icon">
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
                        <SidebarMenuButton asChild>
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
                                <AvatarFallback class="text-sm">MM</AvatarFallback>
                            </Avatar>
                            <p>Max&nbsp;Mustermann</p>
                        </div>
                    </SidebarMenuButton>
                    <div v-else class="cursor-pointer">
                        <Avatar class="m-0 p-0">
                            <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
                            <AvatarFallback class="text-sm">MM</AvatarFallback>
                        </Avatar>
                    </div>
                </DrawerTrigger>
                <DrawerContent>

                    <DrawerHeader class="mt-8">
                        <DrawerTitle class="flex text-center flex-col items-center justify-center gap-2">
                            <Avatar class="h-16 w-16 mx-auto mb-4">
                                <AvatarFallback class="text-xl">MM</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 class="text-lg font-medium">Max Mustermann</h4>
                                <p class="text-muted-foreground text-sm">max.mustermann@example.com</p>
                            </div>
                        </DrawerTitle>
                        <DrawerDescription class="flex items-center justify-center gap-2">
                            <Badge variant="default" class="mt-4">
                                <Icon name="tabler:shield-check" />
                                <p>Administrator</p>
                            </Badge>
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter class="mt-16">
                        <Button class="w-fit mx-auto mb-8 cursor-pointer" @click="signOut">
                            <Icon name="tabler:arrow-right-to-arc" />
                            <p>Abmelden</p>
                        </Button>
                        <!-- <DrawerClose>
                            <Button variant="outline">
                                Abbrechen
                            </Button>
                        </DrawerClose> -->
                    </DrawerFooter>

                </DrawerContent>

            </Drawer>
          </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>