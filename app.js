const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, idade } = req.body;
        const novoUsuario = await prisma.usuario.create({
            data: { nome, idade: parseInt(idade) }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: "Erro ao criar usuário." });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const todos = await prisma.usuario.findMany();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar usuários." });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const idNum = parseInt(req.params.id);
        const { nome, idade } = req.body;
        
        const atualizado = await prisma.usuario.update({
            where: { id: idNum },
            data: { nome, idade: parseInt(idade) }
        });
        res.json(atualizado);
    } catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar usuário." });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const idNum = parseInt(req.params.id);
        await prisma.usuario.delete({
            where: { id: idNum }
        });
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(400).json({ erro: "Erro ao deletar usuário." });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});