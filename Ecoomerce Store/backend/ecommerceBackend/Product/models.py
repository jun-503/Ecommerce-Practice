from django.db import models

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
