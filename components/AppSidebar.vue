<script setup>
const menuGroups = [
    {
        title: 'App',
        items: [
            {
                title: 'Stacks',
                url: '#',
                icon: 'tabler:stack-2'
            },
            {
                title: 'Logs',
                url: '#',
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
                title: 'Ihr Account',
                url: '#',
                icon: 'tabler:settings'
            },
            {
                title: 'Support',
                url: '#',
                icon: 'tabler:phone-ringing'
            },
        ]
    }
]
</script>

<template>
<Sidebar>
    <SidebarHeader>
        <img class="w-16" src="/icon-white.svg" />
    </SidebarHeader>

    <SidebarContent>
        <SidebarGroup v-for="menuGroup in menuGroups">
            <SidebarGroupLabel>{{ menuGroup.title }}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem v-for="item of menuGroup.items" :key="item.title">
                    <SidebarMenuButton asChild>
                        <a :href="item.url">
                            <icon :name="item.icon" />
                            <span>{{item.title}}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div class="flex items-center justify-between">
                <div class="flex gap-2 items-center">
                    <Icon name="tabler:user" /> Max Mustermann
                </div>
                <Button variant="ghost">
                    <Icon name="tabler:arrow-bar-right" />
                </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>