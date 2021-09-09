const db = require("../models")
const Providers = require("../models/providers")

// Create new provider
module.exports.createProvider = async (req, res) => {
  if(!req.body.name){
      res.status(400).send({message: "name cannot be empty"});
      return;
  }
    // Create a provider
  const providerInstance = new Providers({
    name: req.body.name
  });

  await providerInstance
    .save(providerInstance)
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

// Retrieve all providers
module.exports.readAllProviders = async (req, res) => {

  await Providers
    .find() // sort by created At in desc order
    .then((data) => {
      res.status(200).send({"providers": data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });

};

// Update a provider
module.exports.updateProvider = async (req, res) => {

   
  const id = req.params.id


  await Providers
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data){
        res.status(404).send({ message: "Not found provider with id " + id });
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

// delete a Provider
module.exports.deleteProvider = async (req, res) => {

   
  const id = req.params.id


  await Providers
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data){
        res.status(404).send({ message: "Not found Provider with id " + id });
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

