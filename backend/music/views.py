from rest_framework import generics
from .models import Song
from .serializers import SongSerializer


class SongListView(generics.ListAPIView):
    queryset = Song.objects.all().order_by('-uploaded_at')
    serializer_class = SongSerializer