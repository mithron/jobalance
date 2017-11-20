from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Region(models.Model):
    regionId = models.CharField(max_length=30)
    name = models.TextField()
    link = models.URLField(blank=True, null=True)
    
class Speciality(models.Model):
    name = models.TextField()
    category = models.CharField(max_length=10, blank=True, null=True)
    etks = models.CharField(max_length=5, blank=True, null=True)
    active = models.NullBooleanField(blank=True, null=True)
    deleted = models.NullBooleanField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    
class CV(models.Model):
    jobTitle = models.TextField()
    speciality = models.ForeignKey(Speciality, blank=True, 
                related_name='spec', on_delete=models.CASCADE)
    salary = models.CharField(max_length=60, blank=True, null=True)
    region = models.ForeignKey(Region, related_name='where', on_delete=models.CASCADE)
    relocation = models.BooleanField()
    
class SimpleCV(models.Model):
    jobTitle = models.TextField()
    salary = models.CharField(max_length=60, blank=True, null=True)
    regionId = models.CharField(max_length=30)
    relocation = models.BooleanField()