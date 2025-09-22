# Generated manually to align Farmer table name with existing DB table 'core_farmer'
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_farmer_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='farmer',
            table='core_farmer',
        ),
    ]
