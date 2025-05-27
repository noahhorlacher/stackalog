<template>
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold">Support kontaktieren</h1>
        <p class="text-muted-foreground">
          Unser Supportteam ist für Sie da
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <Icon name="tabler:message" />
                Schicken Sie eine Supportanfrage
              </CardTitle>
              <CardDescription>Füllen Sie das Formular unten aus und wir melden uns sobald wie möglich.</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit="" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input id="firstName" placeholder="Max" required />
                  </div>
                  <div class="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input id="lastName" placeholder="Mustermann" required />
                  </div>
                </div>

                <div class="space-y-2">
                  <Label htmlFor="email">Email Adresse *</Label>
                  <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
                </div>

                <div class="space-y-2">
                  <Label htmlFor="category">Kategorie *</Label>
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
                      <SelectItem value="payment">
                        <div class="flex items-center gap-2">
                          <Icon name="tabler:credit-card" />
                          Zahlungen & Abonnement
                        </div>
                      </SelectItem>
                      <SelectItem value="security">
                        <div class="flex items-center gap-2">
                          <Icon name="tabler:shield" />
                          Sicherheit & Privatsphäre
                        </div>
                      </SelectItem>
                      <SelectItem value="feature">
                        <div class="flex items-center gap-2">
                          <Icon name="tabler:bolt" />
                          Feature Anfrage
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
                  <Label htmlFor="subject">Betreff *</Label>
                  <Input id="subject" placeholder="Eine Kurzbeschreibung Ihres Problems" required />
                </div>

                <div class="space-y-2">
                  <Label htmlFor="message">Nachricht *</Label>
                  <Textarea
                    id="message"
                    placeholder="Bitte geben Sie detaillierte Informationen zu Ihrem Problem an, einschließlich aller Fehlermeldungen und Schritte, mit denen sich das Problem reproduzieren lässt."
                    class="min-h-[120px]"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <Label>Anhänge</Label>
                  <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Icon name="tabler:file-upload" class="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground mb-2">Drag and droppen Sie Dateien hier, oder klicken Sie um nach Dateien zu suchen.</p>
                    <input
                      type="file"
                      multiple
                      class="hidden"
                      id="file-upload"
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                    >
                      Dateien wählen
                    </Button>
                    <p class="text-xs text-muted-foreground mt-2">
                      Maximal 10MB pro Datei. Unterstützte Dateitypen: JPG, PNG, PDF, DOC, TXT
                    </p>
                  </div>

                </div>

                <Button type="submit" class="w-full" disabled={isSubmitting}>
                    Supportanfrage abschicken
                </Button>
              </form>
            </CardContent>
          </Card>

          <Alert>
            <AlertTitle>
                <Icon name="tabler:alert-circle" />
                Dringende Sicherheitsprobleme
            </AlertTitle>
            <AlertDescription>
              Bei dringenden Sicherheitsproblemen kontaktieren Sie uns bitte umgehend unter security@company.com oder rufen Sie unsere Notfall-Hotline unter +1 (555) 999-0000 an.
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
                  <p class="text-sm text-muted-foreground">support@example.com</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="tabler:phone" class="text-muted-foreground" />
                <div>
                  <p class="font-medium">Telefon</p>
                  <p class="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="tabler:message" class="text-muted-foreground" />
                <div>
                  <p class="font-medium">Live Chat</p>
                  <p class="text-sm text-muted-foreground">24/7 verfügbar</p>
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
              <div class="flex justify-between">
                <span class="text-sm">Montag - Freitag</span>
                <span class="text-sm font-medium">9:00 - 18:00 EST</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Samstag</span>
                <span class="text-sm font-medium">10:00 - 16:00 EST</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Sonntag</span>
                <span class="text-sm font-medium">Geschlossen</span>
              </div>
              <Separator />
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span class="text-sm text-green-600 font-medium">Momentan Online</span>
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
              <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                <Icon name="tabler:users" />
                Community Forum
              </Button>
              <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                <Icon name="tabler:settings" />
                Systemstatus
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
</template>