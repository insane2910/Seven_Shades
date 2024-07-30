from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from  sevenshadesapp.models import SubCategory
from sevenshadesapp.serializer import SubCategorySerializer
from sevenshadesapp.serializer import SubCategoryGetSerializer
from rest_framework.decorators import api_view
 
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def SubCategory_Submit(request):
  
 try:
   if request.method=='POST':
    subcategory_serializer=SubCategorySerializer(data=request.data)
   
    if(subcategory_serializer.is_valid()):
    
      subcategory_serializer.save()
      return JsonResponse({"message":'SubCategory Submitted Successfully',"status":True},safe=False)
    else:
      return JsonResponse({"message":'Fail to  submit sub category',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  submit sub category',"status":False},safe=False) 
 

@api_view(['GET','POST','DELETE'])
def SubCategory_List(request):

 try:
    if request.method=='GET':
        subcategory_list=SubCategory.objects.all()
        subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True)
        print(subcategory_serializer_list.data)
        return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def EditCategory_Icon(request):
  
 try:
   if request.method=='POST':
      subcategory_data=SubCategory.objects.get(pk=request.data['id'])
      subcategory_data.icon=request.data['icon']
      subcategory_data.save()
      return JsonResponse({"message":'SubCategory Icon Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update icon',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update subcategory icon',"status":False},safe=False) 
 
@api_view(['GET', 'POST', 'DELETE'])
def EditCategory_Data(request):
  
 try:
   if request.method=='POST':
      subcategory_data=SubCategory.objects.get(pk=request.data['id'])
      subcategory_data.maincategoryid_id=request.data['maincategoryid']
      subcategory_data.subcategoryname=request.data['subcategoryname']
      subcategory_data.save()
      return JsonResponse({"message":'SubCategory Data Updated Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  update data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  update subcategory',"status":False},safe=False) 

@api_view(['GET', 'POST', 'DELETE'])
def DeleteCategory_Data(request):

 try:
   if request.method=='POST':
      subcategory_data=SubCategory.objects.get(pk=request.data['id'])
      
      subcategory_data.delete()
      return JsonResponse({"message":'SubCategory Deleted Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  delete data',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to delete subcategory',"status":False},safe=False) 
