from django.urls import path, include

urlpatterns = [
    path('accounts/', include('users.urls')),
    path('code/', include('code_snippet.urls')),
]