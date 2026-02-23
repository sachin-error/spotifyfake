from django.contrib import admin
from .models import Song

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'uploaded_at')
    search_fields = ('title', 'artist')

# admin.site.register(Playlist)
# admin.site.register(Like)