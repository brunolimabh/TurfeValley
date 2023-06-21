function iniciar() {
    campos_inicio.style.display = 'none'
    quest.style.display = 'block'
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
                widths: []
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
        setTimeout( ()=> {
            tela_inicio.style.display = 'none';
            div_corrida.style.display = 'block';
            for (let i = 0; i < frases.length; i++) {
                setTimeout(()=>{
                    div_msg.innerHTML = frases[i]
                },1000*i)
            }
            exibirCavalos();
            musicaInicio.pause()
            darVoltas(0)
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
            cavalos[index].widths.push((95 * volta / voltas) - 3 * (cavalos[index].tempoTotal - tempoMin))
        }
    }
}

function darVoltas(volta) {
    for (let index = 0; index < qtdCavalos; index++) {
        let imgCavalo = document.getElementById('cavalogif' + index);
        if (index == 0) {
            imgCavalo.style.listStyle.add('cavaloAnim' + index);
        }
        document.documentElement.style.setProperty(`--cavalo${index}From`, cavalos[index].widths[volta] + '%');
        document.documentElement.style.setProperty(`--cavalo${index}To`, cavalos[index].widths[volta+1] + '%');
    }
    volta++;
    if (volta == voltas) {
        exibirHistorico();
    } else {
        setTimeout(()=>{darVoltas(volta) }, 5000);
    }
}


function exibirCavalos() {
    for (let i = 0; i < qtdCavalos; i++) {
        var divCorrida = document.createElement("div");
        var cavalo = document.createElement("img");

        cavalo.setAttribute("src", `../img/cavalogif.gif`)
        cavalo.className = 'cavaloImg' + i;

        divCorrida.id = 'corrida';
        cavalo.id = 'cavalogif' + i;
        divCorrida.appendChild(cavalo);
        cavalos_correndo.appendChild(divCorrida);
    }
}

// podio
function exibirPodio() {
    div_corrida.style.display = 'none';
    div_podio.style.display = 'block';

    nomeUm.innerHTML = `${cavalo[0].nome} <br> ${cavalo[0].tempoTotal}`;
    nomeDois.innerHTML = `${cavalo[1].nome} <br> ${cavalo[1].tempoTotal}`;
    nomeTres.innerHTML = `${cavalo[2].nome} <br> ${cavalo[2].tempoTotal}`;
}