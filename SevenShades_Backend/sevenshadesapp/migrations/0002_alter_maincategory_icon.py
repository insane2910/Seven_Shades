# Generated by Django 3.2.5 on 2023-12-25 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sevenshadesapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maincategory',
            name='icon',
            field=models.ImageField(upload_to='static/'),
        ),
    ]