# Generated by Django 4.2.3 on 2023-08-24 12:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_course_qty'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='qty',
            new_name='countInStock',
        ),
    ]