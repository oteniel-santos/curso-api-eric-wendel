const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy')

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

const context = new Context(new Mongodb());
describe('MongoDB Suite de Testes', function(){

    this.beforeAll(async function() { 
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id

    })

    it('Verificar conexao', async () => {
        const result = await context.isConnected()
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
})
