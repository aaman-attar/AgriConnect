from rest_framework import serializers
from .models import Farmer
from .models import MarketPrice
from .models import MarketplaceItem
from .models import QuickTip
from django.contrib.auth.hashers import make_password

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)

class MarketPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPrice
        fields = '__all__'


class MarketplaceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketplaceItem
        fields = '__all__'

class QuickTipSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickTip
        fields = '__all__'