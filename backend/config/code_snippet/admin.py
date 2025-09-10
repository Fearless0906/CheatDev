from django.contrib import admin
from .models import Language, CheatSheet, Snippet, Tag, SnippetTag, FavoriteLike

# Register your models here.
admin.site.register(Language)
admin.site.register(CheatSheet)
admin.site.register(Snippet)
admin.site.register(Tag)
admin.site.register(SnippetTag)
admin.site.register(FavoriteLike)