const ICrud = require('./interfaces/interfaceCrud')

const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}


class MongoDB extends ICrud{
    constructor(){
        super()
        this._herois = null
    }

    async isConnected(){
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state;
        if(state === 'Conectando') return state;
            await new Promisse(resolve => setTimeout(resolve,1000))
            return STATUS[this._driver.readyState];
        }
    

    connect(){
        Mongoose.connect('mongodb://oteniel:123@localhost:27017/herois', 
        {useNewUrlParser: true}, function(error){
        if(!error) return;
        console.log('Falha na conexão!', error)
        } )
        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', ()=> console.log('Database rodando !!'));
        }

    defineModel(){
        heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt:{
                type: Date,
                default: new Date()
            }
        })
    
        this._herois = Mongoose.model('herois', heroiSchema)
    }


    async create(item){
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('result cadastrar', resultCadastrar)
    }
}

module.exports = MongoDB