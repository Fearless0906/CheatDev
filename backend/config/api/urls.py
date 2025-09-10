from django.urls import path, include

urlpatterns = [
    path('accounts/', include('users.urls')),
    path('cheatsheet/', include('code_snippet.urls')),
]