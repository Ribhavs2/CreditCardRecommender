from django.urls import path
from .views import register, login, add_card, update_card, delete_card, recommend_card, get_pre_existing_cards, \
                   add_pre_existing_card, update_pre_existing_card, delete_pre_existing_card, current_user

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('add_card/', add_card, name='add_card'),
    path('update_card/<int:card_id>/', update_card, name='update_card'),
    path('delete_card/<int:card_id>/', delete_card, name='delete_card'),
    path('recommend_card/', recommend_card, name='recommend_card'),
    path('pre_existing_cards/', get_pre_existing_cards, name='pre_existing_cards'),
    path('pre_existing_cards/add/', add_pre_existing_card, name='add_pre_existing_card'),
    path('pre_existing_cards/update/<int:card_id>/', update_pre_existing_card, name='update_pre_existing_card'),
    path('pre_existing_cards/delete/<int:card_id>/', delete_pre_existing_card, name='delete_pre_existing_card'),
    path('current_user/', current_user, name='current_user'),
]
