# Generated by Django 5.1.5 on 2025-02-01 17:31

from django.db import migrations, models

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
        ("api", "0003_populate_categories"),  # Keep the correct previous migration dependency
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="outgoing",
            field=models.BooleanField(default=True),
        ),
        migrations.RunPython(add_default_categories),  # ✅ This populates the database
    ]
