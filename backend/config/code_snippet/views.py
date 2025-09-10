from rest_framework import generics
from .models import (
    Language, CheatSheet, Snippet,
    Tag, SnippetTag, FavoriteLike
)
from .serializers import (
    LanguageSerializer, CheatSheetSerializer,
    SnippetSerializer, TagSerializer, SnippetTagSerializer,
    FavoriteLikeSerializer
)

class LanguageListCreateView(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class LanguageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


# ---------------------------
# CheatSheet Views
# ---------------------------
class CheatSheetListCreateView(generics.ListCreateAPIView):
    queryset = CheatSheet.objects.all()
    serializer_class = CheatSheetSerializer


class CheatSheetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CheatSheet.objects.all()
    serializer_class = CheatSheetSerializer


# ---------------------------
# Snippet Views
# ---------------------------
class SnippetListCreateView(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


# ---------------------------
# Tag Views
# ---------------------------
class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# ---------------------------
# SnippetTag Views
# ---------------------------
class SnippetTagListCreateView(generics.ListCreateAPIView):
    queryset = SnippetTag.objects.all()
    serializer_class = SnippetTagSerializer


class SnippetTagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SnippetTag.objects.all()
    serializer_class = SnippetTagSerializer


# ---------------------------
# FavoriteLike Views
# ---------------------------
class FavoriteLikeListCreateView(generics.ListCreateAPIView):
    queryset = FavoriteLike.objects.all()
    serializer_class = FavoriteLikeSerializer


class FavoriteLikeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FavoriteLike.objects.all()
    serializer_class = FavoriteLikeSerializer