document.addEventListener("DOMContentLoaded", function() {
    const adicionarCardButton = document.getElementById("adicionar-card-button");
    const modal = document.getElementById("adicionar-card-modal");
    const fecharModal = modal.querySelector(".fechar-modal");
    const nomeColuna = modal.querySelector("#nome-coluna");
    const conteudoCard = modal.querySelector("#conteudo-card");
    const criarCardButton = modal.querySelector("#criar-card");
    const columnsContainer = document.querySelector(".columns-container");

    adicionarCardButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    fecharModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    criarCardButton.addEventListener("click", function() {
        const tituloColuna = nomeColuna.value.trim();
        const conteudo = conteudoCard.value;

        if (tituloColuna !== "" && conteudo.trim() !== "") {
            // Verifique se a coluna com o título especificado já existe
            let colunaExistente = columnsContainer.querySelector(`.column[data-titulo="${tituloColuna}"]`);

            // Se não existir, crie uma nova coluna
            if (!colunaExistente) {
                colunaExistente = document.createElement("div");
                colunaExistente.classList.add("column");
                colunaExistente.setAttribute("data-titulo", tituloColuna);
                colunaExistente.innerHTML = `
                    <h1>${tituloColuna}</h1>
                    <div class="card-container">
                        <!-- Cards para esta coluna aqui -->
                    </div>
                `;

                columnsContainer.appendChild(colunaExistente);
            }

            // Crie um novo card na coluna correspondente
            const cardContainer = colunaExistente.querySelector(".card-container");
            const novoCard = document.createElement("div");
            novoCard.classList.add("card");

            // Obtenha a data e hora atual
            const dataHoraAtual = new Date();
            const dataFormatada = `${dataHoraAtual.toLocaleDateString()} ${dataHoraAtual.toLocaleTimeString()}`;

            novoCard.innerHTML = `
                <h2>${tituloColuna}</h2>
                <p>${conteudo}</p>
                <p>Criado em: ${dataFormatada}</p>
                <button class="btn btn-outline-danger excluir-card">Excluir</button>
            `;

            cardContainer.appendChild(novoCard);

            // Adicionar um ouvinte de evento para o botão de exclusão
            const excluirButton = novoCard.querySelector(".excluir-card");
            excluirButton.addEventListener("click", function() {
                cardContainer.removeChild(novoCard);

                // Verificar se a coluna está vazia após a exclusão do card
                if (cardContainer.querySelectorAll(".card").length === 0) {
                    columnsContainer.removeChild(colunaExistente);
                }
            });

            // Limpar o conteúdo do card e fechar o modal
            nomeColuna.value = "";
            conteudoCard.value = "";
            modal.style.display = "none";
        }
    });
});





// document.addEventListener("DOMContentLoaded", function() {
//     const adicionarCardButtons = document.querySelectorAll(".adicionar-card");

//     adicionarCardButtons.forEach((adicionarCardButton) => {
//         adicionarCardButton.addEventListener("click", function() {
//             const cardContainer = adicionarCardButton.nextElementSibling;
//             const novoCard = document.createElement("div");
//             novoCard.classList.add("card");
//             novoCard.innerHTML = `
//                 <h2 class="mb-2">Conteúdo</h2>
//                 <textarea placeholder="Digite seu conteúdo aqui"></textarea>
//                 <button class="btn btn-outline-danger mt-2 excluir-card">Excluir</button>
//             `;

//             cardContainer.appendChild(novoCard);

//             // Adicione um ouvinte de evento para o botão de exclusão
//             const excluirButton = novoCard.querySelector(".excluir-card");
//             excluirButton.addEventListener("click", function() {
//                 cardContainer.removeChild(novoCard);
//             });
//         });
//     });
// });

