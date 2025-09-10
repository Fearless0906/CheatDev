from rest_framework import serializers
from .models import Language, CheatSheet, Snippet, Tag, SnippetTag, FavoriteLike


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


class CheatSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheatSheet
        fields = [
            'id',
            'title',
            'description',
            'user_id',
            'language_id',
            'created_at',
            'updated_at'
        ]


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = [
            'id',
            'title',
            'content',
            'explanation',
            'user_id',
            'cheat_sheet_id',
            'created_at',
            'updated_at'
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class SnippetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnippetTag
        fields = ['id', 'snippet', 'tag']


class FavoriteLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteLike
        fields = ['id', 'user', 'cheat_sheet', 'created_at', 'updated_at']
