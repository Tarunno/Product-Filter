from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Type)
admin.site.register(Brand)
admin.site.register(Seller)
admin.site.register(Warranty)
admin.site.register(Product)