# Generated by Django 4.2.3 on 2023-08-24 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_alter_course_rating_orderitem_billing'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='qty',
            field=models.IntegerField(blank=True, default=5, null=True),
        ),
    ]
