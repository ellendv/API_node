const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')  

require("./models/Cadastro")
const Cadastro = mongoose.model('cadastro')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Metods", 'GET,PUT,POST,DELETE')
    app.use(cors())
    next() 
})

mongoose.connect('mongodb://localhost/AtvHorys ',{
    useNewUrlParser:true,
    useUnifiedTopology:true
 }).then(()=>{
    console.log('conectado...')
 }).catch((erro)=>{
    console.log('ERR: não conectado')
 })

app.get("/",(req, res)=>{
    Cadastro.find({}).then((cadastro) => {
        return res.json(cadastro)
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message: "ERROR : produtos não encontrados"
        })
    })
})

app.get("/cadastro/:id", (req, res)=>{
    Cadastro.findOne({_id: req.params.id}).then((cadastro) => {
        return res.json(cadastro)
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message: "ERROR : produto não encontrado"
        })
    })
})

app.post('/cadastro', (req, res) => {
    const cadastro = Cadastro.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "ERROR : produto não cadastrado"
        })

        return res.status(400).json({
            error:false,
            message: " produto cadastrado"
        })
    })
})

app.put("/cadastro/:id", (req, res) => {
    const cadastro = Cadastro.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "ERROR : produto não editado"
        })
        return res.json({
            error: false,
            message: "produto editado com sucesso"
        })
    })
})

app.delete("/cadastro/:id", (req, res) => {
    const cadastro = Cadastro.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "ERROR : produto não apagado"
        })
        return res.json({
            error:false,
            message: " produto apagado"
        })
    })
})

app.listen(8080, ()=>{
    console.log('...rodando')
})