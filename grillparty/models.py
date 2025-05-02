from django.db import models

class Contribution(models.Model):
    """Model for grill party contributions."""
    
    # Categories
    CATEGORY_CHOICES = [
        ('meat', 'Meat'),
        ('drinks', 'Drinks'),
        ('sauces', 'Sauces'),
        ('sides', 'Sides'),
        ('utensils', 'Utensils'),
    ]
    
    # Meat items
    MEAT_CHOICES = [
        ('lamb', 'Lamb'),
        ('beef', 'Beef'),
        ('mutton', 'Mutton'),
        ('pork', 'Pork'),
        ('fish', 'Fish'),
        ('sausages', 'Sausages'),
        ('turkey', 'Turkey'),
    ]
    
    # Drinks items
    DRINKS_CHOICES = [
        ('beer', 'Beer'),
        ('juice', 'Juice'),
        ('rose', 'Rosé'),
        ('wine', 'Wine'),
        ('water', 'Water'),
        ('soda', 'Soda'),
    ]
    
    # Sauces items
    SAUCES_CHOICES = [
        ('mayonnaise', 'Mayonnaise'),
        ('remoulade', 'Remoulade'),
        ('ketchup', 'Ketchup'),
        ('mustard', 'Mustard'),
        ('bbq', 'BBQ Sauce'),
    ]
    
    # Sides items
    SIDES_CHOICES = [
        ('bread', 'Bread'),
        ('bobolo', 'Bobolo'),
        ('beignets', 'Beignets'),
        ('fries', 'French Fries'),
        ('salad', 'Salad'),
        ('chips', 'Chips'),
    ]
    
    # Utensils items
    UTENSILS_CHOICES = [
        ('plates', 'Disposable Plates'),
        ('knives', 'Knives'),
        ('spoons', 'Spoons'),
        ('forks', 'Forks'),
        ('cups', 'Cups'),
        ('napkins', 'Napkins'),
    ]
    
    # Fields
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    item = models.CharField(max_length=20)
    quantity = models.FloatField()  # Float to allow decimal values for meat (kg)
    name = models.CharField(max_length=100)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name}: {self.quantity} of {self.item} ({self.category})"
    
    def clean(self):
        """Validate the contribution item based on the category."""
        if self.category == 'meat' and self.item not in [choice[0] for choice in self.MEAT_CHOICES]:
            raise ValueError(f"Invalid meat item: {self.item}")
        elif self.category == 'drinks' and self.item not in [choice[0] for choice in self.DRINKS_CHOICES]:
            raise ValueError(f"Invalid drink item: {self.item}")
        elif self.category == 'sauces' and self.item not in [choice[0] for choice in self.SAUCES_CHOICES]:
            raise ValueError(f"Invalid sauce item: {self.item}")
        elif self.category == 'sides' and self.item not in [choice[0] for choice in self.SIDES_CHOICES]:
            raise ValueError(f"Invalid side item: {self.item}")
        elif self.category == 'utensils' and self.item not in [choice[0] for choice in self.UTENSILS_CHOICES]:
            raise ValueError(f"Invalid utensil item: {self.item}")