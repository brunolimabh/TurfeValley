
function iniciar() {
    campos_inicio.style.display = 'none'
    quest.style.display = 'block'
    trilhaSonora.volume = 0.3;
}

function validar() {
    qtdCavalos = Number(ipt_qtd.value);
    ax_voltas = Number(ipt_voltas.value);

    var erro = false;

    if (qtdCavalos < 2 || qtdCavalos > 6 || ipt_qtd.value == 0 || isNaN(qtdCavalos)) {
        alert('Insira uma quantidade de cavalos entre 2 e 6');
        erro = true;
    }
    if (ax_voltas < 1 || ax_voltas > 10 || ipt_voltas.value == 0 || isNaN(ax_voltas)) {
        alert('Insira uma quantidade de voltas entre 1 e 10');
        erro = true;
    }

    if (erro == false) {
        quest.style.display = 'none';
        nomeCavalos.style.display = 'block';
    }
}

function cadastrarCavalo() {
    var ax_nome = ipt_cavalo.value
    if (ax_nome.length <= 0) {
        alert(`Coloque o nome do cavalo`)
    } else {
       vt_cavalos.push(
            {
                tempoTotal: 0,
                tempos: [],
                nome: ax_nome,
                widths: [0]
            }
        )

        var divCavalos = document.getElementById('cavalos')
        var divNomes = document.getElementById('nomes')
        var imgCavalo = document.createElement("img");
        var nomeCavalo = document.createElement("p");

        imgCavalo.setAttribute("src", `img/topTres.png`)
        nomeCavalo.innerHTML = ax_nome;
        imgCavalo.className = 'cavaloImg';
        nomeCavalo.className = 'cavaloNome';

        divCavalos.appendChild(imgCavalo);
        divNomes.appendChild(nomeCavalo);

        ipt_cavalo.value = '';
    }
    if (vt_cavalos.length == qtdCavalos) {
        campo_nomes.style.display = 'none';
        aguardeMsg.style.display = 'block';
        obterTempos();
        setTimeout(() => {
            tela_inicio.style.display = 'none';
            div_corrida.style.display = 'block';
            for (let i = 0; i < frases.length; i++) {
                setTimeout(() => {
                    div_msg.innerHTML = frases[i]
                }, 1000 * i)
            }
            exibirCavalos();
            trilhaSonora.pause();
            setTimeout(() => { largada.play() }, 200)
            setTimeout(() => { darVoltas(0) }, 4000);
        }, 3000)
    }
    ipt_cavalo.focus();
}

function obterTempos() {
    for (let volta = 1; volta <= ax_voltas; volta++) {
        var tempoMin = 10 * ax_voltas;
        for (let index = 0; index < qtdCavalos; index++) {
            var tempo = Number((Math.random() * 0.2 + 7).toFixed(1));
            vt_cavalos[index].tempos.push(tempo);
            vt_cavalos[index].tempoTotal += tempo;

            if (vt_cavalos[index].tempoTotal < tempoMin) {
                tempoMin = vt_cavalos[index].tempoTotal
            }
        }
        for (let index = 0; index < qtdCavalos; index++) {
            vt_cavalos[index].widths.push((94 * volta / ax_voltas) - 4 * (vt_cavalos[index].tempoTotal - tempoMin))

            if (vt_cavalos[index].tempoTotal == tempoMin && vt_lideres.length < volta) {
                vt_lideres.push(vt_cavalos[index].nome);
            }
        }
    }
}

function darVoltas(volta) {
    largada.pause();
    if (volta > 0 && volta < ax_voltas) {
        div_msg.innerHTML = `Volta ${volta} - ${vt_lideres[volta - 1]} está liderando!`;
    }
    for (let index = 0; index < qtdCavalos; index++) {
        galopa.play()
        document.documentElement.style.setProperty(`--cavalo${index}From`, vt_cavalos[index].widths[volta] + '%');
        document.documentElement.style.setProperty(`--cavalo${index}To`, vt_cavalos[index].widths[volta + 1] + '%');
        let imgCavalo = document.getElementById('cavalogif' + index);
        if (volta == 0) {
            imgCavalo.classList.add('cavaloAnimacao' + index);
        }
    }
    volta++;
    if (volta > ax_voltas) {
        for (let index = 0; index < qtdCavalos; index++) {
            galopa.play();
            document.documentElement.style.setProperty(`--cavalo${index}From`, vt_cavalos[index].widths[volta - 1] + '%');
            document.documentElement.style.setProperty(`--cavalo${index}To`, vt_cavalos[index].widths[volta - 1] + '%');
        }
        div_msg.innerHTML = 'Corrida encerrada!';
        galopa.pause();
        btnPodio.style.display = 'block';
        exibirHistorico();
        // if (index >= qtdCavalos) {
        //     alert("entrei no if")
        // }
    } else {
        setTimeout(() => { darVoltas(volta) }, 5000);
    }
}


function exibirCavalos() {
    for (let i = 0; i < qtdCavalos; i++) {
        var divCorrida = document.createElement("div");
        var cavalo = document.createElement("img");
        var nome = document.createElement("span");

        cavalo.setAttribute("src", `img/cavalogif.gif`);
        cavalo.className = 'cavaloImgCorrida';

        nome.innerHTML = vt_cavalos[i].nome;
        nome.className = 'nome';

        divCorrida.id = 'corrida';
        cavalo.id = 'cavalogif' + i;
        divCorrida.appendChild(cavalo);
        divCorrida.appendChild(nome);
        cavalos_correndo.appendChild(divCorrida);
    }
    for (let index = 1; index < ax_voltas; index++) {
        let marcador = document.createElement("span");
        marcador.className = 'marcadores';
        marcador.style.left = (100 * index / ax_voltas) + '%';
        cavalos_correndo.appendChild(marcador);
    }
}

function exibirHistorico() {
    var texto = '<div class = "tabela"><div class="linha"><div>Volta</div>';

    for (let index = 0; index < qtdCavalos; index++) {
        texto += `<div>${vt_cavalos[index].nome}</div>`;
    }
    texto += '</div>';
    for (let volta = ax_voltas; volta > 0; volta--) {
        
        texto += `<div class="linha"><div> ${volta} </div>`


        for (let index = 0; index < qtdCavalos; index++) {
            texto += `<div> ${vt_cavalos[index].tempos[volta -1].toFixed(1)} </div>`
        }

        texto += '</div>'

    }

    texto += '<div class="linha"><div>Tempo</div>';
    for (let index = 0; index < qtdCavalos; index++) {
        texto += `<div>${vt_cavalos[index].tempoTotal.toFixed(1)}</div>`
    }
    texto += '</div></div>';

    div_historico.innerHTML = texto;

    div_historico.style.display = 'block';
}

// podio
function exibirPodio() {
    div_corrida.style.display = 'none';
    div_podio.style.display = 'block';
    trilhaSonora.play();
    palmas.play();


   vt_cavalos.sort((a, b) => a.tempoTotal - b.tempoTotal);

    if (qtdCavalos == 2) {
        nomeUm.innerHTML = `${vt_cavalos[0].nome}`;
        nomeDois.innerHTML = `${vt_cavalos[1].nome}`;

        tempoUm.innerHTML = `${(vt_cavalos[0].tempoTotal).toFixed(2)}`;
        tempoDois.innerHTML = `${(vt_cavalos[1].tempoTotal).toFixed(2)}`;

        cvlUm.classList.add('primeiroCvl');
        topUm.classList.add('primeiro');

        if (vt_cavalos[0].tempoTotal.toFixed(1) == vt_cavalos[1].tempoTotal.toFixed(1)) {
            cvlDois.classList.add('primeiroCvl');
            topDois.classList.add('primeiro');
            medalhaSegundo.src = 'img/first.png';
        } else {
            cvlDois.classList.add('segundoCvl');
            topDois.classList.add('segundo');
        }

        topTres.innerHTML = '';
        topTres.style.display = 'none';
        let cavaloTres = document.getElementById("cvlTres");
        cavaloTres.src = '';
    } else {
        //nome dos vencedores
        nomeUm.innerHTML = `${vt_cavalos[0].nome}  `;
        nomeDois.innerHTML = `${vt_cavalos[1].nome}`;
        nomeTres.innerHTML = `${vt_cavalos[2].nome}`;
        // tempo dos vencedores
        tempoUm.innerHTML = `${(vt_cavalos[0].tempoTotal).toFixed(2)}`;
        tempoDois.innerHTML = `${(vt_cavalos[1].tempoTotal).toFixed(2)}`;
        tempoTres.innerHTML = `${(vt_cavalos[2].tempoTotal).toFixed(2)}`;

        cvlUm.classList.add('primeiroCvl');
        topUm.classList.add('primeiro');

        if (vt_cavalos[0].tempoTotal.toFixed(1) == vt_cavalos[1].tempoTotal.toFixed(1)) {
            cvlDois.classList.add('primeiroCvl');
            topDois.classList.add('primeiro');
            medalhaSegundo.src = 'img/first.png';
        } else {
            cvlDois.classList.add('segundoCvl');
            topDois.classList.add('segundo');
        }

        if (vt_cavalos[0].tempoTotal.toFixed(1) == vt_cavalos[2].tempoTotal.toFixed(1)) {
            cvlTres.classList.add('primeiroCvl');
            topTres.classList.add('primeiro');
            medalhaTerceiro.src = 'img/first.png';
        } else if (vt_cavalos[1].tempoTotal.toFixed(1) == vt_cavalos[2].tempoTotal.toFixed(1)) {
            cvlTres.classList.add('segundoCvl');
            topTres.classList.add('segundo');
            medalhaTerceiro.src = 'img/second.png';
        } else {
            cvlTres.classList.add('terceiroCvl');
            topTres.classList.add('terceiro');
        }

    }
}

function reiniciar() {
    location.reload()
}
