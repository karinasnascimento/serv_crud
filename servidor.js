// const express = require ("express") //antigo comon Js (type)
import express from "express" // atual ESG
const app = express()
app.use(express.json())
// let proximoId = 2

let LISTARALUNOS = [
    {
        id: 1,
        nome: "Vitor"
    },
    {
        id: 2,
        nome: "Jansen"
    }
]

app.get("/", (req,res) =>{
    res.status(200).json({msg: "Bom dia"})
})

// Buscar todos os alunos
app.get("/alunos", (req,res) =>{
    res.status(200).json(LISTARALUNOS)
})

// Buscar aluno específico
app.get("/alunos/:codigo", (req,res) =>{
    const idParametro = Number(req.params.codigo)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)

    if (!aluno){
        res.status(404).json({msg: "Aluno não encontrado"})
    }
    res.status(200).json(aluno)
})

// Cadastrar aluno
app.post("/alunos", (req,res) =>{
    console.log(req.body)
    const {nome}= req.body;
    if (!nome){
        res.status(400).json({msg: "Preencher com o nome"})
    }

    // lenght é o tamanho da lista
// A quantidade de alunos é maior que 0? 
    const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length -1].id + 1 : 1

    const aluno = {id, nome}
    LISTARALUNOS.push(aluno)
    res.status(201).json({msg: "Aluno cadastrado"})
})

// Solução do post (erro do caminho)
app.post("/alunos/:id", (req, res) => {
    console.log("Parâmetro recebido:", req.params)
    const idParametro = Number(req.params.id)
    console.log("idParametro:", idParametro)
    if (idParametro) {
        return res.status(400).json({
            msg: "Para cadastrar, não informe o Id na URL"
        })
    }
})

// Alterar aluno
app.put("/alunos/:codigo", (req,res) =>{
    const idParametro = Number(req.params.codigo)
    const indiceAluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    const {nome} = req.body

    if (indiceAluno === -1){
        return res.status(404).json({msg: "Aluno não encontrado"})
    }
    if (!nome){
        return res.status(400).json({msg: "Preencher com o nome"})
    }

    LISTARALUNOS[indiceAluno] = {
        id:idParametro, nome
    }
    res.status(200).json({msg: "Aluno alterado com sucesso"})
})

// Solução do put (erro do caminho)
app.put("/alunos/", (req,res) =>{
    console.log("Parâmetro do Put: ", req.params)
    const idParametro = req.params.codigo ? Number(req.res.codigo) : 0
    if (idParametro === 0) {
        return res.status(400).json({msg: "Id é obrigatório"})
    }
})

// Deletar aluno
app.delete("/alunos/:codigo", (req,res) =>{
    const idParametro = Number(req.params.codigo)
    const aluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)

    if (aluno==-1){
        return res.status(404).json({msg: "Aluno não encontrado"})
    }

    LISTARALUNOS.splice(aluno, 1)
    res.status(200).json({msg: "Aluno excluído com sucesso"})
})

// Solução do delete (erro do caminho)
app.delete("/alunos/", (req,res) =>{
    console.log("Parâmetro do Delete: ", req.params)
    const idParametro = req.params.codigo ? Number(req.res.codigo) : 0
    if (idParametro === 0) {
        return res.status(400).json({msg: "Id é obrigatório"})
    }
})

app.listen(5000, ()=>{
    console.log(`Servidor está em operação!`)
})

// Caminho para rodar no thunder: http://localhost:5000