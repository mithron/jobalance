from django.contrib import admin

from .models import SimpleCV, Region, Speciality, CV
# Register your models here.

admin.site.register(SimpleCV)
admin.site.register(CV)
admin.site.register(Region)
admin.site.register(Speciality)