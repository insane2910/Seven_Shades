from rest_framework import serializers 
from sevenshadesapp.models import MainCategory
from sevenshadesapp.models import SubCategory
from sevenshadesapp.models import Brand
from sevenshadesapp.models import Product
from sevenshadesapp.models import ProductDetail,AdminLogin,Banners
from sevenshadesapp.models import UserAddress,Users

class MainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCategory
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
     class Meta:
        model = SubCategory
        fields = '__all__'

class SubCategoryGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False)
    class Meta:
        model = SubCategory
        fields = '__all__'
class BrandSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Brand
        fields = '__all__' 
        
class ProductSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Product
        fields = '__all__'

#PrductGetSerializer
class ProductGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False)
    subcategoryid=SubCategorySerializer(many=False)
    brandid=BrandSerializer(many=False) 
    class Meta:
        model = Product
        fields = '__all__'
          
#ProductDetail
class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetail
        fields = '__all__'
#ProductDetailGetSerializer
class ProductDetailGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False)
    subcategoryid=SubCategorySerializer(many=False)
    brandid=BrandSerializer(many=False)
    productid=ProductSerializer(many=False) 
    class Meta:
        model = ProductDetail
        fields = '__all__'
class AdminLoginSerialize(serializers.ModelSerializer):
    class Meta:
        model = AdminLogin
        fields = '__all__'              
#serializer
class BannersSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Banners
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class UserAddressSerializer(serializers.ModelSerializer):
   class Meta:
        model = UserAddress
        fields = '__all__'                
#UserAddressGetSerializer
class UserAddressGetSerializer(serializers.ModelSerializer):
    mobileno=UserAddressSerializer(many=False)
    class Meta:
        model = UserAddress
        fields = '__all__'        