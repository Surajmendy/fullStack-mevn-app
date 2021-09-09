const db = require("../models")
const Clients = require("../models/clients")

// Create new clients
module.exports.createClient = async (req, res) => {
  if(!req.body.name){
      res.status(400).send({message: "name cannot be empty"});
      return;
  }
    // Create a client
  const client = new Clients({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: req.body.providers
  });

  await client
    .save(client)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};

// Retrieve all clients
module.exports.readAllClients = async (req, res) => {
 
  await Clients
    .find().sort({createdAt:-1})  // sort by created At in desc order
    .then((data) => {
      res.status(200).send({"clients": data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};

// Find a single clients
module.exports.readSingleClient = async (req, res) => {

   
  const id = req.params.id


  await Clients
    .findById(id).populate("provider")
    .then((data) => {
      if (!data){
        res.status(404).send({ message: "Not found client with id " + id });
      }
      else {
        res.status(200).send({data});
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};
// Update a client
module.exports.updateClient = async (req, res) => {

   
  const id = req.params.id


  await Clients
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data){
        res.status(404).send({ message: "Not found client with id " + id });
      }
      else {
        res.status(200).send({message: "update success"});
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};

// delete a client
module.exports.deleteClient = async (req, res) => {

   
  const id = req.params.id


  await Clients
    .findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data){
        res.status(404).send({ message: "Not found client with id " + id });
      }
      else {
        res.status(200).send({message: " success"});
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};