from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.conf import settings
from django.template.loader import render_to_string
from django.core.validators import RegexValidator
from django.shortcuts import resolve_url


class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = 'Male', '남성'  # DB 저장이 앞, 보여지는부분 뒤
        FEMALE = 'Female', '여성'

    follower_set = models.ManyToManyField('self', blank=True)
    following_set = models.ManyToManyField('self', blank=True)
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=13,
                                    validators=[RegexValidator(r'^010-?[1-9]\d{3}-?\d{4}$')], blank=True)
    gender = models.CharField(max_length=10, choices=GenderChoices.choices, blank=True)
    avatar = models.ImageField(blank=True, upload_to='accounts/avatar/%Y/%m/%d',
                               help_text='48px * 48px의 크기의 png/jpg 파일을 업로드 해주세요')

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url('pydenticon_image', self.username)
