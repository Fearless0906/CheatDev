from rest_framework import serializers
from .models import Language, CheatSheet, Snippet, Tag, FavoriteLike


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name', 'created_at', 'updated_at']


class CheatSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheatSheet
        fields = [
            'id',
            'title',
            'description',
            'user',
            'language',
            'created_at',
            'updated_at'
        ]

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class SnippetSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Snippet
        fields = [
            'id',
            'title',
            'content',
            'explanation',
            'user',
            'cheat_sheet',
            'tags',
            'created_at',
            'updated_at'
        ]



class FavoriteLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteLike
        fields = ['id', 'user', 'cheat_sheet', 'created_at', 'updated_at']
