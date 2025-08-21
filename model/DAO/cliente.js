/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de clientes no Banco de Dados
 * Data: 21/08/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo cliente
const insertCliente = async function (cliente) {
    try {

        let sql = `insert into tbl_cliente (

                                        nome, 
                                        email

                                        ) values (

                                            '${cliente.nome}', 
                                            '${cliente.email}',
                                            '${cliente.telefone}'

                                        )`
        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar no banco de dados um cliente existente
const updateCliente = async function (cliente) {
    try {

        let SQL = `update tbl_cliente set   nome     = '${cliente.nome}', 
                                            email    = '${cliente.email}',
                                            telefone = '${cliente.telefone}'

                    where id = ${cliente.id}`

        //execute é usado quando não é necessário retornar nada ao banco de dados
        let result = await prisma.$executeRawUnsafe(SQL)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

// Função para deletar um cliente existente no banco de dados
const deleteCliente = async function (id) {
    try {
        let sql = `delete from tbl_cliente where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para selecionar todos os clientes do banco de dados
const selectAllCliente = async function () {
    try {

        //script SQL para retornar os dados do banco
        let sql = `select * from tbl_cliente order by id desc`

        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para buscar no banco de dados um cliente pelo id
const selectByIdCliente = async function (id) {
    try {
        let sql = `select * from tbl_cliente where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertCliente,
    updateCliente,
    deleteCliente,
    selectAllCliente,
    selectByIdCliente
}