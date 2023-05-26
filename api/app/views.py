from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
import sys
from functools import reduce


@api_view(['GET'])
def ApiOverView(request):
    api_urls = {
        'GET | Public | Category based attributes':'api/<str:model>/<str:category>/', 
        'GET | Public | Products':'api/products/', 
        'POST| Public | Filter products':'api/filtered_products/',
        'GET | Public | Warranty':'api/warrenty/',
    }
    return Response(api_urls)


@api_view(['GET'])
def get_attrs(request, model, category):
    category = Category.objects.get(name = category)
    serializer = []
    if model == 'sellers': serializer = SellerSerializer(category.seller_set.all(), many=True)
    if model == 'types': serializer = SellerSerializer(category.type_set.all(), many=True)
    if model == 'brands': serializer = SellerSerializer(category.brand_set.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def get_filtered_product(request):
    product_types = request.data.get('type')
    brands = request.data.get('brand')
    sellers = request.data.get('seller')
    warranties = request.data.get('warranty')
    staring_price = request.data.get('starting_price')
    if staring_price: float(staring_price)
    ending_price = request.data.get('ending_price')
    if ending_price: float(ending_price)
    sort_by = request.data.get('sort_by')

    products = Product.objects.all()

    if product_types and len(product_types) > 0:
        carry = []
        for i in product_types: 
            product_type = Type.objects.get(name=i)
            carry.extend(filter(lambda x: x.product_type == product_type, products))
        products = carry

    if brands and len(brands) > 0: 
        carry = []
        for i in brands:
            brand = Brand.objects.get(name=i)
            carry.extend(filter(lambda x: x.brand == brand, products))
        products = carry

    if sellers and len(sellers) > 0: 
        carry = []
        for i in sellers:
            seller = Seller.objects.get(name=i)
            carry.extend(filter(lambda x: x.seller == seller, products))
        products = carry

    if warranties and len(warranties) > 0: 
        carry = []
        for i in warranties:
            warranty = Warranty.objects.get(period=i)
            carry.extend(filter(lambda x: x.warranty == warranty, products))
        products = carry

    if staring_price: products = filter(lambda x: x.price >= float(staring_price), products)
    if ending_price: products = filter(lambda x: x.price <= float(ending_price), products)

    if sort_by:
        if sort_by == 'low to high': products = sorted(products, reverse=False, key=lambda x: x.price)
        if sort_by == 'high to low': products = sorted(products, reverse=True, key=lambda x: x.price)
  
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_warrenty(request):
    warranty = Warranty.objects.all()
    serializer = WarrantySerializer(warranty, many=True)
    return Response(serializer.data)


