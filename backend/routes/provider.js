/**
   * @swagger
   * /api/provider/create:
   *    post:
   *        description: This API for creating a new provider
   *        summary: creates a new provider.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: Provider
   *          schema:
   *            $ref: '#/definitions/providers'
   *        responses:
   *            200:
   *                description: provider created successfully
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * definitions:
   *     providers:
   *        type: object
   *        required:
   *        - name
   *        properties:
   *            name:
   *                    type: string
   *                    example: test-provider
   * /api/provider/all:
   *    get:
   *        description: This API endpoint to read all clients
   *        summary: reads all providers.
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
   * /api/provider/update/{providerId}:
   *    put:
   *        description: This API endpoint to update a provider
   *        summary: updates a provider.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: Provider
   *          schema:
   *            $ref: '#/definitions/providers'
    *        - in: path
   *          name: providerId
   *          schema:
   *            type: string
   *          required: true
   *          description: providerId Id to update
   *        responses:
   *            200:
   *                description: provider updated successfully
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   *
   * /api/provider/delete/{providerId}:
   *    delete:
   *        description: This API endpoint delete a single provider
   *        summary: deletes a provider.
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: path
   *          name: providerId
   *          schema:
   *            type: string
   *          required: true
   *          description: provider Id to delete
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
var providerRouter = express.Router();

providerRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const {
  createProvider,readAllProviders,updateProvider,deleteProvider
} = require("../controllers/providerController");



providerRouter.post("/create", createProvider);
providerRouter.get("/all", readAllProviders);
providerRouter.put("/update/:id", updateProvider);
providerRouter.delete("/delete/:id", deleteProvider);


module.exports = providerRouter;
