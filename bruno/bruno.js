var lideres = [];

function iniciar() {
    campos_inicio.style.display = 'none'
    quest.style.display = 'block'
    trilhaSonora.volume = 0.3;
}

function validar() {
    qtdCavalos = Number(ipt_qtd.value);
    voltas = Number(ipt_voltas.value);

    var erro = false;

    if (qtdCavalos < 2 || qtdCavalos > 6 || ipt_qtd.value == 0 || isNaN(qtdCavalos)) {
        alert('Insira uma quantidade de cavalos entre 2 e 6');
        erro = true;
    }
    if (voltas < 1 || voltas > 5 || ipt_voltas.value == 0 || isNaN(voltas)) {
        alert('Insira uma quantidade de voltas entre 1 e 5');
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
        cavalos.push(
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

        imgCavalo.setAttribute("src", `../img/cavaloSV.png`)
        nomeCavalo.innerHTML = ax_nome;
        imgCavalo.className = 'cavaloImg';
        nomeCavalo.className = 'cavaloNome';

        divCavalos.appendChild(imgCavalo);
        divNomes.appendChild(nomeCavalo);

        ipt_cavalo.value = '';
    }
    if (cavalos.length == qtdCavalos) {
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
            setTimeout(() => {largada.play()},200)
            setTimeout(() => {darVoltas(0)}, 4000);
        }, 3000)
    }
}

function obterTempos() {
    for (let volta = 1; volta <= voltas; volta++) {
        var tempoMin = 10 * voltas;
        for (let index = 0; index < qtdCavalos; index++) {
            var tempo = Number((Math.random() * 2 + 7).toFixed(1));
            cavalos[index].tempos.push(tempo);
            cavalos[index].tempoTotal += tempo;

            if (cavalos[index].tempoTotal < tempoMin) {
                tempoMin = cavalos[index].tempoTotal
            }
        }
        for (let index = 0; index < qtdCavalos; index++) {
            cavalos[index].widths.push((94 * volta / voltas) - 4 * (cavalos[index].tempoTotal - tempoMin))

            if (cavalos[index].tempoTotal == tempoMin && lideres.length < volta) {
                lideres.push(cavalos[index].nome);
            }
        }
    }
}

function darVoltas(volta) {
    largada.pause();
    if (volta > 0 && volta < voltas) {
        div_msg.innerHTML = `Volta ${volta} - ${lideres[volta - 1]} está liderando!`;
    }
    for (let index = 0; index < qtdCavalos; index++) {
        galopa.play()
        document.documentElement.style.setProperty(`--cavalo${index}From`, cavalos[index].widths[volta] + '%');
        document.documentElement.style.setProperty(`--cavalo${index}To`, cavalos[index].widths[volta + 1] + '%');
        let imgCavalo = document.getElementById('cavalogif' + index);
        if (volta == 0) {
            imgCavalo.classList.add('cavaloAnimacao' + index);
        }
    }
    volta++;
    if (volta > voltas) {
        for (let index = 0; index < qtdCavalos; index++) {
            galopa.play()
            document.documentElement.style.setProperty(`--cavalo${index}From`, cavalos[index].widths[volta - 1] + '%');
            document.documentElement.style.setProperty(`--cavalo${index}To`, cavalos[index].widths[volta - 1] + '%');
        }
        div_msg.innerHTML = 'Corrida encerrada!';
        galopa.pause()
        btnPodio.style.display  ='block'
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

        cavalo.setAttribute("src", `../img/cavalogif.gif`)
        cavalo.className = 'cavaloImgCorrida';

        nome.innerHTML = cavalos[i].nome;

        divCorrida.id = 'corrida';
        cavalo.id = 'cavalogif' + i;
        divCorrida.appendChild(cavalo);
        divCorrida.appendChild(nome);
        cavalos_correndo.appendChild(divCorrida);
    }
}

// podio
function exibirPodio() {
    div_corrida.style.display = 'none';
    div_podio.style.display = 'block';
    trilhaSonora.play();

    cavalos.sort((a,b) => a.tempoTotal - b.tempoTotal);

    //nome dos vencedores
    nomeUm.innerHTML = `${cavalos[0].nome}  `;
    nomeDois.innerHTML = `${cavalos[1].nome}`;
    nomeTres.innerHTML = `${cavalos[2].nome}`;
    // tempo dos vencedores
    tempoUm.innerHTML = `${(cavalos[0].tempoTotal).toFixed(2)}`;
    tempoDois.innerHTML = `${(cavalos[1].tempoTotal).toFixed(2)}`;
    tempoTres.innerHTML = `${(cavalos[2].tempoTotal).toFixed(2)}`;
}

function reiniciar() {
    location.reload()
}
