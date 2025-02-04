from django.db import migrations

def populate_categories(apps, schema_editor):
    Category = apps.get_model("api", "Category")
    categories = ["Groceries", "Rent", "Utilities", "Entertainment", "Transportation", "Healthcare"]
    for cat in categories:
        Category.objects.get_or_create(name=cat)

class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_category_transaction_category"),
    ]

    operations = [
        migrations.RunPython(populate_categories),
    ]
