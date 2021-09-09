 /**
   * @swagger
   * /api/client/create:
   *    post:
   *        description: This API for creating a new client
   *        summary: creates a new client.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: Client
   *          schema:
   *            $ref: '#/definitions/clients'
   *        responses:
   *            200:
   *                description: client created successfully
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * definitions:
   *     clients:
   *        type: object
   *        required:
   *        - name
   *        properties:
   *            name:
   *                    type: string
   *                    example: test-client
   *            email:
   *                    type: string
   *                    example: test-client@gmail.com
   *            phone:
   *                    type: string
   *                    example: 0544646116
   *            providers:
   *                    type: array
   *                    example: ["6070da896271727010fd6a15", "6070da9c6271727010fd6a16"]
   * /api/client/all:
   *    get:
   *        description: This API endpoint to read all clients
   *        summary: reads all clients.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        responses:
   *            200:
   *                description: success
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * /api/client/read/{clientId}:
   *    get:
   *        description: This API endpoint read a single client
   *        summary: reads a single client.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: path
   *          name: clientId
   *          schema:
   *            type: string
   *          required: true
   *          description: client Id to fetch client
   *        responses:
   *            200:
   *                description: success
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * /api/client/update/{clientId}:
   *    put:
   *        description: This API endpoint to update a client
   *        summary: updates a client.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: Client
   *          schema:
   *            $ref: '#/definitions/clients'
    *        - in: path
   *          name: clientId
   *          schema:
   *            type: string
   *          required: true
   *          description: client Id to update
   *        responses:
   *            200:
   *                description: client updated successfully
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   *
   * /api/client/delete/{clientId}:
   *    delete:
   *        description: This API endpoint delete a single client
   *        summary: deletes a client.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: path
   *          name: clientId
   *          schema:
   *            type: string
   *          required: true
   *          description: client Id to delete
   *        responses:
   *            200:
   *                description: success
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   *
   */


var express = require('express');
var clientRouter = express.Router();

clientRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const {
  createClient,readAllClients,readSingleClient, updateClient,deleteClient
} = require("../controllers/clientController");



clientRouter.post("/create", createClient);
clientRouter.get("/all", readAllClients);
clientRouter.get("/read/:id", readSingleClient);
clientRouter.put("/update/:id", updateClient);
clientRouter.delete("/delete/:id", deleteClient);



module.exports = clientRouter;
