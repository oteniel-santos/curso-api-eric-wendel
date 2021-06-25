const assert = require('assert');
const Mongodb = require('./../db/strategies/mongodb/mongodb');
const heroiSchema =  require('./../db/strategies/mongodb/schemas/heroisSchemas')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço Mágico'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha ${Date.now()}`,
    poder: 'Super Teia'
}

let MOCK_HEROI_ID = '';

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino ${Date.now()}`,
    poder: 'Velocidade'
}

let context = {};

describe.only('MongoDB Suite de Testes', function(){
    this.beforeAll(async function() { 
       const connection = Mongodb.connect()
       context = new Context(new Mongodb(connection, heroiSchema))
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id
    })

    it('Verificar conexao', async () => {
        const result = await context.isConnected()
        console.log('result *********************************************', result);
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
    it('Cadastrar MongoDB', async () => {
           const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
           assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR);
    })
    it('Listar', async function(){
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome}) 
        const result = { nome, poder}
        assert.deepEqual(result, MOCK_HEROI_DEFAULT);
    })
    it('Atualizar', async function(){
        const result = await context.update(MOCK_HEROI_ID, {nome: 'Perna Longa'})

        assert.deepEqual(result.nModified, 1);
    })
    it('remover', async ()=>{
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})
