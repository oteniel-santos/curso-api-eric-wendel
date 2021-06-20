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


const usuarioPromise = obterUsuario()
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                        usuario: {
                            nome: usuario.nome, id: usuario.id
                        },
                        telefone: result
                   }
            })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado){
      console.log(`
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
      `)  
})
.catch(function(error){
    console.log('Deu ruim', error)
})



