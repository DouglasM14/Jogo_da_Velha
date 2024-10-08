var jogador = null;

var existeGanhador = false
var existeGanhadorRodada = false

var quantidadeDeRodadas = 0
var rodadaAtual = 1
var vitoriasX = 0
var vitoriasO = 0

var tempoJogada = 0
var tempo = null

function jogar() {
    document.getElementById("menu").classList.add("esconder")
    document.getElementById("jogo").classList.remove("esconder")

    quantidadeRodadasEscolhido()
    dificuldadeEscolhida()

    iniciarTemporizador()

    escolherJogador();
    mudaJogadorAtual();
}

// Escolhe um jogador pra começar o jogo
function escolherJogador() {
    let numAleatorio = Math.floor(Math.random() * 2);
    if ((numAleatorio) == 0) {
        jogador = "X";
    } else {
        jogador = "O";
    }
    return jogador
}

// Escreve no tela de quem é a vez de jogar
function mudaJogadorAtual() {
    let jogadorAtual = document.getElementById("jogadorAtual")
    jogadorAtual.innerHTML = jogador
    if (jogador == "X") {
        jogadorAtual.style.color = '#FF0000';
    } else {
        jogadorAtual.style.color = '#6284FF';
    }
}

// Muda o quadrado pra X ou O
function quadradoEscolhido(id) {
    // verifica se alguem já ganhou
    if (existeGanhador == true || existeGanhadorRodada == true) {
        return
    }

    // Verifica se o quadrado ja está ocupado
    let quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== '⠀') {
        return
    }

    // Escreve no quadrado X ou O e muda o jogador atual
    if (jogador === 'X') {
        quadrado.innerHTML = jogador
        quadrado.style.color = '#FF0000';
        clearInterval(tempo)
        dificuldadeEscolhida()
        iniciarTemporizador()
        jogador = "O";
    } else {
        quadrado.innerHTML = jogador
        quadrado.style.color = '#6284FF';
        clearInterval(tempo)
        dificuldadeEscolhida()
        iniciarTemporizador()
        jogador = "X";
    }

    mudaJogadorAtual()
    checarVitorias()
    checarEmpate()
}

// Verifica se houve alguma vitoria
function checarVitorias() {
    // q = quadrado
    var q1 = document.getElementById("1")
    var q2 = document.getElementById("2")
    var q3 = document.getElementById("3")
    var q4 = document.getElementById("4")
    var q5 = document.getElementById("5")
    var q6 = document.getElementById("6")
    var q7 = document.getElementById("7")
    var q8 = document.getElementById("8")
    var q9 = document.getElementById("9")


    //                      Verifica a vitoria por linha
    if (checarSequencia(q1, q2, q3)) {
        mudarCor(q1, q2, q3)
        decidirVencedor(q1)
        existeGanhador = true
    }

    if (checarSequencia(q4, q5, q6)) {
        mudarCor(q4, q5, q6)
        decidirVencedor(q4)
        existeGanhador = true
    }

    if (checarSequencia(q7, q8, q9)) {
        mudarCor(q7, q8, q9)
        decidirVencedor(q7)
        existeGanhador = true
    }

    //                      Veridica a vitoria por Coluna
    if (checarSequencia(q1, q4, q7)) {
        mudarCor(q1, q4, q7)
        decidirVencedor(q1)
        existeGanhador = true
    }

    if (checarSequencia(q2, q5, q8)) {
        mudarCor(q2, q5, q8)
        decidirVencedor(q2)
        existeGanhador = true
    }

    if (checarSequencia(q3, q6, q9)) {
        mudarCor(q3, q6, q9)
        decidirVencedor(q3)
        existeGanhador = true
    }

    //                       Veridica a vitoria por Diagonal
    if (checarSequencia(q1, q5, q9)) {
        mudarCor(q1, q5, q9)
        decidirVencedor(q1)
        existeGanhador = true
    }

    if (checarSequencia(q3, q5, q7)) {
        mudarCor(q3, q5, q7)
        decidirVencedor(q3)
        existeGanhador = true
    }
}

// Verifica se houve empate
function checarEmpate() {
    let quadradoCheio = 0

    for (i = 1; i <= 9; i++) {
        let q = document.getElementById(i)
        if (q.innerHTML !== "⠀") {
            quadradoCheio++
        }
    }

    if (quadradoCheio == 9 && existeGanhador == false) {
        for (var j = 1; j <= 9; j++) {
            let q = document.getElementById(j)
            q.style.backgroundColor = '#c7d2ce';
        }
        setTimeout(() => {
            limpaTabuleiro()
        }, "1000");
        setTimeout(() => {
            alert("Deu empate")
        }, "300");

    }
}

// Testa se os valores são iguais
function checarSequencia(x, y, z) {
    if (x.innerHTML !== "⠀" && x.innerHTML === y.innerHTML && y.innerHTML === z.innerHTML) {
        return true
    }
}

// Muda a cor dos quadrados
function mudarCor(x, y, z) {
    x.style.backgroundColor = '#8ef5a6'
    y.style.backgroundColor = '#8ef5a6'
    z.style.backgroundColor = '#8ef5a6'
}

// Decide o vencedor da partida atual e muda o placar
function decidirVencedor(q) {
    let vencedor = q.innerHTML

    if (vencedor === "X") {
        vitoriasX++
        rodadaAtual++
        document.getElementById("vitoriasX").innerHTML = vitoriasX

    } else {
        vitoriasO++
        rodadaAtual++
        document.getElementById("vitoriasO").innerHTML = vitoriasO
    }

    verificaPlacar()

    setTimeout(() => {
        document.getElementById("textoRodadaAtual").innerHTML = rodadaAtual
        limpaTabuleiro()
    }, "1500");
}

// Decide o vencedor da rodada e finaliza o jogo
function verificaPlacar() {
    if (vitoriasX > quantidadeDeRodadas / 2) {
        existeGanhadorRodada = true

        setTimeout(() => {
            alert("X venceu")
        }, "200");

        setTimeout(() => {
            document.getElementById("menu").classList.remove("esconder")
            document.getElementById("jogo").classList.add("esconder")
            reiniciarJogo()
        }, "500");

    } else if (vitoriasO > quantidadeDeRodadas / 2) {
        existeGanhadorRodada = true

        setTimeout(() => {
            alert("O venceu")
        }, "200");

        setTimeout(() => {
            document.getElementById("menu").classList.remove("esconder")
            document.getElementById("jogo").classList.add("esconder")
            reiniciarJogo()
        }, "500");
    }


}

// limpa o tabuleiro 
function limpaTabuleiro() {
    for (i = 1; i <= 9; i++) {
        let q = document.getElementById(i)
        q.innerHTML = "⠀"
        q.style.backgroundColor = 'white'
    }
    existeGanhador = false
}

// Volta todas as variaveis pro seu valor padrão
function reiniciarJogo() {
    existeGanhador = false
    existeGanhadorRodada = false
    rodadaAtual = 1
    tempoJogada = 0
    vitoriasO = 0
    vitoriasX = 0
    document.getElementById("vitoriasO").innerHTML = vitoriasO
    document.getElementById("vitoriasX").innerHTML = vitoriasX
    clearInterval(tempo)
    mudaJogadorAtual()
}

// Adiciona e remove a classe ativo dos botões "melhor de"
function melhorDe3() {
    document.getElementById("melhor3").classList.add("ativo")
    document.getElementById("melhor5").classList.remove("ativo")
    document.getElementById("melhor9").classList.remove("ativo")
} function melhorDe5() {
    document.getElementById("melhor3").classList.remove("ativo")
    document.getElementById("melhor5").classList.add("ativo")
    document.getElementById("melhor9").classList.remove("ativo")
} function melhorDe9() {
    document.getElementById("melhor3").classList.remove("ativo")
    document.getElementById("melhor5").classList.remove("ativo")
    document.getElementById("melhor9").classList.add("ativo")
}

// Descobre qual botão está ativo e passa o valor dele para a variavel quantidadeDeRodadas
function quantidadeRodadasEscolhido() {
    if (document.getElementById("melhor3").classList.contains("ativo") == true) {
        quantidadeDeRodadas = 3
    }
    if (document.getElementById("melhor5").classList.contains("ativo") == true) {
        quantidadeDeRodadas = 5
    }
    if (document.getElementById("melhor9").classList.contains("ativo") == true) {
        quantidadeDeRodadas = 9
    }
}

// Adiciona e remove a classe ativo dos botões de dificuldade
function dificuldadeFacil() {
    document.getElementById("facil").classList.add("ativo")
    document.getElementById("medio").classList.remove("ativo")
    document.getElementById("dificil").classList.remove("ativo")
    document.getElementById("quantidadeTempo").innerHTML = "20s"
} function dificuldadeMedio() {
    document.getElementById("facil").classList.remove("ativo")
    document.getElementById("medio").classList.add("ativo")
    document.getElementById("dificil").classList.remove("ativo")
    document.getElementById("quantidadeTempo").innerHTML = "10s"
} function dificuldadeDificil() {
    document.getElementById("facil").classList.remove("ativo")
    document.getElementById("medio").classList.remove("ativo")
    document.getElementById("dificil").classList.add("ativo")
    document.getElementById("quantidadeTempo").innerHTML = "5s"
}

// Descobre qual botão está ativo e passa o valor dele para a variavel tempoJogada
function dificuldadeEscolhida() {
    if (document.getElementById("facil").classList.contains("ativo") == true) {
        tempoJogada = 20
    }
    if (document.getElementById("medio").classList.contains("ativo") == true) {
        tempoJogada = 10
    }
    if (document.getElementById("dificil").classList.contains("ativo") == true) {
        tempoJogada = 5
    }
    document.getElementById("tempoRestante").innerHTML = tempoJogada
}


function iniciarTemporizador() {
    tempo = setInterval(verificarTempo, 1000)
}

function verificarTempo() {
    tempoJogada--
    document.getElementById("tempoRestante").innerHTML = tempoJogada
    if (tempoJogada == 0) {
        console.log("perdeu")
        if (jogador === 'X') {
            jogador = "O";
            clearInterval(tempo)
            dificuldadeEscolhida()
            iniciarTemporizador()
        } else {
            jogador = "X";
            clearInterval(tempo)
            dificuldadeEscolhida()
            iniciarTemporizador()
        }
        mudaJogadorAtual()
    }
}