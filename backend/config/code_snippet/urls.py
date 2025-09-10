from django.urls import path
from . import views

urlpatterns = [
    # Languages
    path("languages/", views.LanguageListCreateView.as_view(), name="language-list"),
    path("languages/<str:pk>/", views.LanguageDetailView.as_view(), name="language-detail"),

    # CheatSheets
    path("cheatsheets/", views.CheatSheetListCreateView.as_view(), name="cheatsheet-list"),
    path("cheatsheets/<str:pk>/", views.CheatSheetDetailView.as_view(), name="cheatsheet-detail"),

    # Snippets
    path("snippets/", views.SnippetListCreateView.as_view(), name="snippet-list"),
    path("snippets/<str:pk>/", views.SnippetDetailView.as_view(), name="snippet-detail"),

    # Tags
    path("tags/", views.TagListCreateView.as_view(), name="tag-list"),
    path("tags/<str:pk>/", views.TagDetailView.as_view(), name="tag-detail"),

    # SnippetTags
    path("snippet-tags/", views.SnippetTagListCreateView.as_view(), name="snippet-tag-list"),
    path("snippet-tags/<int:pk>/", views.SnippetTagDetailView.as_view(), name="snippet-tag-detail"),

    # FavoriteLikes
    path("favorites/", views.FavoriteLikeListCreateView.as_view(), name="favorite-list"),
    path("favorites/<str:pk>/", views.FavoriteLikeDetailView.as_view(), name="favorite-detail"),
]
