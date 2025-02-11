# User API Spec

### Register User

Endpoint : POST /api/users/register

Request Body :

```
{
	"username": "tantows001",
	"password": "12354",
	"name": "Tantowi Shah Hanif"
	"email": "tantows001@gmail.com",
	"role": "admin"
}
```

Response Body (Success) :

```
{
	"data": {
        	"username": "tantows001",
        	"name": "Tantowi Shah Hanif",
        	"email": "tantows001@gmail.com",
		"role": "admin"
	}
}
```

Response Body (Failed) :

```
{
	"error": "Username or password is wrong"
}
```

### Login User

Endpoint : POST /api/users/login

Request Body :

```
{
	"email": "tantows001@gmail.com",
	"password": "12354",
}
```

Response Body (Success) :

```
{
    "data": {
        "username": "tantows001",
        "name": "Tantowi Shah Hanif",
        "email": "tantows001@gmail.com",
	"role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Isadlsankldnaskldjajoiijwqoidjioqwjdoqw"
}
```

Response Body (Failed) :

```
{
	"error": "Username must not blank"
}
```

### Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization: jwt token

Response Body (Success) :

```
{
    "data": {
        "username": "tantows001",
        "name": "Tantowi Shah Hanif",
        "email": "tantows001@gmail.com",
	"role": "admin"
    }
}
```

Response Body (Failed) :

```
{
	"errors": "User is not found, ..."
}
```

### Update User

Endpoint : PATCH /api/users/login

Request Header :

- Authorization : jwt token

Request Body :

```
{
	"password": "12354",
	"name": "Tantowi Shah Hanif",
        "email": "tantows001@gmail.com",
	"role": "admin"
}
```

Response Body (Success) :

```
{
	"data": {
		"username": "tantows001",
		"name": "Tantowi Shah Hanif"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized"
}
```
