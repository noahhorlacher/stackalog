<script setup>
const router = useRouter()

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
                title: 'Benutzer',
                url: '#',
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
<Sidebar>
    <SidebarHeader>
        <img class="w-16 hidden dark:flex" src="/icon-white.svg" />
        <img class="w-16 flex dark:hidden" src="/icon-black.svg" />
    </SidebarHeader>

    <SidebarContent>
        <SidebarGroup v-for="menuGroup in menuGroups">
            <SidebarGroupLabel>{{ menuGroup.title }}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem v-for="item of menuGroup.items" :key="item.title">
                        <SidebarMenuButton asChild>
                            <NuxtLink :to="item.url">
                                <icon :name="item.icon" />
                                <span>{{item.title}}</span>
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
                    <Button variant="ghost" class="w-full">
                        <div class="flex items-center gap-2 justify-start w-full">
                            <Avatar>
                                <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
                                <AvatarFallback>MM</AvatarFallback>
                            </Avatar>
                            <p>Max Mustermann</p>
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>

                    <DrawerHeader class="mt-8">
                        <DrawerTitle class="flex items-center justify-center gap-4">
                            <Avatar>
                                <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
                                <AvatarFallback>MM</AvatarFallback>
                            </Avatar>
                            <p>Max Muster</p>
                        </DrawerTitle>
                        <DrawerDescription class="flex items-center justify-center gap-2">
                            <Icon name="tabler:shield-check" />
                            <p>Administrator</p>
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