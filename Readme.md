# Send-AM
SendAM is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

![):](https://github.com/Ejiro-Edwin/SendAm/blob/master/API_INT.PNG)

## Feature
* There are two types of users admin and regular user
* Users can Register if they have no account or login otherwise
* Users can create a new parcel delivery order by adding required fields
* Users can change the destination of their parcels
* Users can cancel a parcel delivery order
* Users can see a list of delivery orders they have made if they have made any
* Admin can change the status of a delivery order
* Admin can change the location a parcel delivery order

## Technologies Used
* Nodejs: an open source server framework that allows you to run JavaScript on the server.


## API endpoints

* View all parcel delivery ordes: /api/v1/parcels
* View one parcel delivery order: /api/v1/parcels/<id>
* Cancel a parcel delivery order: /api/v1/parcels/<id>/cancel
* View all users:                 /api/v1/users
* View a single user:             /api/v1/users/<id>
* View parcels belonging to user: /api/v1/users/<id>/parcels

## Author
* **Obamrevwo Ejiro Edwin** - https://github.com/Ejiro-Edwin




