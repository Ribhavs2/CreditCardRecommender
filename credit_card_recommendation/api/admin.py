from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, CreditCard, PreExistingCreditCard

# admin.site.register(User, UserAdmin)
# admin.site.register(CreditCard)

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff')
    search_fields = ('username', 'email')

@admin.register(CreditCard)
class CreditCardAdmin(admin.ModelAdmin):
    list_display = ('user', 'pre_existing_card')
    search_fields = ('user__username', 'pre_existing_card__card_name')

@admin.register(PreExistingCreditCard)
class PreExistingCreditCardAdmin(admin.ModelAdmin):
    list_display = ('card_name', 'points_per_dollar', 'value_per_point')
    search_fields = ('card_name',)

