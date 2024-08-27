from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter


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








