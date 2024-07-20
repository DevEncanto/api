const mongoose = require("mongoose")

const Config = mongoose.model('Config', {
  ambiente: String,
  data: Object
})

module.exports = Config