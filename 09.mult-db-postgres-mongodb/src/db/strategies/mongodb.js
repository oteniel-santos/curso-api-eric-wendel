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
        if(state !== 'Conectando') return state;
            await new Promise(resolve => setTimeout(resolve,1000))
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
        this.defineModel()
        }

    defineModel(){
        const heroiSchema = new Mongoose.Schema({
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


    create(item){
        return this._herois.create(item)
        console.log('result cadastrar', resultCadastrar)
    }

    read(item, skip=0, limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._herois.updateOne({_id: id}, {$set:item})
    }
}

module.exports = MongoDB