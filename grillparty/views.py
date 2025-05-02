from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Contribution
import json

from django.contrib.auth import logout



def index(request):
    """Render the main page of the application."""
    # Pass the is_admin flag to the template
    context = {
        'is_admin': request.user.is_authenticated and request.user.is_staff
    }
    return render(request, 'grillparty/index.html', context)


def logout_view(request):
    """Custom logout view that accepts GET requests."""
    logout(request)
    return redirect('/')

@csrf_exempt
def get_contributions(request):
    """API endpoint to get all contributions."""
    contributions = []
    for contrib in Contribution.objects.all():
        contributions.append({
            'id': contrib.id,
            'category': contrib.category,
            'item': contrib.item,
            'quantity': contrib.quantity,
            'name': contrib.name,
            'comment': contrib.comment,
        })
    
    # Check if user is admin and add flag to response
    is_admin = request.user.is_authenticated and request.user.is_staff
    
    return JsonResponse({
        'contributions': contributions,
        'is_admin': is_admin
    })

@csrf_exempt
def add_contribution(request):
    """API endpoint to add a new contribution."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Check if quantity is valid
            quantity = float(data['quantity']) if data['category'] == 'meat' else int(data['quantity'])
            
            # Create new contribution
            contribution = Contribution(
                category=data['category'],
                item=data['item'],
                quantity=quantity,
                name=data['name'],
                comment=data.get('comment', '')
            )
            contribution.save()
            
            return JsonResponse({'success': True, 'id': contribution.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'})

@csrf_exempt
@login_required
def delete_contribution(request, contribution_id):
    """API endpoint to delete a contribution. Requires admin access."""
    if request.method == 'DELETE':
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'success': False, 'error': 'Admin access required'}, status=403)
            
        try:
            contribution = Contribution.objects.get(id=contribution_id)
            contribution.delete()
            return JsonResponse({'success': True})
        except Contribution.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Contribution not found'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'})

@csrf_exempt
@login_required
def delete_all_contributions(request):
    """API endpoint to delete all contributions. Requires admin access."""
    if request.method == 'DELETE':
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'success': False, 'error': 'Admin access required'}, status=403)
            
        try:
            Contribution.objects.all().delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'})

# Add login/logout views
def login_view(request):
    """Admin login view."""
    return render(request, 'grillparty/login.html')