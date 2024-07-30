from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from  sevenshadesapp.models import Brand
from sevenshadesapp.serializer import BrandSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def Brand_Submit(request):
  
 try:
   if request.method=='POST':
    brand_serializer=BrandSerializer(data=request.data)
   
    if(brand_serializer.is_valid()):
    
      brand_serializer.save()
      return JsonResponse({"message":'Brand Submitted Successfully',"status":True},safe=False)
    else:
      return JsonResponse({"message":'Fail to  submit Brand',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  submit Brand',"status":False},safe=False) 
 
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
 
@api_view(['GET', 'POST', 'DELETE'])
def EditBrand_Icon(request):
  
 try:
   if request.method=='POST':
      brand_data=Brand.objects.get(pk=request.data['id'])
      brand_data.icon=request.data['icon']
      brand_data.save()
      return JsonResponse({"message":'Brand Icon Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update icon',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update brand icon',"status":False},safe=False) 

@api_view(['GET', 'POST', 'DELETE'])
def EditBrand_Data(request):
  
 try:
   if request.method=='POST':
      brand_data=Brand.objects.get(pk=request.data['id'])
      brand_data.brandname=request.data['brandname']
      brand_data.save()
      return JsonResponse({"message":'Brand Data Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update brand',"status":False},safe=False) 

@api_view(['GET', 'POST', 'DELETE'])
def DeleteBrand_Data(request):
  
 try:
   if request.method=='POST':
      brand_data=Brand.objects.get(pk=request.data['id'])
      
      brand_data.delete()
      return JsonResponse({"message":'Brand Deleted Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  delete data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to delete brand',"status":False},safe=False) 
