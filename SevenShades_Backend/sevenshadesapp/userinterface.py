from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from  sevenshadesapp.models import Users,UserAddress, MainCategory,SubCategory,Brand,Product,Banners,ProductDetail
from sevenshadesapp.serializer import UserAddressSerializer, UserAddressGetSerializer, UserSerializer,UserAddressGetSerializer, ProductDetailGetSerializer, BrandSerializer, MainCategorySerializer,SubCategoryGetSerializer,BrandSerializer,ProductGetSerializer,BannersSerializer
from rest_framework.decorators import api_view
 
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def User_MainCategory_List(request):
  
 try:
   if request.method=='GET':
      maincategory_list=MainCategory.objects.all()
      maincategory_serializer_list=MainCategorySerializer(maincategory_list,many=True)
     
      return JsonResponse({"data":maincategory_serializer_list.data,"status":True},safe=False)
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  


@api_view(['GET','POST','DELETE'])
def user_subcategory_list_by_maincategoryid(request):
 try:
    if request.method=='POST':
         
        maincategoryid=request.data['maincategoryid']
        
        subcategory_list=SubCategory.objects.all().filter(maincategoryid_id=maincategoryid)
        subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True)
        
        return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)
    else:
            print("False")
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
   
@api_view(['GET', 'POST', 'DELETE'])
def Brand_List(request):
  
 try:
   if request.method=='POST': 
      subcategoryid=request.data['subcategoryid']
      maincategoryid=request.data['maincategoryid']
      product_list=Product.objects.all().filter(maincategoryid_id=maincategoryid,subcategoryid_id=subcategoryid)
      product_serializer_list=ProductGetSerializer(product_list,many=True) 
      #print("xyxyxyx:",dict(list(product_serializer_list.data)[0]['brandid']))
      finalresult=fetchData('brandid',product_serializer_list.data)
      return JsonResponse({"data":finalresult,"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  
 
def fetchData(field,data):
    data=list(data)
    result={}
    for row in data:
       mydata=dict(row) 
       print(dict(mydata[field]))
       record=dict(mydata[field])
       result[record['id']]=record
    finalresult=list(result.values())
    return(finalresult) 
       
@api_view(['GET', 'POST', 'DELETE'])
def Banner_List(request):
  
 try:
   if request.method=='GET': 
      banner_list=Banners.objects.all() 
      banner_serializer_list=BannersSerializer(banner_list,many=True) 
      
      return JsonResponse({"data":banner_serializer_list.data[0],"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  
    
@api_view(['GET', 'POST', 'DELETE'])
def Subcategory_List(request):
  
 try:
   if request.method=='GET': 
      SubCategory_list=SubCategory.objects.all() 
      subcategory_serializer_list=SubCategoryGetSerializer(SubCategory_list,many=True) 
      
      return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  
           
@api_view(['GET', 'POST', 'DELETE'])
def Category_List(request):
  
 try:
   if request.method=='GET': 
      maincategory_list=MainCategory.objects.all() 
      maincategory_serializer_list=MainCategorySerializer(maincategory_list,many=True) 
      
      return JsonResponse({"data":maincategory_serializer_list.data,"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  
           
@api_view(['GET', 'POST', 'DELETE'])
 
def Brand_List(request):
  
 try:
   if request.method=='GET': 
      brand_list=Brand.objects.all() 
      brand_serializer_list=BrandSerializer(brand_list,many=True) 
      
      return JsonResponse({"data":brand_serializer_list.data,"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  
@api_view(['GET','POST','DELETE'])
def User_Products_Maincategory(request):
 try:
    if request.method=='POST':
         
        maincategoryid=request.data['maincategoryid']
        
        product_list=Product.objects.all().filter(maincategoryid_id=maincategoryid)
        product_serializer_list=ProductGetSerializer(product_list,many=True)
        
        return JsonResponse({"data":product_serializer_list.data,"status":True},safe=False)
    else:
            print("False")
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
   
@api_view(['GET','POST','DELETE'])
def User_ProductsDetails_By_Id(request):
 try:
    if request.method=='POST':
         
        productid=request.data['productid']
        
        productdetail_list=ProductDetail.objects.all().filter(productid_id=productid)
        productdetail_serializer_list=ProductDetailGetSerializer(productdetail_list,many=True)
        
        return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)
    else:
            print("False")
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
   
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def User_Submit(request):
 try:
   if request.method=='POST':
    user_serializer=UserSerializer(data=request.data)
   
    if(user_serializer.is_valid()):
    
      user_serializer.save()
      return JsonResponse({"message":'User Regitered Successfully',"status":True},safe=False)
    else:
      return JsonResponse({"message":'Fail to  submit User',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  submit main User',"status":False},safe=False) 
 # Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def CheckUserLogin(request):
  
 try:
   if request.method=='POST':
    mobile=request.data['mobile']
    pwd=request.data['pwd']
    userLogin=Users.objects.all().filter(mobileno=mobile,password=pwd)
   
    user_serializer=UserSerializer(userLogin,many=True)
    if(len(user_serializer.data)==1):
      return JsonResponse({"data":user_serializer.data,"message":'Success',"status":True},safe=False)
    else:
      return JsonResponse({"data":[],"message":'Fail',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Server Error',"status":False},safe=False) 
 

@api_view(['GET', 'POST', 'DELETE'])
def FetchUserAddress(request):
  
 try:
   if request.method=='POST':
     mobileno=str(request.data['mobile'])
     print("zzzzzzzzzzzzzzzzzzz:",mobileno)
     userAddress=UserAddress.objects.all().filter(mobileno_id=mobileno)
     print("xxxxx:",userAddress)
     user_AddressSerializer=UserAddressGetSerializer(userAddress,many=True)
     print("Length:",len(user_AddressSerializer.data))
     if(len(user_AddressSerializer.data)>0):
      return JsonResponse({"data":user_AddressSerializer.data,"status":True},safe=False)
     else: 
      return JsonResponse({"data":[],"status":False},safe=False)  
   
   else:
      return JsonResponse({"data":[],"message":'Fail',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Server Error',"status":False},safe=False) 

#id, country, address, city, postcode, mobileno_id
@api_view(['GET','POST','DELETE'])
def Address_Submit(request):  # This API is called by "axios", result is returned by "axios"
    try:
        print("zzzzzzzzzzzzzzzz")
        if request.method=='POST':
            address_serializer=UserAddressSerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(address_serializer.is_valid()):  #checking data entered is valid or not
           address_serializer.save()       #then data is saved
           return JsonResponse({"message":'Address Submitted Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit Product',"status":False},safe=False)
    