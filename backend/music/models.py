from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=10)
    lang = models.CharField(
    max_length=50,
    choices=[
        ("tamil", "Tamil"),
        ("malayalam", "Malayalam"),
        ("hindi", "Hindi"),
        ("english", "English"),
    ],
    default="tamil"
)

    audio_url = models.URLField()  # OneDrive URL
    cover_image_url = models.URLField(blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title