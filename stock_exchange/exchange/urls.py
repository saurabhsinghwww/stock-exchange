from django.conf.urls import url
from exchange.views import *

urlpatterns = [
    url(r'^user/is-valid', is_valid_user, name='is_valid_user'),
    url(r'^stocks', get_stocks, name='get_stocks'),
    url(r'^order', submit_order, name='submit_order'),
    url(r'^user/orders', get_user_orders, name='get_user_orders'),
]