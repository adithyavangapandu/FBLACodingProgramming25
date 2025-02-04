from django.db import migrations







def add_default_categories(apps, schema_editor):
    Category = apps.get_model("api", "Category")

    categories = [
        {"name": "Income", "outgoing": False},
        {"name": "Other Incoming", "outgoing": False},
        {"name": "Investments", "outgoing": True},
        {"name": "Rent", "outgoing": True},
        {"name": "Food", "outgoing": True},
        {"name": "Utilities", "outgoing": True},
        {"name": "Entertainment", "outgoing": True},
        {"name": "Transportation", "outgoing": True},
        {"name": "Other Outgoing", "outgoing": True}

    ]

    for cat in categories:
        Category.objects.get_or_create(name=cat["name"], defaults={"outgoing": cat["outgoing"]})

class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_category_outgoing"),
    ]

    operations = [
        migrations.RunPython(add_default_categories),
    ]