from django.db import models
from django.db import transaction

# Create your models here.

class Product(models.Model):
    name  = models.CharField(max_length=100,null=False)
    description = models.TextField(max_length=200,null=False)
    price  = models.DecimalField(max_digits=10, decimal_places=2,null=False)
    stock = models.IntegerField(null=False)
    image = models.ImageField(null=False,upload_to='images/')
    MOBILES = "MB"
    CLOTHING = "CL"
    GROCERIES = "GR"
    LAPTOPS = "LP"
    APPLIANCES = "AP"
    CATEGORIES = {
        
        MOBILES: "Mobiles",
        CLOTHING: "Clothing",
        GROCERIES: "Grocery",
        LAPTOPS: "Laptop",
        APPLIANCES: "Appliances"
    }
    category = models.CharField(
        max_length=2,
        choices=CATEGORIES,
        default=APPLIANCES
    )

    def __str__(self):
        return self.name
    
    


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="Pending")  # e.g., Pending, Completed

    

    def save(self, *args, **kwargs):
        # Check stock before saving inside a transaction block
        with transaction.atomic():
            if self.product.stock < self.quantity:
                raise ValueError("Insufficient stock for the product")
            
            # Reduce stock
            self.product.stock -= self.quantity
            self.product.save()  # Update the product's stock
            
            super().save(*args, **kwargs)  # Save the order


    def __str__(self):
        return f"Order of {self.quantity} {self.product.name}"

