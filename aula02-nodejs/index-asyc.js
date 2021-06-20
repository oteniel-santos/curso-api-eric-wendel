// 1- obter usuário
//  2 - Obter num de telefone de usuário a partir de um id
// 3- Obter endereço do usuário pelo ID

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)
obterEnderecoAsync

function obterUsuario(){
    //quando der erro chama reject
    //quando for sucesso chama o resolve
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            // return reject(new Error('DEU RUIM DE VERDADE'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(()=>{
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000);
    })
    
}


function obterEndereco(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000)
}

//1º - Adicionar a palavra async - retorna uma promise
main()

async function main(){
    try {
        console.time('Medida-promisse')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterEnderecoAsync(usuario.id),
            obterTelefone(usuario.id)
        ])
        const endereco = resultado[0]
        const telefone = resultado[1]
        
        console.log(`
                Nome: ${usuario.nome},
                Telefone: (${telefone.ddd}) ${telefone.telefone},
                Endereço: ${endereco.rua}, ${endereco.numero}
            `)
            console.timeEnd('Medida-promisse')
        
    } catch (error) {   
        console.error('Deu ruim', error)
    }

}
