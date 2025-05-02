from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('api/contributions/', views.get_contributions, name='get_contributions'),
    path('api/contributions/add/', views.add_contribution, name='add_contribution'),
    path('api/contributions/delete/<int:contribution_id>/', views.delete_contribution, name='delete_contribution'),
    path('api/contributions/delete-all/', views.delete_all_contributions, name='delete_all_contributions'),
    path('logout/', views.logout_view, name='logout'),
]