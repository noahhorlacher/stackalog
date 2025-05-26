<script setup>
definePageMeta({
    layout: 'fullwidth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
            <Icon name="tabler:mail" size="28" class="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle class="text-2xl font-bold text-center">Forgot password?</CardTitle>
          <CardDescription class="text-center">
            No worries! Enter your email address and we'll send you a NuxtLink to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form class="space-y-4">
            <div class="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>
            <Button type="submit" class="w-full">
              Send reset link
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