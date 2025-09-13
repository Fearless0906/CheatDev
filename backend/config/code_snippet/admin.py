from django.contrib import admin
from .models import Language, CheatSheet, Snippet, Tag, FavoriteLike

# Register your models here.
admin.site.register(Language)
admin.site.register(CheatSheet)
admin.site.register(Snippet)
admin.site.register(Tag)
admin.site.register(FavoriteLike)