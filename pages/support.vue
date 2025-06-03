<script setup>
useSeoMeta({
  title: 'Stackalog — Support'
})

const supportHours = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '10:00', close: '16:00' },
  sunday: null // closed
}

const supportContact = {
  email: 'support@example.com',
  phone: '+41 12 345 67 89'
}

const securityContact = {
  email: 'security@example.com',
  phone: '+41 23 456 78 90'
}

// FAQ data
const faqItems = [
  {
    category: "account",
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to create a new password. Make sure to check your spam folder if you don't see the email in your inbox.",
  },
  {
    category: "account",
    question: "How do I change my email address?",
    answer:
      "You can change your email address in your account settings. Go to your profile, click on 'Edit Profile', and update your email address. You'll need to verify the new email address before the change takes effect.",
  },
  {
    category: "account",
    question: "Can I have multiple user accounts?",
    answer:
      "No, our policy allows only one account per user. Creating multiple accounts may result in account suspension. If you need additional access for team members, consider using our team management features instead.",
  },
  {
    category: "billing",
    question: "How do I update my billing information?",
    answer:
      "To update your billing information, go to 'Account Settings' > 'Billing' and click on 'Update Payment Method'. You can add a new card or edit your existing payment details there.",
  },
  {
    category: "billing",
    question: "When will I be charged for my subscription?",
    answer:
      "Your subscription is billed at the beginning of each billing cycle. For monthly plans, you'll be charged on the same date each month. For annual plans, you'll be charged once a year on your subscription anniversary.",
  },
  {
    category: "billing",
    question: "How do I cancel my subscription?",
    answer:
      "To cancel your subscription, go to 'Account Settings' > 'Billing' > 'Subscription' and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
  },
  {
    category: "features",
    question: "How do I create a new user?",
    answer:
      "To create a new user, go to the User Management page and click on the 'Add User' button. Fill in the required information and click 'Create User'. The new user will receive an email invitation to set up their account.",
  },
  {
    category: "features",
    question: "What's the difference between user roles?",
    answer:
      "We offer three user roles: Admin, Moderator, and User. Admins have full access to all features and settings. Moderators can manage content but cannot change system settings. Users have basic access to use the platform but cannot modify settings or other users.",
  },
  {
    category: "features",
    question: "How do I export user data?",
    answer:
      "To export user data, go to the User Management page, use the filters to select the users you want to export, then click on the 'Export' button. You can choose between CSV, Excel, or PDF formats for your export.",
  },
  {
    category: "technical",
    question: "Which browsers are supported?",
    answer:
      "Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported. For the best experience, we recommend keeping your browser updated to the latest version.",
  },
  {
    category: "technical",
    question: "Is there a mobile app available?",
    answer:
      "Yes, we offer mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store. Our mobile apps provide most of the functionality available on the web platform.",
  },
  {
    category: "technical",
    question: "How secure is my data?",
    answer:
      "We take security very seriously. All data is encrypted in transit and at rest. We use industry-standard security practices, regular security audits, and maintain compliance with relevant data protection regulations.",
  },
]

const supportOnline = ref(isSupportOnline(supportHours))
// update support online
setInterval(() => {
  supportOnline.value = isSupportOnline(supportHours)
}, 60_000)

function isSupportOnline(hours) {
  const now = new Date()
  const dayIndex = now.getDay() // 0 = sunday
  const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const today = hours[dayMap[dayIndex]]

  if (!today) return false // no support today

  const [openHour, openMinute] = today.open.split(':').map(Number)
  const [closeHour, closeMinute] = today.close.split(':').map(Number)

  const openTime = new Date(now)
  openTime.setHours(openHour, openMinute, 0, 0)

  const closeTime = new Date(now)
  closeTime.setHours(closeHour, closeMinute, 0, 0)

  return now >= openTime && now <= closeTime
}

function isSubmitting() {
  // This function should return true if the form is currently being submitted
  // For now, we will just return false
  return false
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Support</h1>
      <p class="text-muted-foreground">
        Unser Supportteam ist für Sie da
      </p>
    </div>

    <Tabs default-value="contact">
      <TabsList class="w-full mb-4">
        <TabsTrigger value="contact">
          <Icon name="tabler:phone" />
          Contact
        </TabsTrigger>
        <TabsTrigger value="faq">
          <Icon name="tabler:question-mark" />
          FAQ
        </TabsTrigger>
        <TabsTrigger value="documentation">
          <Icon name="tabler:file-certificate" />
          Dokumentation
        </TabsTrigger>
      </TabsList>

      <!-- contact section -->
      <TabsContent value="contact">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Icon name="tabler:message" />
                  Schicken Sie eine Supportanfrage
                </CardTitle>
                <CardDescription>Füllen Sie das Formular unten aus und wir melden uns sobald wie möglich.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form @submit="" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label htmlFor="firstName">Vor- und Mittelname(n)*</Label>
                      <Input id="firstName" placeholder="Max" required />
                    </div>
                    <div class="space-y-2">
                      <Label htmlFor="lastName">Nachname*</Label>
                      <Input id="lastName" placeholder="Mustermann" required />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="email">Email Adresse*</Label>
                    <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="category">Kategorie*</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:users" />
                            Account
                          </div>
                        </SelectItem>
                        <SelectItem value="technical">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:settings" />
                            Technisches Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="security">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:shield" />
                            Sicherheit & Privatsphäre
                          </div>
                        </SelectItem>
                        <SelectItem value="other">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:help-circle" />
                            Anderes
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            Niedrig - Generelles Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                            Mittel - Standard Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                            Hoch - Dringendes Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="critical">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            Kritisch - Service down
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="subject">Betreff*</Label>
                    <Input id="subject" placeholder="Eine Kurzbeschreibung Ihres Problems" required />
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="message">Nachricht*</Label>
                    <Textarea id="message"
                      placeholder="Bitte geben Sie detaillierte Informationen zu Ihrem Problem an, einschließlich aller Fehlermeldungen und Schritte, mit denen sich das Problem reproduzieren lässt."
                      class="min-h-[120px]" required />
                  </div>

                  <div class="space-y-2">
                    <Label>Anhänge</Label>
                    <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Icon name="tabler:file-upload" class="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p class="text-sm text-muted-foreground mb-2">Drag und droppen Sie Dateien hier, oder klicken Sie,
                        um nach Dateien zu suchen.</p>
                      <input type="file" multiple class="hidden" id="file-upload"
                        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt" />
                      <Button type="button" variant="outline" size="sm">
                        Dateien wählen
                      </Button>
                      <p class="text-xs text-muted-foreground mt-2">
                        Maximal 10MB pro Datei. Unterstützte Dateitypen: JPG, PNG, PDF, DOC, TXT
                      </p>
                    </div>

                  </div>

                  <Button type="submit" class="w-full" :disabled="isSubmitting">
                    Supportanfrage abschicken
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Alert>
              <AlertTitle class="flex items-center gap-2">
                <Icon name="tabler:alert-circle" />
                Dringende Sicherheitsprobleme
              </AlertTitle>
              <AlertDescription>
                Bei dringenden Sicherheitsproblemen kontaktieren Sie uns bitte umgehend unter {{ securityContact.email
                }}
                oder rufen Sie unsere Notfall-Hotline unter {{ securityContact.phone }} an.
              </AlertDescription>
            </Alert>
          </div>

          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Andere Kontaktwege</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center gap-3">
                  <Icon name="tabler:mail" class="text-muted-foreground" />
                  <div>
                    <p class="font-medium">Email</p>
                    <p class="text-sm text-muted-foreground">{{ supportContact.email }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="tabler:phone" class="text-muted-foreground" />
                  <div>
                    <p class="font-medium">Telefon</p>
                    <p class="text-sm text-muted-foreground">{{ supportContact.phone }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Icon name="tabler:clock" class="h-5 w-5" />
                  Support Zeiten
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div v-for="(hours, day) in supportHours" :key="day" class="flex justify-between">
                  <span class="text-sm capitalize">
                    {{
                      {
                        monday: 'Montag',
                        tuesday: 'Dienstag',
                        wednesday: 'Mittwoch',
                        thursday: 'Donnerstag',
                        friday: 'Freitag',
                        saturday: 'Samstag',
                        sunday: 'Sonntag'
                      }[day]
                    }}
                  </span>
                  <span class="text-sm font-medium">
                    {{ hours ? `${hours.open} - ${hours.close}` : 'Geschlossen' }}
                  </span>
                </div>
                <Separator />
                <div class="flex items-center gap-2">
                  <div v-if="supportOnline" class="w-2 h-2 rounded-full bg-green-500"></div>
                  <div v-else class="w-2 h-2 rounded-full bg-red-500"></div>
                  <span class="text-sm font-medium">{{ supportOnline ? 'Momentan Online' : 'Derzeit Offline' }}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durchschnittliche Antwortdauer</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-red-500"></div>
                    <span class="text-sm">Kritisch</span>
                  </div>
                  <Badge variant="destructive">1 Stunde</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span class="text-sm">Hoch</span>
                  </div>
                  <Badge variant="secondary">4 Stunden</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span class="text-sm">Mittel</span>
                  </div>
                  <Badge variant="secondary">24 Stunden</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <span class="text-sm">Niedrig</span>
                  </div>
                  <Badge variant="secondary">48 Stunden</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schnelle Hilfe</CardTitle>
                <CardDescription>Fragen und Resourcen</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                  <Icon name="tabler:help-circle" />
                  FAQ & Hilfecenter
                </Button>
                <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                  <Icon name="tabler:file-text" />
                  Dokumentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <!-- FAQ section -->
       <TabsContent value="faq">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about our platform</CardDescription>
              </CardHeader>
              <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                      <AccordionItem v-for="(faq, index) in faqItems" :key="`faq-${index}`" :value="`faq-item-${index}`">
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center">
                            {{ faq.question }}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {{ faq.category }}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{{ faq.answer }}</p>
                        </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
    </Tabs>

  </div>
</template>