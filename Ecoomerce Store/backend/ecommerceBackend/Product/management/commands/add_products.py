# products/management/commands/add_products.py
from django.core.management.base import BaseCommand
from Product.models import Product

class Command(BaseCommand):
    help = 'Add products to the database'

    def handle(self, *args, **kwargs):
        # Define your products
        products = [
            {'name': 'Product 3', 'description':'Very beautiful product', 'price': 10.99, 'image': 'images/image1.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 4', 'description':'Very beautiful product','price': 25.99, 'image': 'images/image2.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 5', 'description':'Very beautiful product','price': 10.99, 'image': 'images/image3.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 6', 'description':'Very beautiful product','price': 25.99, 'image': 'images/image4.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 7', 'description':'Very beautiful product','price': 10.99, 'image': 'images/image4.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 8', 'description':'Very beautiful product','price': 25.99, 'image': 'images/image2.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 9', 'description':'Very beautiful product','price': 10.99, 'image': 'images/image3.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 10','description':'Very beautiful product', 'price': 25.99, 'image': 'images/image3.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 11','description':'Very beautiful product', 'price': 10.99, 'image': 'images/image1.jpg', 'category': 'Appliances', 'stock': 50},
            {'name': 'Product 12','description':'Very beautiful product', 'price': 25.99, 'image': 'images/image1.jpg', 'category': 'Appliances', 'stock': 50},
        ]

        for product_data in products:
            product, created = Product.objects.update_or_create(
                name=product_data['name'],
                defaults={
                    'price': product_data['price'],
                    'description':product_data['description'],
                    'image':product_data['image'],
                    'category': product_data['category'],
                    'stock': product_data['stock']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created product: {product.name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated product: {product.name}'))
