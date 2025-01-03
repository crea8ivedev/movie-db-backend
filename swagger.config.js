import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "A simple API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      
    },
  ],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
        },
      },
    },
    "/api/auth/logout": {
      delete: {
        summary: "Logout a user",
        responses: {
          204: {
            description: "Logout successful",
          },
        },
      },
    },
    "/api/movies": {
      get: {
        summary: "Get all movies",
        responses: {
          200: {
            description: "A list of movies",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      title: { type: "string" },
                      director: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new movie",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  director: { type: "string" },
                  poster: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Movie created successfully",
          },
        },
      },
    },
    "/api/movies/{id}": {
      get: {
        summary: "Get a movie by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "A single movie",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    director: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update a movie",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  director: { type: "string" },
                  poster: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Movie updated successfully",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./router.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
