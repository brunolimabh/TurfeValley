function verPodium() {
    podium.style.display = "block";
    div_corrida.style.display = "none";

    var listaRanking = cavalos.sort((a,b)=>{a.tempoTotal-b.tempoTotal})

    nomeP.innerHTML = listaRanking[0].nome;
    nomeS.innerHTML = listaRanking[1].nome;
    nomeT.innerHTML = listaRanking[2].nome;
    secP.innerHTML = listaRanking[0].tempo;
    secS.innerHTML = listaRanking[1].tempo;
    secT.innerHTML = listaRanking[2].tempo;
}