from django.db import models


class ContactMessage(models.Model):
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    last_name = models.CharField(max_length=120)
    first_name = models.CharField(max_length=120)
    department = models.CharField(max_length=50, default="tech")
    message = models.TextField()
    language = models.CharField(max_length=10, blank=True, default="fr")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.subject}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    language = models.CharField(max_length=10, blank=True, default="fr")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email