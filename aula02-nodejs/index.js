// 1- obter usuário
//  2 - Obter num de telefone de usuário a partir de um id
// 3- Obter endereço do usuário pelo ID

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null,{
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 100)
}

function obterTelefone(idUsuario, callback){
    setTimeout(()=>{
        return callback(null,{
            telefone: '1199002',
            ddd: 11
        })
    }, 2000);
}


function obterEndereco(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(error, usuario){
    console.log('usuario:', usuario)

}

obterUsuario(function resolverUsuario(error, usuario){
  if(error){
      console.error('Deu ruim em usuario', error)
      return;
  } 

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if(error1){
        console.error('Deu ruim em telefone', error1)
        return;
    } 
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
      if(error2){
          console.error('Deu ruim em endereço', error2)
          return;
      } 
      console.log(`
          nome: ${usuario.nome},
          endereço: ${endereco.rua}, ${endereco.numero}},
          Telefone: (${telefone.ddd})${telefone.telefone}
      `)
  })
  }) 
})

// const telefone = obterTelefone(usuario.id)
// console.log('telefone:', telefone)