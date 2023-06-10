var jogador = null;
var existeGanhador = false
var existeGanhadorRodada = false
var rodadaAtual = 1
var quantidadeDeRodadas = 0
var vitoriasX = 0
var vitoriasO = 0

function jogar() {
    document.getElementById("menu").classList.add("esconder")
    document.getElementById("jogo").classList.remove("esconder")

    quantidadeRodadasEscolhido()


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
    document.getElementById("jogadorAtual").innerHTML = jogador
}

// Muda o quadrado pra X ou O
function quadradoEscolhido(id) {
    // verifica se alguem já ganhou
    if (existeGanhador == true || existeGanhadorRodada == true) {
        return
    }

    if (jogador == null) {
        return
    }

    // Verifica se o quadrado ja está ocupado
    let quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== '-') {
        return
    }

    // Escreve no quadrado X ou O
    quadrado.innerHTML = jogador

    // Muda o jogador atual
    if (jogador === 'X') {
        jogador = "O";
    } else {
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
        if (q.innerHTML !== "-") {
            quadradoCheio++
        }
    }

    if (quadradoCheio == 9 && existeGanhador == false) {
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
    if (x.innerHTML !== "-" && x.innerHTML === y.innerHTML && y.innerHTML === z.innerHTML) {
        return true
    }
}

// Muda a cor dos quadrados
function mudarCor(x, y, z) {
    x.style.backgroundColor = '#0F0'
    y.style.backgroundColor = '#0F0'
    z.style.backgroundColor = '#0F0'
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
            alert("O venceu")
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
        q.innerHTML = "-"
        q.style.backgroundColor = '#eee';
    }
    existeGanhador = false
}

// Volta todas as variaveis pro seu valor padrão
function reiniciarJogo() {
    existeGanhador = false
    existeGanhadorRodada = false
    rodadaAtual = 1
    vitoriasO = 0
    vitoriasX = 0
    document.getElementById("vitoriasO").innerHTML = vitoriasO
    document.getElementById("vitoriasX").innerHTML = vitoriasX
    mudaJogadorAtual()
}

// Adiciona e remove a classe ativo dos botões
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

