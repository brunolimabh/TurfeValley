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
        div_qtd.style.display = 'none';
        div_nomes.style.display = 'block';
    }
}