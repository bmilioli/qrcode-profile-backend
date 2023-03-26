const app = require('./app')

// Configurar a porta do servidor
const PORT = process.env.PORT || 5000

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
})
