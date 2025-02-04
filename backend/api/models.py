from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    outgoing = models.BooleanField(default=True)  # ✅ True = outgoing, False = incoming

    def __str__(self):
        category_type = "Outgoing" if self.outgoing else "Incoming"
        return f"{self.name} ({category_type})"

class Transaction(models.Model):
    Location = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="transactions")


    def __str__(self):
        return f"{self.Location} - ${self.amount}"

