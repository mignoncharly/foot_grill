from django.contrib import admin
from .models import Contribution

class ContributionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'item', 'quantity', 'comment', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'item', 'comment')
    ordering = ('-created_at',)

admin.site.register(Contribution, ContributionAdmin)