# Your First Approach to DJANGO

## PyCharm and GitKraken Configuration

["untitled"](untitled.markdown)


### What is a Django App?
* A django app is a way to organize the different kind of parts of a django proyect
* You could say that a django app is a group of related:
	* Templates **(interface with html files)** 
	* Models **(Entitys or Data Base tables)**
	* Views **(functions of django used to interact between models and templates)**
	* Forms **(just forms used to upload information to the database usually connected with a django templete through a view)**
	* Static files **(files that your template could need like css or js files)**

### How Do you use django apps?
1. First you should create your app in your terminal (in this case you are using PyCharm Terminal):
	1. insert image of pycharm terminal
	* insert the following command
	```
	$ python manage.py startapp name
	```	 
2. Now you can see your app folder in your folder part of pycharm
	1. image
3. Go to your project folder
4. Open your settings.py file 
5. insert your app name in INSTALLED_APPS
	1. image 
6. create the following folders:
	1. templates
	2. static
	3. forms


!["Horario"](Horario.jpeg)