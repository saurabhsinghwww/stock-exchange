from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True, default=1)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email

class Stocks(models.Model):
    stock_id = models.AutoField(primary_key=True, default=1)
    stock_name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.stock_name + "_" + str(self.price)

class Orders(models.Model):
    order_id = models.AutoField(primary_key=True, default=1)
    order_type = models.CharField(max_length=255)
    stock_id = models.IntegerField()
    limit_price = models.IntegerField(default=0)
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.order_type + str(self.stock_id) + "_" + str(self.limit_price) + "_" + str(self.status)

class UserOrders(models.Model):
    user_order_id = models.AutoField(primary_key=True, default=1)
    user_id = models.IntegerField()
    order_id = models.IntegerField()

    def __str__(self):
        return str(self.user_id) + "_" + str(self.order_id)        