from django.db import models

# Create your models here.
class MainCategory(models.Model):
    maincategoryname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')
class SubCategory(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')
class Brand(models.Model):
    brandname = models.CharField(max_length=70, blank=False, default='') 
    icon = models.ImageField(upload_to='static/')    
class Product(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brandid = models.ForeignKey(Brand, on_delete=models.CASCADE)
    productname = models.CharField(max_length=70, blank=False, default='')
    productdescription = models.CharField(max_length=500, blank=False, default='')
    icon = models.ImageField(upload_to='static/')
#ProductDetail
class ProductDetail(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brandid = models.ForeignKey(Brand, on_delete=models.CASCADE)
    productid = models.ForeignKey(Product, on_delete=models.CASCADE)
    productsubname = models.CharField(max_length=70, blank=False, default='')
    productsubdescription = models.CharField(max_length=500, blank=False, default='')
    qty = models.IntegerField(blank=False, default='')
    price = models.IntegerField(blank=False, default='')
    color = models.CharField(max_length=70, blank=False, default='')
    size = models.CharField(max_length=70, blank=False, default='')
    offerprice = models.IntegerField(blank=False, default='')
    offertype = models.CharField(max_length=70, blank=False, default='')
    icon = models.TextField(default='')
class AdminLogin(models.Model):
    emailid = models.CharField(max_length=70, blank=False, default='',unique=True)
    mobileno = models.CharField(max_length=70, blank=False, default='',unique=True)
    adminname = models.CharField(max_length=70, blank=False, default='')
    password = models.CharField(max_length=70, blank=False, default='')
    picture = models.CharField(max_length=70, blank=False, default='')
class Banners(models.Model):
    bannerdescription = models.CharField(max_length=500, blank=False, default='') 
    icon = models.TextField(default='')    

class Users(models.Model):
    mobileno = models.CharField(max_length=15, blank=False, primary_key=True)
    emailid = models.CharField(max_length=100, blank=False, unique=True)
    firstname = models.CharField(max_length=70, blank=False, default='')
    lastname = models.CharField(max_length=70, blank=False, default='')
    password = models.CharField(max_length=70, blank=False, default='')
    dob = models.CharField(max_length=70, blank=False, default='')
class UserAddress(models.Model):
    mobileno  = models.ForeignKey(Users, on_delete=models.CASCADE)
    country = models.CharField(max_length=70, blank=False, default='')
    address = models.CharField(max_length=70, blank=False, default='')
    city = models.CharField(max_length=70, blank=False, default='')
    postcode = models.CharField(max_length=70, blank=False, default='')
