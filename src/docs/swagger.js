const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Klara Coffee API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Klara Coffee API",
//       version: "1.0.0",
//       description: "API documentation for Klara Coffee App"
//     }
//   },
//   apis: ["./src/routes/*.js"],
// };

const swaggerSpec = swaggerJsDoc(options);
module.exports = { swaggerUi, swaggerSpec };
