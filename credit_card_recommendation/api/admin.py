from django.contrib import admin
from .models import User, CreditCard, PreExistingCreditCard, Category, CardCategory

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
    list_display = ('card_name', 'value_per_point', 'category_list')
    search_fields = ('card_name',)
    filter_horizontal = ('categories',)

    def category_list(self, obj):
        return ", ".join([category.name for category in obj.categories.all()])

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(CardCategory)
class CardCategoryAdmin(admin.ModelAdmin):
    list_display = ('card', 'category', 'points_per_dollar')
    search_fields = ('card__card_name', 'category__name')
