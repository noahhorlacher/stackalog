<script setup>
definePageMeta({
    layout: 'fullwidth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center">Create account</CardTitle>
          <CardDescription class="text-center">Enter your information to create your account</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div class="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>

            <div class="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div class="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
              <p class="text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>

            <div class="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label
                htmlFor="terms"
                class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the
                <NuxtLink to="/terms" class="text-blue-600 hover:underline">
                  Terms of Service
                </NuxtLink>
                and
                <NuxtLink to="/privacy" class="text-blue-600 hover:underline">
                  Privacy Policy
                </NuxtLink>
              </Label>
            </div>

            <Button type="submit" class="w-full">
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p class="text-center text-sm text-muted-foreground w-full">
            Already have an account?
            <NuxtLink to="/auth/sign-in" class="text-blue-600 hover:underline font-medium">
              Sign in
            </NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </div>
</template>