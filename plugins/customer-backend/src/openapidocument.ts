// Generated file. Do not edit.
const OPENAPI = `
{
  "openapi": "3.0.3",
  "info": {
    "title": "customer",
    "version": "0.1.0",
    "description": "customer"
  },
  "tags": [
    {
      "name": "customer"
    }
  ],
  "paths": {
    "/validate": {
      "post": {
        "tags": [
          "customer"
        ],
        "operationId": "validate",
        "summary": "validate",
        "description": "validate",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "username",
                      "id"
                    ]
                  },
                  "value": {
                    "type": "string"
                  },
                  "formData": {
                    "type": "object"
                  }
                },
                "required": [
                  "type",
                  "value",
                  "formData"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "valid": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
export const openApiDocument = JSON.parse(OPENAPI);
