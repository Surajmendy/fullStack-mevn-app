const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProviderSchema = new Schema({
        name: String,
        clients: {
            type: Schema.Types.ObjectId,
            ref: "clients"
        },
})
ProviderSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  
const Providers = mongoose.model('provider', ProviderSchema)

module.exports = Providers