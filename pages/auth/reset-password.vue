<script setup>
definePageMeta({
    layout: 'fullwidth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <Icon name="tabler:shield" size="28" class="w-6 h-6 text-green-600" />
          </div>
          <CardTitle class="text-2xl font-bold text-center">Reset password</CardTitle>
          <CardDescription class="text-center">
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form class="space-y-4">
            <div class="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" required />
              <p class="text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>

            <div class="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <Button type="submit" class="w-full">
              Update password
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <NuxtLink
            to="/auth/sign-in"
            class="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
          >
            <Icon name="tabler:arrow-left" class="mr-2" />
            Back to sign in
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>
</template>