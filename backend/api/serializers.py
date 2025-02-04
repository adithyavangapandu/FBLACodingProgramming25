from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Transaction, Category



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user



class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "Location", "description", "created_at", "amount", "author", "category"]
        extra_kwargs = {"author": {"read_only": True}} # Be able read who author is but not write.


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "outgoing"]

class NumberSerializer(serializers.Serializer):
    number = serializers.FloatField()
