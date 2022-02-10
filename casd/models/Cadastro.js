const mongoose = require('mongoose')
const Cadastro = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }

},
{
    timestamps: true
})
mongoose.model('cadastro', Cadastro)