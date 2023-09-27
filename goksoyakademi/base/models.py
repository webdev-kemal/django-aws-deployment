from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    isTeacher = models.BooleanField(default=False)

class Course(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default="https://picsum.photos/1920/1080")
    description = models.TextField(max_length=200, null=True, blank=True)
    dil = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)   
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=5)
    date = models.DateField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.title
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # User who placed the order
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)  # Example: 'PayPal', 'Credit Card'
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    isDelivered = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)  # Timestamp when delivered
    createdAt = models.DateField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.createdAt
    

class OrderItem(models.Model):
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)  # Linking the OrderItem to an Order
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(default=0)  # Number of this course in the order
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Price of the course at the time of the order
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.name
    

class Billing(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalcode = models.IntegerField(default=0)  # Number of this course in the order
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.address


class Video(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    thumbnail = models.ImageField(upload_to='image')
    _id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self) :
        return self.title