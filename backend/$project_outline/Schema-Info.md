# Schema data  (To Be Checked with Group)

## This the schema for the Discord project.  This can be copied directly into dbdiagram.io to view more easily.

Table user {
  id integer
  username string
  password string
  email string
  avatar url
  status string
  createdAt date
  updatedAt date
  }

Table server {
  id integer
  owner_id integer [ref: > user.id]
  name string
  icon url
  private boolean
  createdAt date
  updatedAt date
}

Table channel {
  id integer
  server_id integer [ref: > server.id]
  owner_id integer [ref: > user.id]
  name string
  private boolean
  createdAt date
  updatedAt date
}

Table message {
  id integer
  server_id integer [ref: > server.id]
  channel_id integer [ref: > channel.id]
  owner_id integer [ref: > user.id]
  content string
  createdAt date
  updatedAt date
}

Table server_members {
  id integer
  user_id integer [ref: > user.id]
  server_id integer [ref: > server.id]
}
