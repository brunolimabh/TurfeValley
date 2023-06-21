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
        
    }

    if (cavalos.length == qtdCavalos) {

        setTimeout( ()=> {
            div_nomes.style.display = 'none';
            div_corrida.style.display = 'block';
            obterTempos();
            for (let index = 0; index < frases.length; index++) {
                setTimeout(()=>{
                    div_msg.innerHTML = frases[index]
                },1000*index)
            }
            exibirCavalos();
            darVoltas(0)
        }, 4000)
    }

}