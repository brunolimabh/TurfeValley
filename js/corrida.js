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
        var divCeu = document.createElement("div");
        var divGrama = document.createElement("div");
        var cavalo = document.createElement("img");

        cavalo.setAttribute("src", `img/cavalogif.gif`)
        cavalo.className = 'cavaloImg' + i;

        divCorrida.id = 'corrida';
        divCeu.className = 'ceu';
        divGrama.className = 'grama';
        cavalo.id = 'cavalogif' + i;
        divCorrida.appendChild(divCeu);
        divCorrida.appendChild(divGrama);
        divCorrida.appendChild(cavalo);
        div_corrida.appendChild(divCorrida);


    }
}
function exibirHistorico() {
    var texto = '<div class = "tabela"><div class="linha"><div>Volta</div>';

    for (let index = 0; index < qtdCavalos; index++) {
        texto += `<div>${cavalos[index].nome}</div>`;
    }
    texto += '</div>';
    for (let volta = voltas; volta > 0; volta--) {
        
        texto += `<div class="linha"><div> ${volta} </div>`


        for (let index = 0; index < qtdCavalos; index++) {
            texto += `<div> ${cavalos[index].tempos[volta -1]} </div>`
        }

        texto += '</div></div>'
 

    }

    divHistorico.innerHTML = texto;

    
    
    
    // document.getElementById('div_podium1').style = 'height: 150px; color: gold;';
    // document.getElementById('div_podium1').innerHTML = `${cavalos}`
    // if (cavalos)
    // document.getElementById('div_podium' + (index + 1)).style = 'height: 150px; color: gold;';
    //     ultimoTempo = cavalos[index].tempoTotal;
    // }
}