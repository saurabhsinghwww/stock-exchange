from exchange.models import User, Orders, UserOrders, Stocks
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'email', 'password')

class OrdersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Orders
        fields = ('order_id', 'order_type', 'stock_id', 'limit_price', 'status')

class UserOrdersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserOrders
        fields = ('user_order_id', 'user_id', 'order_id')    

class StocksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stocks
        fields = ('stock_id', 'stock_name', 'price')                     