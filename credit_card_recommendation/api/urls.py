from django.urls import path
from .views import register, login, add_card, update_card, delete_card, recommend_card

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('add_card/', add_card, name='add_card'),
    path('update_card/<int:card_id>/', update_card, name='update_card'),
    path('delete_card/<int:card_id>/', delete_card, name='delete_card'),
    path('recommend_card/', recommend_card, name='recommend_card'),
]
