from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json

from .models import CreditCard, User, PreExistingCreditCard, Category, CardCategory

User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = make_password(data['password'])
        user = User.objects.create(username=username, password=password)
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            return JsonResponse({'message': 'Login successful'}, status=200)
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def add_pre_existing_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        card_name = data['card_name']
        value_per_point = data['value_per_point']
        card = PreExistingCreditCard.objects.create(card_name=card_name, value_per_point=value_per_point)
        for cat in data['categories']:
            category, created = Category.objects.get_or_create(name=cat['name'])
            CardCategory.objects.create(card=card, category=category, points_per_dollar=cat['points_per_dollar'])
        return JsonResponse({'message': 'Pre-existing credit card added successfully', 'id': card.id}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def update_pre_existing_card(request, card_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        card = PreExistingCreditCard.objects.get(id=card_id)
        card.card_name = data.get('card_name', card.card_name)
        card.value_per_point = data.get('value_per_point', card.value_per_point)
        card.save()
        for cat in data['categories']:
            category, created = Category.objects.get_or_create(name=cat['name'])
            card_category, created = CardCategory.objects.get_or_create(card=card, category=category)
            card_category.points_per_dollar = cat['points_per_dollar']
            card_category.save()
        return JsonResponse({'message': 'Pre-existing credit card updated successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def delete_pre_existing_card(request, card_id):
    if request.method == 'DELETE':
        card = PreExistingCreditCard.objects.get(id=card_id)
        card.delete()
        return JsonResponse({'message': 'Pre-existing credit card deleted successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def add_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        card_id = data['card_id']

        # Fetch the user
        user = User.objects.get(id=user_id)

         # Fetch the pre-existing credit card
        try:
            pre_existing_card = PreExistingCreditCard.objects.get(id=card_id)
        except PreExistingCreditCard.DoesNotExist:
            return JsonResponse({'error': 'Pre-existing credit card does not exist'}, status=400)
        
        # Check if the user already has a credit card with the same name
        if CreditCard.objects.filter(user=user, pre_existing_card=pre_existing_card).exists():
            return JsonResponse({'error': 'User already has this credit card'}, status=400)
                
        CreditCard.objects.create(user=user, pre_existing_card=pre_existing_card)
        return JsonResponse({'message': 'Card added successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def get_pre_existing_cards(request):
    if request.method == 'GET':
        cards = PreExistingCreditCard.objects.all().values('id', 'card_name', 'points_per_dollar', 'value_per_point')
        return JsonResponse(list(cards), safe=False, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def update_card(request, card_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            card = get_object_or_404(CreditCard, id=card_id)
            card.card_name = data.get('card_name', card.card_name)
            card.points_per_dollar = data.get('points_per_dollar', card.points_per_dollar)
            card.value_per_point = data.get('value_per_point', card.value_per_point)
            card.save()
            return JsonResponse({'message': 'Card updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def delete_card(request, card_id):
    if request.method == 'DELETE':
        card = CreditCard.objects.get(id=card_id)
        card.delete()
        return JsonResponse({'message': 'Card deleted successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

# @csrf_exempt
# def recommend_card(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         user_id = data['user_id']
#         purchase_amount = data['purchase_amount']
#         priority = data['priority']

#         user = User.objects.get(id=user_id)
#         cards = CreditCard.objects.filter(user=user)

#         if not cards.exists():
#             return JsonResponse({'error': 'No cards found for the user'}, status=404)

#         best_card = None

#         if priority == 'max_points':
#             best_card = max(cards, key=lambda card: card.points_per_dollar)
#         elif priority == 'max_value':
#             best_card = max(cards, key=lambda card: card.points_per_dollar * card.value_per_point)
#         else:
#             return JsonResponse({'error': 'Invalid priority'}, status=400)

#         return JsonResponse({
#             'recommended_card': best_card.card_name,
#             'points': best_card.points_per_dollar * purchase_amount,
#             'value': best_card.points_per_dollar * best_card.value_per_point * purchase_amount
#         }, status=200)

#     return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def recommend_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        category_name = data['category']
        amount = data['amount']
        priority = data['priority']  # "max_points" or "max_value"
        
        # Fetch the user
        user = User.objects.get(id=user_id)
        
        # Fetch the category
        try:
            category = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            return JsonResponse({'error': 'Category does not exist'}, status=400)
        
        best_value = 0
        recommended_card = None

        # Iterate through user's credit cards
        for credit_card in CreditCard.objects.filter(user=user):
            card_categories = CardCategory.objects.filter(card=credit_card.pre_existing_card, category=category)
            if card_categories.exists():
                card_category = card_categories.first()
                points = card_category.points_per_dollar * amount
                value = points * credit_card.pre_existing_card.value_per_point

                if priority == "max_points" and points > best_value:
                    best_value = points
                    recommended_card = credit_card.pre_existing_card
                elif priority == "max_value" and value > best_value:
                    best_value = value
                    recommended_card = credit_card.pre_existing_card

        if recommended_card:
            return JsonResponse({
                'message': f'Recommended card based on {priority.replace("_", " ")}',
                'card_name': recommended_card.card_name,
                'points': points if priority == "max_points" else value
            }, status=200)
        else:
            return JsonResponse({'error': 'No suitable card found'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
