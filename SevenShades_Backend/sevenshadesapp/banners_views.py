from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from  sevenshadesapp.models import Banners
from sevenshadesapp.serializer import BannersSerializer
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage

# Create your views here.

def Upload_Files(files):
    iconname=[]
    for uploaded_file in files.getlist('icon'):
            file_path = default_storage.save('static/' + uploaded_file.name, uploaded_file)
            print(file_path)
            iconname.append(uploaded_file.name)
    return ",".join(iconname)

@api_view(['GET', 'POST', 'DELETE'])
def Banners_Submit(request):
  
 try:
   
   if request.method=='POST':
    print("FILLEEEEES",dict(request.FILES),'\n\n')
    print(request.data['icon'],'\n\n')
    filenames=Upload_Files(request.FILES)
    request.data['icon'] = filenames
    print(request.data)
    banners_serializer=BannersSerializer(data=request.data)

   if(banners_serializer.is_valid()):   
      banners_serializer.save()
      return JsonResponse({"message":'Banners Submitted Successfully',"status":True},safe=False)
   else:
      return JsonResponse({"message":'Fail to  submit Banners',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Fail to  submit banners',"status":False},safe=False) 