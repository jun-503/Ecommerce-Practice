from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(default=1)
    class Meta:
        model = Product
        fields = '__all__'
