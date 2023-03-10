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

### Get all Users

Returns user_id, username, avatar, and status of all users

* Request
  * Method: "GET"
  * URL: "/api/users
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
      "avatar": "FakeURL.com",
      "status": "Online",
    },
    {
      "user_id": 2,
      "username": "Dkimball",
      "avatar": "coolpicURL.com",
      "status": "offline",
    }
   ```
   
   
* Error response: 
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "No users found",
      "statusCode": 404,
    }
    ```
    
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
  * URL: "/api/users/:userId
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
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "avatar": "FakeURL.com",
      "status": "Online",
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
    
    ### Get user by id

Returns user_id, username, avatar and status of user by id

* Request
  * Method: "GET"
  * URL: "/api/users/:userId
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
      "avatar": "FakeURL.com",
      "status": "Online",
    }
    ```

* Error response: user not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "user by id not found",
      "statusCode": 404,
 
    }
    ```
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

        ### Get user by username

Returns user_id, username, avatar and status of user by id

* Request
  * Method: "GET"
  * URL: "/api/users/:username
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
      "avatar": "FakeURL.com",
      "status": "Online",
    }
    ```

* Error response: user not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "user by username not found",
      "statusCode": 404,
 
    }
    ```
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

## SERVERS

### Get all **PUBLIC** Servers

Returns all the servers in the database.

* Request
  * Method: "GET"
  * URL: "/api/servers/
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
          "owner_id": 1,
          "name": "Hot Dog Fan Club",
          "icon": "FakeURL.com",
          "private": "False",
          "createdAt": "2021-11-19 20:39:36",
        },
                {
          "server_id": 6,
          "owner_id": 99,
          "name": "Brand New Fan Club",
          "icon": "FakeURL.com",
          "private": "False",
          "createdAt": "2021-11-19 20:39:36",
        }
      }
    }
    ```

### Get all **PUBLIC** Servers the Current User owns/is a member of

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
          "owner_id": 1,
          "name": "Hot Dog Fan Club",
          "icon": "FakeURL.com",
          "private": "False",
          "createdAt": "2021-11-19 20:39:36",
        }
      }
    }
    ```

### Get **PUBLIC** Server from Server Id

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
      "private": "False",
      "Channels": {
        {
          "id": 1,
          "server_id": 1,
          "owner_id": 1,
          "name": "Ketchup Kondo",
          "private": "False",
        },
        {
          "id": 2,
          "server_id": 1,
          "owner_id": 1,
          "name": "Mustard Maison",
          "private": "False",
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
    
  * Error Response: Unauthroized - Must be logged in
  * Request: endpoints that require proper authorization
  * Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403,
    }
    ```

### Create a Server

Creates and returns a new server with a starting channel.

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
      "private": "False",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Channel": {
        {
          "id": 1,
          "server_id": 1,
          "owner_id": 1,
          "name": "default channel",
          "icon": "FakeURL",
          "private": "False",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        },
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
        "icon": "An image URL is required",
      }
    }
    ```

* Error Response: Unauthroized
  * Request: endpoints that require proper authorization
  * Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403,
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
      "private": "False",
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

* Error response:  Only the Server Owner can edit the Server.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the Server Owner can edit server.",
      "statusCode": 403
    }
    ```

* Error response: Couldn't find a Server with specified id
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

* Error response:  Only the Server Owner can delete this Server
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the server owner can delete this server",
      "statusCode": 403
    }
    ```

## CHANNELS

### Get Channel from Channel id

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
          "private": "False",
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
  * Status Code: 201
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
          "private": "False",
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

* Error response:  Only the Server Owner can create a new Channel.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the Server Owner can create a new Channel.",
      "statusCode": 403
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
      "private": "False",
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

* Error response:  Only the server owner can edit server channels.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the server owner can edit server channels.",
      "statusCode": 403
    }
    ```

* Error response:  Could not find the channel.
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404
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

* Error response:  Only the Server Owner can delete this Channel
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the Server Owner can delete this Channel",
      "statusCode": 403
    }
    ```



## LIVE MESSAGING

### Get all messages by channel id

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

* Error response:  Only Server Members can see Messages.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only Server Members can see Messages.",
      "statusCode": 403
    }
    ```
    
* Error response:  Could not find the channel messages.
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel messages not found",
      "statusCode": 404
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

* Error response:  Only Server Members can create Messages.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only Server Members can create Messages.",
      "statusCode": 403
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
          "private": "False",
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
