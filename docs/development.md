# Development

This integration focuses on [Cisco Panoptica](https://panoptica.app) and is using
[Secure Application Management API](https://securecn.cisco.com/api/swagger-ui.html)
for interacting with the resources.

## Provider account setup

### In Cisco Panoptica

[API & Secret keys](https://appsecurity.readme.io/docs/securecn-rest-api#api--secret-keys)

1. Navigate to the System page, and then select MANAGE USERS.
2. Click New User and then select Service User.
3. Enter a name for the user. Leave the status as 'Active'.
4. Click FINISH. Copy the values of Access Key and Secret Key, as they will be
   used later.

## Authentication

Provide the `ACCESS_KEY`, and `SECRET_KEY` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.
