from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Language(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class CheatSheet(models.Model):
    title = models.CharField(max_length=200)
    description = models.TimeField(blank=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cheat_sheets")
    language_id = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="cheat_sheets")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Snippet(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    explanation = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="snippets")
    cheat_sheet_id = models.ForeignKey(CheatSheet, on_delete=models.CASCADE, related_name="snippets")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name
    
class SnippetTag(models.Model):
    snippet = models.ForeignKey(Snippet, on_delete=models.CASCADE, related_name="snippet_tags")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="tag_snippets")
    
    class Meta:
        unique_together = ("snippet", "tag")
        
    def __str__(self):
        return f"{self.snippet.title} - {self.tag.name}"
    
class FavoriteLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    cheat_sheet = models.ForeignKey(CheatSheet, on_delete=models.CASCADE, related_name="favorites")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "cheat_sheet")

    def __str__(self):
        return f"{self.user.email} - {self.cheat_sheet.title}"