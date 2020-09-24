# Understanding Django

**Note:** This guide is a simplification of the most important components for someone that needs to understand and work with django.

**Some Components are much more complex than what is mentioned here and the explanation of its operation needs the definition of others, to know in depth and exactly how django works is recommended to read the documentation in :** https://docs.djangoproject.com/

### Simple approach to interactions between the different parts of Django


!["image 1"](django-simple.png?raw=true)

1. Users interact with the web app using the url's:
    * Through "the common" use of urls as: yourwebsite.com/admin/users
    * Through urls embebed in buttons:
```HTML
    <a href="{% url "item" item_id=item.id %}" class="btn btn-primary">Buy this item</a>
``` 
2. When the user call an url django call a function(Views) that defines what the user sees
3. Views use GET and POST methods to interact with the DataBase:
    * GET is used to request data from a specified resource.
    * POST is used to send data to a server to create/update a resource.
4. Models are the equivalent to tables or entities in Data Bases 
5. Forms are compoments that prepare and restruct data to upload it to the Data Base
6. Templates are html templates that use django variables or embebed code to show what the views define.

## *Pseudo* defining the parts of Django

### Models
* To create and manipulate data in your Data Base you usually use *Entities* or *Tables*(SQL) in Django you use models
* To define a Model you use the class syntaxis and extends the models.Models class 
*  #### Simple Model example
```python
from django.db import models
from rest_framework import serializers as ser


class TestObject(models.Model):
    #You have to define TestObject attributes and restrictions
    id = models.AutoField(primary_key=True)
    foo = models.DecimalField(decimal_places=120, max_digits=128,null=True)
```

* #### Complex Model example
```PYTHON
from django.contrib.auth.models import User
from django.db import models


class YourFirstEntity(models.Model):

	# you define that YourFirstEntity is a User
	# an user by default has id, first_name, last_name and email between other attributes
	user = models.OneToOneField(User, on_delete=None, primary_key=True)
	# you use IntegerField to define an attribute as an Integer in the db
	integer_attribute = models.IntegerField()
	# you use TextField to define an attribute as a string in the db
	text_attribute = models.TextField()
	#you havet to define some restrictions or characteristics for some kind of attributes
	decimal_attribute = models.DecimalField(decimal_places=120, max_digits=128, null=True, blank=True)
	char_attribute = models.CharField(max_length=100)
	#Making a relationship with other Entity
	yourSecondEntity = models.ForeignKey(YourSecondEntity, on_delete=None)
	# Meta-data of the class
	# db_table change the name of the table in the Data Base
	class Meta:
		db_table = 'my_first_entity'
```


### URLs
* When you call www.yourwebsite.com/some_url Django search in the urls.py some function (view) that will respond to your request 

```PYTHON
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

urlpatterns = [
  
  path('hello-world/', views.hello_world),
  # in some cases we send parameters through our urls 
  path('test/python_list/<int:n>', python_list_test),
]
```

### Views
Views are funcitions that take care of the connection between users request and server actions
* #### Simple view example:
	* So your user wants to see www.yourdomine.com/hello-world ?
	* Then... Your function will respond with a Hello World !
```PYTHON
def hello_world(request):
  return HttpResponse('Hello, world!')
```
* #### Other view example:
```python
# This function perform tests in a python list with n insertions and deletions
def python_list_test(request, n):
	# create a dictionary that conteins the tittle of the test 
    results = {
        'title': 'Test with {} numbers in a List'.format(n)
    }

    python_list = []
    #this part test the time of n insertions 
    initial_time = time()
    for i in range(n):
        python_list.append(i)
    t_final = time()
    t_total = t_final - initial_time
    # we send the time of insertion to the results dictionary
    results['python_list_insertion'] = t_total
    # test the time of n deletions
    initial_time1 = time()
    for i in range(n):
        python_list.pop()
    t_final1 = time()
    t_total1 = t_final1 - initial_time1
    # send the time of deletion to the results dictionary
    results['python_list_delete'] = t_total1
    # send the results and define the template 
    return render(request, 'test_2.html', results)
```

Then you show that information in your template using variables:

```html
 <h1 class="my-4">{{ title }}</h1>
<table class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Python default List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Add</th>
      <td>{{ python_list_insertion }}</td>

    </tr>
    <tr>
      <th scope="row">Delete</th>
      <td>{{python_list_delete}}</td>
    </tr>
     </tbody>
</table>
```
* ##### Using REQUEST, GET and POST (Complex example)
	* Your user is able to ask for an url (GET method) or send something (POST method)
	* you configure POST method in your html forms method to send information in a form
```html
<form method="POST"></form>
```
Also you can use GET method to ask for something in an input
```html
  <form action="/search" method="get">
                <input class="form-control" type="search" id="term" name="term" placeholder="Search items !">
                <br>
                <button class="btn btn-primary btn-lg">Search!</button>
  </form>
```
then in your view you can search in your database something related to your term
```PYTHON
def search_view(request):

	#if your method is not GET the server sends and error
	if request.method != 'GET':
        return HttpResponseForbidden
	#you extract the term of the user request
	term = request.GET.get('term')
	#you extract in entity all the Entity1 objects that contains in their first name the term
	entity1 = Entity1.objects.filter(Q(user__first_name__icontains=term))
	# you serialize all the objects obteined to show them in an appropiate way
	entities1_serializer = Entity1Serializer(entity1, many=True)
	# you send in the request params your information to the template
	params = {
        'entities1': entities1_serializer.data,
    }
	return render(request, 'search.html', params)
```
Your template recive the params dictionary and display the information using variables as follows:
```html
<h2>Items</h2>
    {% for item in entities1 %}
        <div class="row">
            <div class="col-md-7">
                <a href="#">
                    <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
                </a>
            </div>
            <div class="col-md-5">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <h5>$ {{ item.price }}.</h5>
                <a href="{% url "active" item_id=item.id %}" class="btn btn-primary">Buy</a>
            </div>
        </div>
        <hr>
    {% endfor %}
```