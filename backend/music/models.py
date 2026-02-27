# from django.db import models
# from cloudinary.models import CloudinaryField

# class Song(models.Model):
#     title = models.CharField(max_length=255)
#     artist = models.CharField(max_length=255)
#     album = models.CharField(max_length=255, blank=True, null=True)
#     duration = models.CharField(max_length=10)

#     lang = models.CharField(
#         max_length=50,
#         choices=[
#             ("tamil", "Tamil"),
#             ("malayalam", "Malayalam"),
#             ("hindi", "Hindi"),
#             ("english", "English"),
#         ],
#         default="tamil"
#     )

#     # 🔥 Cloudinary storage
#     audio_file = CloudinaryField(resource_type="video")
#     cover_image = CloudinaryField(resource_type="image")

#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

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

    # 🔥 Store Cloudinary URLs manually
    audio_url = models.URLField(max_length=1000)
    cover_image_url = models.URLField(max_length=1000, blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title