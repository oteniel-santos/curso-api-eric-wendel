const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Mongodb());
describe('MongoDB Suite de Testes', function(){

    this.beforeAll(async function() { 
        await context.connect()
    })

    it.only('Verificar conexao', async () => {
        const result = await context.isConnected()
        console.log('result', result);
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
})
