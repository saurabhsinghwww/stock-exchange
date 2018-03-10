from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from exchange.models import User, Orders, UserOrders, Stocks
from django.db.models import Max
from exchange.serializers import UserSerializer, OrdersSerializer, UserOrdersSerializer, StocksSerializer
from datetime import datetime

class UserViewSet(generics.RetrieveAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserOrdersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user-order to be viewed or edited.
    """
    queryset = UserOrders.objects.all()
    serializer_class = UserOrdersSerializer   

class OrdersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows orders to be viewed or edited.
    """
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer     

@api_view(["GET"])
def is_valid_user(request):
    """
    API endpoint for checking is user is valid
    """
    try:
        User.objects.get(email = request.GET.get('email'), password = request.GET.get('password'))
        return Response(True)        
    except:
        return Response(False)        

@api_view(["GET"])
def get_stocks(request):
    """
    For returning the stocks configured as part of migration
    """
    stocks = Stocks.objects.all().values()
    serializer = StocksSerializer(stocks, many=True)
    return Response(serializer.data)    

@api_view(["GET"])
def get_user_orders(request):
    """
    Return the orders for the given user
    """
    user_id = User.objects.get(email=request.GET.get('email')).user_id
    orders = Orders.objects.filter(order_id__in=UserOrders.objects.filter(user_id=user_id).order_by('order_id').values_list('order_id'))

    serializer = OrdersSerializer(orders, many=True)
    return Response(serializer.data)   

@api_view(["POST"])
def submit_order(request):
    """
    The method submit the order to the exchange.
    It also try to match the order by checking that if order is 'SELL' then is there is any 'BUY'
    order present for the same limit price and stock, vice-versa for 'BUY'.
    """
    orders = request.data['orders']
    user_id = User.objects.get(email=request.data['user']).user_id
    order_id = datetime.now().microsecond
    
    for order in orders:

        stock_id = Stocks.objects.get(stock_name=order['stock_name']).stock_id

        order_type_to_check = 'BUY' if order['order_type'] == 'SELL' else 'BUY'     
        is_executed = execute_orders_on_exchange(order_type_to_check, stock_id, order['limit_price'])

        status = 'SUCCESS' if (is_executed) else 'PENDING'

        Orders.objects.create(order_id = order_id, order_type=order['order_type'], stock_id=stock_id, limit_price=order['limit_price'], status=status)
            
        UserOrders.objects.create(user_order_id=datetime.now().microsecond, order_id=order_id, user_id=user_id)
      
        
    return Response(None)

def execute_orders_on_exchange(order_type, stock_id, limit_price):
    
    orders_for_update = Orders.objects.filter(limit_price = limit_price).filter(stock_id = stock_id).filter(order_type = order_type).filter(status = 'PENDING')
    
    if orders_for_update != None and orders_for_update.count() > 0:
        Orders.objects.filter(order_id = orders_for_update.first().order_id).update(status='SUCCESS')        
        return True
    else:
        return False  
