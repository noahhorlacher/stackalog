<script setup>
definePageMeta({
  layout: 'fullwidth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription class="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form class="space-y-4">
            <div class="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <NuxtLink href="/auth/forgot-password" class="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </NuxtLink>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p class="text-center text-sm text-muted-foreground w-full">
            Don't have an account?
            <NuxtLink to="/auth/sign-up" class="text-blue-600 hover:underline font-medium">
              Sign up
            </NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </div>
</template>