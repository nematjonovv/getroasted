import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RoastMyPortfolio API',
      version: '1.0.0',
      description: 'API dokumentatsiyasi',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    tags: [
      {
        name: "Admin",
        description: "Admin uchun endpointlar"
      }
    ]
  },
  apis: ['./src/modules/*/*.route.ts']
}
export default swaggerJsdoc(options)
