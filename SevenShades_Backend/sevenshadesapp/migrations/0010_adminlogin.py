# Generated by Django 3.2.5 on 2024-02-19 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sevenshadesapp', '0009_alter_productdetail_icon'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminLogin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emailid', models.CharField(default='', max_length=70, unique=True)),
                ('mobileno', models.CharField(default='', max_length=70, unique=True)),
                ('adminname', models.CharField(default='', max_length=70)),
                ('password', models.CharField(default='', max_length=70)),
                ('picture', models.CharField(default='', max_length=70)),
            ],
        ),
    ]