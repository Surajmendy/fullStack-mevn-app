const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
        name: String,
        email: {type: String, unique: true },
        phone: String,
        providers: [{
            type: Schema.Types.ObjectId,
            ref: "providers"
        }],
    },
        { timestamps: true }
)

 ClientSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Clients = mongoose.model('clients', ClientSchema)

module.exports = Clients
