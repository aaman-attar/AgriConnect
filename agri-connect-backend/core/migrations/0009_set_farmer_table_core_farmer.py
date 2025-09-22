# Ensures final Farmer table name is 'core_farmer' regardless of previous 0008 branches
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_farmer_table'),
        ('core', '0008_alter_farmer_table_core_farmer'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='farmer',
            table='core_farmer',
        ),
    ]
