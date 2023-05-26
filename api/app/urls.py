from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *


urlpatterns = [
    
    path('', ApiOverView, name="overview"),
    path('<str:model>/<str:category>/', get_attrs, name="types"),
    path('products/', get_product, name="products"),
    path('filtered_products/', get_filtered_product, name="filtered_products"),
    path('warranty/', get_warrenty, name="warrenty"),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
