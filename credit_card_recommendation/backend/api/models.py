from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class PreExistingCreditCard(models.Model):
    card_name = models.CharField(max_length=100)
    value_per_point = models.FloatField()
    categories = models.ManyToManyField(Category, through='CardCategory')

    def __str__(self):
        return self.card_name
    
class CardCategory(models.Model):
    card = models.ForeignKey(PreExistingCreditCard, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    points_per_dollar = models.FloatField()

    class Meta:
        unique_together = ('card', 'category')

    def __str__(self):
        return f"{self.card.card_name} - {self.category.name}: {self.points_per_dollar} points/dollar"

class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pre_existing_card = models.ForeignKey(PreExistingCreditCard, on_delete=models.CASCADE)

    def __str__(self):
        return self.pre_existing_card.card_name
