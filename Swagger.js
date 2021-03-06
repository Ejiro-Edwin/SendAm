module.exports = {
    swagger: "2.0",
    info: {
        version: "1",
        title: "SEND AM API",
        description: "An API for making and sending parcel delivery orders"
    },
    schemes: ["https"],
    host: "",
    basePath: "/api/v1/",
    tags: [
        {
            name: "Auth",
            description: "Authenticate a user"
        }
    ],
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login to the API to get authentication token",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "email",
                        in: "formData",
                        description: "The email for login",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "password",
                        in: "formData",
                        description: "The password for login in text",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Returns an authentication token on success.",
                responses: {
                    "200": {
                        description:
                            "Authentication Successful, return user details and token"
                    },
                    "400": {
                        description: "Wrong Password and Email Combination"
                    }
                }
            }
        },
        "/auth/signup": {
            post: {
                tags: ["Auth"],
                summary: "Create an account for a new user on the API",
                description: "Returns status 201 on success.",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "firstname",
                        in: "formData",
                        description:"The firstname of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "lastname",
                        in: "formData",
                        description:"The lastname for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "othernames",
                        in: "formData",
                        description:"The other name of the user to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "email",
                        in: "formData",
                        description:"The email of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "username",
                        in: "formData",
                        description:"The username of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "password",
                        in: "formData",
                        description:"The password for the user account to be created",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "201": {
                        description: "New User created successfully",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    "400": {
                        description: "User Already Exists"
                    },
                    "500": {
                        description: "Error Saving User"
                    }
                }
            }
        },
        "/parcels/All": {
            get: {
                tags: ["Parcels"],
                summary: "Get parcel delivery orders",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "Bearer",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ]
            }
        },
        "/parcels/:id": {
            get: {
                tags: ["Parcels"],
                summary: "Get a parcel by it's identity number",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "Bearer",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                      name: "ID",
                      in: "formData",
                      description: "Parcel identity number",
                      required: true,
                      type: "string"
                  }
                ]
            }
        },
        "/parcels": {
            post: {
                tags: ["Parcels"],
                summary: "Work with parcel delivery orders",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "Bearer",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "weight",
                        in: "formData",
                        description: "The weight of your parcel",
                        required: true,
                        type: "number"
                    },
                    {
                        name: "fromAddress",
                        in: "formData",
                        description: "The originating Address",
                        required: true,
                        type: "string"
                    },
                    {
                      name: "toddress",
                      in: "formData",
                      description: "The Destination Address",
                      required: true,
                      type: "string"
                  },
                  {
                    name: "currentLocation",
                    in: "formData",
                    description: "The Parcels current Location",
                    required: true,
                    type: "string"
                },
                {
                    name: "itemName",
                    in: "formData",
                    description: "The Parcels Item Name",
                    required: true,
                    type: "string"
                },
                {
                    name: "recipient",
                    in: "formData",
                    description: "The Parcels Recipient",
                    required: true,
                    type: "string"
                }
                ],
                
                responses: {
                    "200": {
                        description: "Parcel created Successfully"
                    },
                    "400": {
                        description: "There Was an Error creating the parcel delivery order"
                    }
                }
            }
        },

     
        "/parcels/:id/cancel": {
            patch: {
              tags: ["Parcels"],
              summary: "Cancel a parcel delivery order",
              consumes: ["application/x-www-form-urlencoded"],
              parameters: [
                  {
                      name: "Bearer",
                      in: "header",
                      description: "Authorization token",
                      required: true,
                      type: "string"
                  }
              ]
          }
      },
      "/parcels/:id/destination": {
        patch: {
            tags: ["Parcels"],
            summary: "Change a parcel delivery order's destination",
            consumes: ["application/x-www-form-urlencoded"],
            parameters: [
                {
                    name: "Bearer",
                    in: "header",
                    description: "Authorization token",
                    required: true,
                    type: "string"
                },
                {
                  name: "toAddress",
                  in: "formData",
                  description: "Parcel's new destination",
                  required: true,
                  type: "string"
              }
            ]
        }
    },
    "/parcels/:id/currentlocation": {
      patch: {
          tags: ["Parcels"],
          summary: "Change a parcel delivery order's current location",
          consumes: ["application/x-www-form-urlencoded"],
          parameters: [
              {
                  name: "Bearer",
                  in: "header",
                  description: "Authorization token",
                  required: true,
                  type: "string"
              },
              {
                name: "toAddress",
                in: "formData",
                description: "Parcel's new destination",
                required: true,
                type: "string"
            }
          ]
      }
    },
    }
  };