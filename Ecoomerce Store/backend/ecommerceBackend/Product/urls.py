from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.ProductListView.as_view(), name='product-list'),
    path('api/products/product/<int:pid>/', views.product_with_id, name='product_detail'),
    path('api/products/category/<str:category>/', views.category_wise_product, name="category-wise-product"),
    path('api/products/search', views.ProductListView.as_view(), name="search-products"),
    
    # Updated path for creating orders and payment intent in one step
    path('api/orders/create/', views.OrderCreateView.as_view(), name='create-order-and-payment-intent'),

    # Other paths...
]
