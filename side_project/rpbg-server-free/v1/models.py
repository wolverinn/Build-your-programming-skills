from email.policy import default
from django.db import models
import datetime

# Create your models here.

# user
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    wx_openid = models.CharField(max_length=256)
    session_key = models.CharField(max_length=256, db_index=True)
    email = models.EmailField(null=True, db_index=True)
    password = models.CharField(db_index=True, max_length=30)
    extra = models.TextField(null=True)

# feedback
class Feedback(models.Model):
    uid = models.BigIntegerField(null=True)
    email = models.EmailField(null=True, db_index=True)
    name = models.CharField(null=True, max_length=128)
    feedback = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)

# api path run time
class ApiCount(models.Model):
    path = models.CharField(max_length=256)
    gen_times = models.IntegerField(default=10)
    extra = models.TextField(null=True)
