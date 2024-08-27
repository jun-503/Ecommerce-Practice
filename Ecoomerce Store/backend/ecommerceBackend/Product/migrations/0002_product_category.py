# Generated by Django 5.0.7 on 2024-08-01 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('MB', 'Mobiles'), ('CL', 'Clothing'), ('GR', 'Grocery'), ('LP', 'Laptop'), ('AP', 'Appliances')], default='AP', max_length=2),
        ),
    ]