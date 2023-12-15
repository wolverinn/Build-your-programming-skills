from django.contrib import admin

# Register your models here.
from v1 import models
admin.site.register(models.User)
admin.site.register(models.ApiCount)
admin.site.register(models.Feedback)
