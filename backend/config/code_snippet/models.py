from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Language(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class CheatSheet(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cheat_sheets")
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="cheat_sheets")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Snippet(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    explanation = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="snippets")
    cheat_sheet = models.ForeignKey(CheatSheet, on_delete=models.CASCADE, related_name="snippets")
    tags = models.ManyToManyField('Tag', related_name='snippets', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class FavoriteLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    cheat_sheet = models.ForeignKey(CheatSheet, on_delete=models.CASCADE, related_name="favorites")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "cheat_sheet")

    def __str__(self):
        return f"{self.user.email} - {self.cheat_sheet.title}"
