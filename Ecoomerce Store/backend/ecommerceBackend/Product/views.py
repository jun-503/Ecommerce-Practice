from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Order
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView
import stripe
from django.conf import settings


class CustomSearchFilter(SearchFilter):
    def get_search_terms(self, request):
        # For Extracting the search term from the 'q' parameter
        search_terms = request.query_params.get('q', '')
        return search_terms.split() if search_terms else []

# Create your views here.
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (CustomSearchFilter,)
    search_fields = ('name','description')

    




stripe.api_key = settings.STRIPE_SECRET_KEY

class OrderCreateView(APIView):
    """
    Creates an order and payment intent for the selected product(s).
    """
    def post(self, request):
        try:
            data = request.data
            product_ids = data.get('product_ids', [])
            
            if not product_ids:
                return Response({'error': 'No products selected'}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch product details and validate stock
            products = Product.objects.filter(id__in=product_ids)
            if not products.exists():
                return Response({'error': 'Products not found'}, status=status.HTTP_404_NOT_FOUND)

            total_amount = 0
            order_items = []

            for product in products:
                quantity = data.get(f'quantity_{product.id}', 1)  # Get the quantity for each product
                
                if product.stock < quantity:
                    return Response({"error": f"Insufficient stock for {product.name}"}, status=status.HTTP_400_BAD_REQUEST)

                total_amount += product.price * quantity
                
                # Create the order for each product
                order = Order.objects.create(
                    product=product,
                    quantity=quantity,
                    total_price=product.price * quantity
                )
                order_items.append({
                    "product": product.name,
                    "quantity": order.quantity,
                    "total_price": order.total_price
                })

            # Create Stripe payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(total_amount * 100),  # Stripe expects amount in cents
                currency=settings.STRIPE_CURRENCY,
            )

            # Response including both order and payment intent
            return Response({
                "message": "Order created successfully",
                "order_items": order_items,
                "clientSecret": intent['client_secret'],
                'total_amount': total_amount,
                'currency': settings.STRIPE_CURRENCY,
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])                      # decorator that converst simple functions into API functions
def product_with_id(request, pid):
    try:
        
        product = Product.objects.get(id=pid)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])  
def category_wise_product(request,category):
    try: 
        products = Product.objects.filter(category = category)
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found under this category'}, status=status.HTTP_404_NOT_FOUND)
    
# @api_view(['GET'])  
# def Search(request):
#     query = request.Get.get('q','')
#     if query:
#         products = Product.objects.filter(name__icontains=query)
#         serializer = ProductSerializer(products,many=True)
#         return Response(serializer.data)
    
#     else:
#         return Response({'error': 'No search query provided'}, status=status.HTTP_400_BAD_REQUEST)
stripe.api_key = settings.STRIPE_SECRET_KEY

# @api_view(['POST'])
# def create_payment_intent(request):
#     """
#     Creates a payment intent for selected product(s).
#     """
#     try:
#         data = request.data
#         product_ids = data.get('product_ids', [])
        
#         if not product_ids:
#             return Response({'error': 'No products selected'}, status=status.HTTP_400_BAD_REQUEST)

#         # Fetch product details
#         products = Product.objects.filter(id__in=product_ids)
#         if not products.exists():
#             return Response({'error': 'Products not found'}, status=status.HTTP_404_NOT_FOUND)
        
#         total_amount = 0
#         for product in products:
#             quantity = data.get(f'quantity_{product.id}', 1)  # Get the quantity for each product
#             total_amount += product.price * quantity
        
#         # Create Stripe payment intent
#         intent = stripe.PaymentIntent.create(
#             amount=int(total_amount * 100),  # Stripe expects amount in cents
#             currency=settings.STRIPE_CURRENCY,
#         )

#         return Response({
#             'clientSecret': intent['client_secret'],
#             'total_amount': total_amount,
#             'currency': settings.STRIPE_CURRENCY,
#         })
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








