from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from  sevenshadesapp.models import MainCategory
from sevenshadesapp.serializer import MainCategorySerializer
from rest_framework.decorators import api_view
 
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def MainCategory_Submit(request):
  
 try:
   if request.method=='POST':
    maincategory_serializer=MainCategorySerializer(data=request.data)
   
    if(maincategory_serializer.is_valid()):
    
      maincategory_serializer.save()
      return JsonResponse({"message":'MainCategory Submitted Successfully',"status":True},safe=False)
    else:
      return JsonResponse({"message":'Fail to  submit MainCategory',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  submit main category',"status":False},safe=False) 
 
@api_view(['GET', 'POST', 'DELETE'])
def MainCategory_List(request):
  
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
def EditCategory_Icon(request):
  
 try:
   if request.method=='POST':
      maincategory_data=MainCategory.objects.get(pk=request.data['id'])
      maincategory_data.icon=request.data['icon']
      maincategory_data.save()
      return JsonResponse({"message":'MainCategory Icon Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update icon',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update maincategory icon',"status":False},safe=False) 

@api_view(['GET', 'POST', 'DELETE'])
def EditCategory_Data(request):
  
 try:
   if request.method=='POST':
      maincategory_data=MainCategory.objects.get(pk=request.data['id'])
      maincategory_data.maincategoryname=request.data['maincategoryname']
      maincategory_data.save()
      return JsonResponse({"message":'MainCategory Data Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update maincategory',"status":False},safe=False) 


@api_view(['GET', 'POST', 'DELETE'])
def DeleteCategory_Data(request):
  
 try:
   if request.method=='POST':
      maincategory_data=MainCategory.objects.get(pk=request.data['id'])
      
      maincategory_data.delete()
      return JsonResponse({"message":'MainCategory Deleted Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  delete data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to delete maincategory',"status":False},safe=False) 
