/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD do cliente
 * Data: 21/08/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const clienteDAO = require('../../model/DAO/cliente.js')

// Função para inserir um novo cliente
const inserirCliente = async function(cliente, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                cliente.nome  == undefined  || cliente.nome  == ''  || cliente.nome  == null  || cliente.nome.length  > 80 ||
                cliente.email == undefined  || cliente.email == ''  || cliente.email == null  || cliente.email.length > 30 ||
                cliente.telefone == undefined  || cliente.telefone == ''  || cliente.telefone == null  || cliente.telefone.length > 15

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                // Encaminha os dados do novo cliente para serem inseridos no banco de dados
                let resultCliente = await clienteDAO.insertCliente(cliente)

                if (resultCliente)
                    return { status_code: 201, message: MESSAGE.SUCESS_CREATED_ITEM } // 201
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL } // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um cliente existente
const atualizarCliente = async function(cliente, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                cliente.nome  == undefined  || cliente.nome  == ''  || cliente.nome  == null  || cliente.nome.length  > 80 ||
                cliente.email == undefined  || cliente.email == ''  || cliente.email == null  || cliente.email.length > 30 ||
                cliente.telefone == undefined  || cliente.telefone == ''  || cliente.telefone == null  || cliente.telefone.length > 15

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                let resultCliente = await buscarCliente(parseInt(id))

                if (resultCliente.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    cliente.id = parseInt(id)
                    let result = await clienteDAO.updateCliente(cliente)

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultCliente.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um cliente existente
const excluirCliente = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            // Chama a função para deletar o cliente pelo id
            let resultCliente = await buscarCliente(parseInt(id))

            if (resultCliente.status_code == 200) {
                let result = await clienteDAO.deleteCliente(parseInt(id))

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }
            } else if (resultCliente.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos os clientes
const listarCliente = async function() {
    try {
        let dadosClientes = {}
        // Chama a função para retornar os dados dos clientes
        let resultCliente = await clienteDAO.selectAllCliente()

        if (resultCliente != false || typeof resultCliente == 'object') {
            if (resultCliente.length > 0) {
                dadosClientes.status = true
                dadosClientes.status_code = 200
                dadosClientes.items = resultCliente.length
                dadosClientes.data = resultCliente

                return dadosClientes
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um cliente
const buscarCliente = async function(id) {
    try {
        let dadosClientes = {}
        // Chama a função para retornar os dados do cliente
        let resultCliente = await clienteDAO.selectByIdCliente(parseInt(id))

        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            if (resultCliente != false || typeof resultCliente == 'object') {
                if (resultCliente.length > 0) {
                    dadosClientes.status = true
                    dadosClientes.status_code = 200
                    dadosClientes.data = resultCliente

                    return dadosClientes
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirCliente,
    atualizarCliente,
    excluirCliente,
    listarCliente,
    buscarCliente,
}