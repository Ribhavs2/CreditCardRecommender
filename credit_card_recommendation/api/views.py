from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json

from .models import CreditCard, User

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
def add_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        card_name = data['card_name']
        points_per_dollar = data['points_per_dollar']
        value_per_point = data['value_per_point']
        user = User.objects.get(id=user_id)
        CreditCard.objects.create(user=user, card_name=card_name, points_per_dollar=points_per_dollar, value_per_point=value_per_point)
        return JsonResponse({'message': 'Card added successfully'}, status=201)
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

@csrf_exempt
def recommend_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        purchase_amount = data['purchase_amount']
        priority = data['priority']

        user = User.objects.get(id=user_id)
        cards = CreditCard.objects.filter(user=user)

        if not cards.exists():
            return JsonResponse({'error': 'No cards found for the user'}, status=404)

        best_card = None

        if priority == 'max_points':
            best_card = max(cards, key=lambda card: card.points_per_dollar)
        elif priority == 'max_value':
            best_card = max(cards, key=lambda card: card.points_per_dollar * card.value_per_point)
        else:
            return JsonResponse({'error': 'Invalid priority'}, status=400)

        return JsonResponse({
            'recommended_card': best_card.card_name,
            'points': best_card.points_per_dollar * purchase_amount,
            'value': best_card.points_per_dollar * best_card.value_per_point * purchase_amount
        }, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


