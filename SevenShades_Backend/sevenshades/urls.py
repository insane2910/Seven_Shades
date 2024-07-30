"""sevenshades URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sevenshadesapp import userinterface, banners_views, product_views,maincategory_views,subcategory_views,brand_views,productdetail_views,admin_login_view

from django.urls import include, re_path 


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/maincategory_submit', maincategory_views.MainCategory_Submit),
    re_path(r'^api/maincategory_list', maincategory_views.MainCategory_List),
    re_path(r'^api/editmaincategory_data', maincategory_views.EditCategory_Data),
    re_path(r'^api/editmaincategory_icon', maincategory_views.EditCategory_Icon),
    re_path(r'^api/deletemaincategorydata', maincategory_views.DeleteCategory_Data),
    re_path(r'^api/subcategory_submit', subcategory_views.SubCategory_Submit),
    re_path(r'^api/subcategory_list', subcategory_views.SubCategory_List),
    re_path(r'^api/editsubcategory_data', subcategory_views.EditCategory_Data),
    re_path(r'^api/editsubcategory_icon', subcategory_views.EditCategory_Icon),
    re_path(r'^api/deletesubcategorydata', subcategory_views.DeleteCategory_Data),
    re_path(r'^api/brand_submit', brand_views.Brand_Submit),
    re_path(r'^api/brand_list', brand_views.Brand_List),
    re_path(r'^api/editbrand_data', brand_views.EditBrand_Data),
    re_path(r'^api/editbrand_icon', brand_views.EditBrand_Icon),
    re_path(r'^api/deletebranddata', brand_views.DeleteBrand_Data),
    #Product Urls
    re_path(r'^api/product_submit', product_views.Product_Submit),
    re_path(r'^api/product_list', product_views.Product_List),
    re_path(r'^api/editproduct_icon', product_views.EditProduct_Icon),
    re_path(r'^api/editproduct_data', product_views.EditProduct_Data),
    re_path(r'^api/deleteproductdata', product_views.DeleteProduct_Data),
    re_path(r'^api/product_subcategory_list_by_maincategoryid', product_views.subcategory_list_by_maincategoryid),

    #ProductDetail
    re_path(r'^api/productdetail_submit', productdetail_views.ProductDetail_Submit),
    re_path(r'^api/productdetail_list', productdetail_views.ProductDetail_List),
    re_path(r'^api/editproductdetail_icon', productdetail_views.EditProductDetail_Icon),
    re_path(r'^api/editproductdetail_data', productdetail_views.EditProductDetail_Data),
    re_path(r'^api/deleteproductdetaildata', productdetail_views.DeleteProductDetail_Data),
 
    re_path(r'^api/productdetail_brand_list_by_productid', productdetail_views.productdetail_brand_list_by_productid),
    re_path(r'^api/productdetail_product_list_by_subcategoryid',productdetail_views.productdetail_product_list_by_subcategoryid),
    re_path(r'^api/check_admin_login',admin_login_view.CheckAdminLogin),
    #urls
re_path(r'^api/banners_submit', banners_views.Banners_Submit),
  #users
re_path(r'^api/user_main_category_list', userinterface.User_MainCategory_List),
re_path(r'^api/user_subcategory_list_by_maincategoryid', userinterface.user_subcategory_list_by_maincategoryid),
re_path(r'^api/user_brand_list', userinterface.Brand_List),
re_path(r'^api/banner_list', userinterface.Banner_List),
re_path(r'^api/user_maincategory_list', userinterface.Category_List),
re_path(r'^api/user_subcategory_list', userinterface.Subcategory_List),
re_path(r'^api/user_brand_list', userinterface.Brand_List),
re_path(r'^api/user_products_maincategory', userinterface.User_Products_Maincategory),
re_path(r'^api/user_productsdetails_by_id', userinterface.User_ProductsDetails_By_Id),
re_path(r'^api/user_submit', userinterface.User_Submit),
re_path(r'^api/check_user_login', userinterface.CheckUserLogin),
re_path(r'^api/fetch_user_address', userinterface.FetchUserAddress),
re_path(r'^api/address_submit', userinterface.Address_Submit),



]
 