from .models import SimpleCV

from rest_framework import serializers


class SimpleCVSerializer(serializers.ModelSerializer):

    class Meta:
        model = SimpleCV
        fields = ('jobTitle', 'salary','regionId', 'relocation' )
        read_only_fields = ('jobTitle', 'salary','regionId', 'relocation' )
        