# `Discord-Clone`

## Database Schema Design

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Request
  * Method: "GET"
  * URL: "/api/user/:userId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "username": "JSmith",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com",
      "status": "Online",
      "createdAt": "2021-11-19 20:39:36"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Request
  * Method: "POST"
  * URL: "/api/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Request
  * Method: "POST"
  * URL: "/api/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "username": "JSmith",
      "password": "password",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "JSmith",
      "password": "password",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "username": "Username is required",
        "password": "Password is required",
        "email": "Invalid email",
        "avatar": "An image URL is required"
      }
    }
    ```

## SERVERS

### Get all Servers the Current User owns/is a member of

## SELECT server_id FROM server_members WHERE user_ID == current.id
## JOIN servers ON server_members.server_id = servers.id


Returns all the servers the current user is an owner or member of.

* Request
  * Method: "GET"
  * URL: "/api/servers/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Servers": {
        {
          "server_id": 1,
          "user_id": 1,
          "name": "Hot Dog Fan Club",
          "icon": "FakeURL.com",
          "owner_id": 1,
          "createdAt": "2021-11-19 20:39:36",
        }
      }
    }
    ```

### Get Server from id

Returns the details of a spot specified by its id.

* Request
  * Method: "GET"
  * URL: "/api/:serverId"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "owner_id": 1,
      "name": "Hot Dog Fan Club",
      "icon": "FakeURL.com",
      "Channels": {
        {
          "id": 1,
          "server_id": 1,
          "owner_id": 1,
          "name": "Ketchup Kondo"
        },
        {
          "id": 2,
          "server_id": 1,
          "owner_id": 1,
          "name": "Mustard Maison"
        }
      },
      "Server_Members": {
        {
          "id": 1,
          "user_id": 1,
          "server_id": 1
        },
        {
          "id": 2,
          "user_id": 5,
          "server_id": 1
        },
        {
          "id": 3,
          "user_id": 1644,
          "server_id": 1
        },
      }
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Server

Creates and returns a new server.

* Request
  * Method: "POST"
  * URL: "/api/user/:userId"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Hot Dog Fan Club",
        "icon": "FakeURL.com",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Hot Dog Fan Club",
      "icon": "FakeURL.com",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "icon": "An image URL is required",
      }
    }
    ```

### Edit a Server

Updates and returns an existing Server.

* Require proper authorization: Server must belong to the current user
* Request
  * Method: "PUT"
  * URL: "/api/server/:serverId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Hot Dog Fan Club",
        "icon": "FakeURL.com",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Hot Dog Fan Club",
      "icon": "FakeURL.com",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "icon": "An image URL is required",
      }
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Server

Deletes an existing server.

* Require proper authorization: Server must belong to the current user
* Request
  * Method: "DELETE"
  * URL: "/api/server/:serverId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## CHANNELS

### Get Channel by Id

Returns the selected channel in the current server.

* Require Authentication: true
* Request
  * Method: "GET"
  * URL: "/api/server/:serverId/channel/:channelId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 1,
          "server_id": 1,
          "owner_id": 1,
          "name": "Ketchup Kondo",
          "icon": "FakeURL",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Messages": {
            {
            "id": 1,
            "server_id": 1,
            "channel_id": 1,
            "owner_id": 1,
            "content": "Ketchup is kool",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            },
            {
            "id": 2,
            "server_id": 1,
            "channel_id": 1,
            "owner_id": 5,
            "content": "This isn't the mustard channel",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            }
          }
        }
    }
    ```

### Create a new Channel

Creates and returns a new channel.

* Request
  * Method: "POST"
  * URL: "/api/server/:serverId/channel
  * Body:
      ```json
    {
        "name": "Mayo Manor",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels":
        {
          "id": 3,
          "server_id": 1,
          "owner_id": 1,
          "name": "Mayo Manor",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Messages":
        }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

### Edit a Channel

Updates and returns an existing Channel.

* Require proper authorization: Channel must belong to the current user
* Request
  * Method: "PUT"
  * URL: "/api/server/:serverId/channel/:channelId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Mayonaise Manor",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Mayonaise Manor",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

### Delete a Channel

Deletes an existing channel.

* Require proper authorization: Channel must belong to the current user
* Request
  * Method: "DELETE"
  * URL: "/api/server/:serverId/channel/:channelId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```



## LIVE MESSAGING

### Get all of the current Channel's Messages

Return all the Messages in the current Channel.

* Request
  * Method: "GET"
  * URL: "/api/servers/:serverId/channels/:channelId/messages"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Messages": {
            {
            "id": 1,
            "server_id": 1,
            "channel_id": 1,
            "owner_id": 1,
            "content": "Ketchup is kool",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            },
            {
            "id": 2,
            "server_id": 1,
            "channel_id": 1,
            "owner_id": 5,
            "content": "This isn't the mustard channel",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            }
      }
    }
    ```

### Create a new Message

Create and display a new message

* Require Authentication: true
* Request
  * Method: "POST"
  * URL: "/api/servers/:serverId/channels/:channelId/messages"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "content": "This is a test message"
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      {
        "id": 2,
        "server_id": 1,
        "channel_id": 1,
        "owner_id": 5,
        "content": "This is a test message",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Can't post an empty message",
      "statusCode": 400,
      "errors": {
        "content": "There must be some content",
      }
    }
    ```

## DIRECT MESSAGES

### Get all of the users you are direct messaging

Return all the Messages in the current Channel.

* Request
  * Method: "GET"
  * URL: "/api/@me"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Users": {
        {
          "id": 5,
          "username": "Another Hot Dog Joke",
          "avatar": "FakeURL.com",
          "status": "Online",
        }
      }
    }
    ```

### Add a new user to Direct Message with (UNFINISHED: Check with Yake on how to set up the channel)

* Request
  * Method: "POST"
  * URL: "/api/dm/@me"
  * Headers:
    * Content-Type: application/json
  * Body:
# Current User will post the user.id or user.username to find another User
    ```json
      {
        "id": 1
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 3,
          "server_id": 2,
          "owner_id": 1,
          "name": "username of found user",
          "icon": "avatar of found user"
        }
    }
    ```

### Get all messages between you and a specific User

* Request
  * Method: "GET"
  * URL: "/api/@me/chanelId"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 2,
          "server_id": 2,
          "owner_id": 1,
          "name": "username of found user",
          "icon": "avatar of found user",
          "Messages": {
            {
            "id": 3,
            "server_id": 2,
            "channel_id": 3,
            "owner_id": 1,
            "content": "Hey man, howw's it going?",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            },
            {
            "id": 4,
            "server_id": 2,
            "channel_id": 3,
            "owner_id": 5,
            "content": "Pretty good, thanks for messaging me",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
            }
          }
        }
    }
    ```

### Create a new Direct Message

Create and display a new message

* Require Authentication: true
* Request
  * Method: "POST"
  * URL: "/api/@me/channelId"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "content": "This is a test message"
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      {
        "id": 5,
        "server_id": 2,
        "channel_id": 3,
        "owner_id": 5,
        "content": "This is a test message",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Can't post an empty message",
      "statusCode": 400,
      "errors": {
        "content": "There must be some content",
      }
    }
    ```
