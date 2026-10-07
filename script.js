// ==========================================
// GUEMATRIA CÓSMICA
// SISTEMA DE VALORES
// ==========================================

const alfabetoGC = {
    A: 3,
    B: 3,
    C: 2,
    D: 2,
    E: 3,
    F: 3,
    G: 3,
    H: 3,
    I: 1,
    J: 3,
    K: 3,
    L: 2,
    M: 3,
    N: 3,
    O: 1,
    P: 2,
    Q: 2,
    R: 3,
    S: 2,
    T: 3,
    U: 2,
    V: 2,
    W: 3,
    X: 4,
    Y: 3,
    Z: 3
};


// ==========================================
// ELEMENTOS PRINCIPAIS
// ==========================================

const campoTexto = document.getElementById("texto");
const botaoAnalisar = document.getElementById("botaoAnalisar");
const resultado = document.getElementById("resultado");


// ==========================================
// CONTROLE DE DETALHES DA GC
// ==========================================
//
// false = modo minimalista
// true  = mostrar de onde vem cada número
//
// O padrão é OFF.
// ==========================================

let mostrarDetalhesGC = false;


// ==========================================
// ESTILOS DO CONTROLE DE DETALHES
// ==========================================
//
// Os estilos são inseridos pelo próprio JS.
// Dessa forma, o funcionamento do botão
// não depende de alterações externas no CSS.
//
// A geometria da GC não é alterada aqui.
// ==========================================

function inserirEstilosDetalhesGC() {

    if (document.getElementById("estilosDetalhesGC")) {
        return;
    }

    const estilo = document.createElement("style");

    estilo.id = "estilosDetalhesGC";

    estilo.textContent = `

        /* ======================================
           CONTROLE ON/OFF
           ====================================== */

        #resultado .gc-controle-detalhes {

            width: 100%;
            max-width: 1000px;

            box-sizing: border-box;

            margin: 0 auto 18px;

            padding: 10px 14px;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            gap: 12px;

            position: relative;
            z-index: 20;

        }


        #resultado .gc-detalhes-titulo {

            font-size: 13px;

            letter-spacing: 0.5px;

            opacity: 0.75;

            white-space: nowrap;

        }


        #resultado .gc-toggle-detalhes {

            appearance: none;
            -webkit-appearance: none;

            border: 0;

            background: transparent;

            padding: 0;
            margin: 0;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            gap: 8px;

            cursor: pointer;

            font: inherit;

            color: inherit;

        }


        #resultado .gc-toggle-trilho {

            position: relative;

            display: block;

            width: 46px;
            height: 24px;

            flex: 0 0 46px;

            border-radius: 20px;

            background: #555;

            transition:
                background 0.25s ease,
                box-shadow 0.25s ease;

        }


        #resultado .gc-toggle-bolinha {

            position: absolute;

            top: 3px;
            left: 3px;

            width: 18px;
            height: 18px;

            border-radius: 50%;

            background: #ffffff;

            box-shadow:
                0 1px 4px rgba(0, 0, 0, 0.35);

            transition:
                transform 0.25s ease;

        }


        #resultado .gc-detalhes-estado {

            min-width: 25px;

            font-size: 12px;

            font-weight: 700;

            line-height: 1;

            opacity: 0.75;

            text-align: left;

        }


        /* ======================================
           BOTÃO OFF
           ====================================== */

        #resultado .gc-toggle-detalhes:not(.ativo)
        .gc-toggle-trilho {

            background: #555555;

        }


        #resultado .gc-toggle-detalhes:not(.ativo)
        .gc-toggle-bolinha {

            transform: translateX(0);

        }


        /* ======================================
           BOTÃO ON
           ====================================== */

        #resultado .gc-toggle-detalhes.ativo
        .gc-toggle-trilho {

            background: #e0a74d;

            box-shadow:
                0 0 8px rgba(224, 167, 77, 0.35);

        }


        #resultado .gc-toggle-detalhes.ativo
        .gc-toggle-bolinha {

            transform: translateX(22px);

        }


        #resultado .gc-toggle-detalhes.ativo
        .gc-detalhes-estado {

            opacity: 1;

        }


        /* ======================================
           FOCO DO BOTÃO
           ====================================== */

        #resultado .gc-toggle-detalhes:focus-visible {

            outline: 2px solid #e0a74d;

            outline-offset: 4px;

            border-radius: 5px;

        }


        /* ======================================
           DETALHES OCULTOS
           ====================================== */

        #resultado .gc-molde .gc-detalhe {

            display: none !important;

        }


        /* ======================================
           DETALHES VISÍVEIS
           ====================================== */

        #resultado .gc-molde.gc-mostrar-detalhes
        .gc-detalhe {

            display: block !important;

        }


        /* ======================================
           APARÊNCIA DOS DETALHES
           ====================================== */

        #resultado .gc-molde .gc-detalhe {

            font-size: 11px;

            line-height: 1.3;

            opacity: 0.72;

            transition:
                opacity 0.2s ease;

        }


        /* ======================================
           RESPONSIVO
           ====================================== */

        @media (max-width: 600px) {

            #resultado .gc-controle-detalhes {

                justify-content: center;

                padding-left: 8px;
                padding-right: 8px;

            }

        }


        @media (max-width: 400px) {

            #resultado .gc-controle-detalhes {

                gap: 8px;

            }


            #resultado .gc-detalhes-titulo {

                font-size: 12px;

            }

        }

    `;

    document.head.appendChild(estilo);
}


// ==========================================
// INICIALIZAR ESTILOS
// ==========================================

inserirEstilosDetalhesGC();


// ==========================================
// ATUALIZAR BOTÃO DE DETALHES
// ==========================================

function atualizarBotaoDetalhesGC() {

    const botaoDetalhes =
        document.getElementById("botaoDetalhesGC");

    if (!botaoDetalhes) {
        return;
    }


    // --------------------------------------
    // CLASSE VISUAL
    // --------------------------------------

    botaoDetalhes.classList.toggle(
        "ativo",
        mostrarDetalhesGC
    );


    // --------------------------------------
    // ACESSIBILIDADE
    // --------------------------------------

    botaoDetalhes.setAttribute(
        "aria-pressed",
        String(mostrarDetalhesGC)
    );

    botaoDetalhes.setAttribute(
        "aria-label",
        mostrarDetalhesGC
            ? "Ocultar detalhes da análise"
            : "Mostrar detalhes da análise"
    );


    // --------------------------------------
    // TEXTO ON / OFF
    // --------------------------------------

    const estado =
        botaoDetalhes.querySelector(
            ".gc-detalhes-estado"
        );

    if (estado) {

        estado.textContent =
            mostrarDetalhesGC
                ? "ON"
                : "OFF";

    }
}


// ==========================================
// APLICAR ESTADO DOS DETALHES
// ==========================================

function aplicarEstadoDetalhesGC() {

    const molde =
        document.querySelector(
            ".gc-molde"
        );

    if (molde) {

        molde.classList.toggle(
            "gc-mostrar-detalhes",
            mostrarDetalhesGC
        );

    }

    atualizarBotaoDetalhesGC();
}


// ==========================================
// ALTERNAR DETALHES ON/OFF
// ==========================================

function alternarDetalhesGC() {

    mostrarDetalhesGC =
        !mostrarDetalhesGC;

    aplicarEstadoDetalhesGC();
}


// ==========================================
// CRIAR CONTROLE ON/OFF
// ==========================================

function criarControleDetalhesGC() {

    if (!resultado) {
        return;
    }


    // --------------------------------------
    // SE JÁ EXISTE, NÃO CRIA OUTRO
    // --------------------------------------

    const controleExistente =
        document.getElementById(
            "controleDetalhesGC"
        );

    if (controleExistente) {

        aplicarEstadoDetalhesGC();

        return;

    }


    // --------------------------------------
    // CRIAR CONTAINER
    // --------------------------------------

    const controle =
        document.createElement("div");

    controle.id =
        "controleDetalhesGC";

    controle.className =
        "gc-controle-detalhes";


    // --------------------------------------
    // CONTEÚDO
    // --------------------------------------

    controle.innerHTML = `

        <span class="gc-detalhes-titulo">
            Detalhes da análise
        </span>

        <button
            type="button"
            id="botaoDetalhesGC"
            class="gc-toggle-detalhes"
            aria-label="Mostrar detalhes da análise"
            aria-pressed="false"
        >

            <span class="gc-toggle-trilho">

                <span class="gc-toggle-bolinha"></span>

            </span>

            <span class="gc-detalhes-estado">
                OFF
            </span>

        </button>

    `;


    // --------------------------------------
    // COLOCAR NO RESULTADO
    // --------------------------------------

    resultado.insertBefore(
        controle,
        resultado.firstElementChild
    );


    // --------------------------------------
    // PEGAR BOTÃO
    // --------------------------------------

    const botaoDetalhes =
        document.getElementById(
            "botaoDetalhesGC"
        );


    // --------------------------------------
    // EVENTO
    // --------------------------------------

    if (botaoDetalhes) {

        botaoDetalhes.addEventListener(
            "click",
            alternarDetalhesGC
        );

    }


    aplicarEstadoDetalhesGC();
}



// ==========================================
// NORMALIZAR TEXTO
// ==========================================

function normalizarTexto(texto) {

    return texto
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toUpperCase();

}


// ==========================================
// PROTEGER TEXTO PARA INNERHTML
// ==========================================

function escaparHTML(texto) {

    return texto
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// REDUÇÃO NUMÉRICA
// ==========================================

function reduzirNumero(numero) {

    let resultadoReducao =
        numero;


    while (
        resultadoReducao >= 10
    ) {

        resultadoReducao =
            String(resultadoReducao)
                .split("")
                .reduce(
                    function(
                        soma,
                        algarismo
                    ) {

                        return (
                            soma +
                            Number(algarismo)
                        );

                    },
                    0
                );

    }


    return resultadoReducao;

}


// ==========================================
// FUNÇÃO PRINCIPAL DA GUEMATRIA
// ==========================================

function analisarGC() {

    const textoOriginal =
        campoTexto.value.trim();


    // ======================================
    // CAMPO VAZIO
    // ======================================

    if (
        textoOriginal === ""
    ) {

        resultado.innerHTML = `

            <p class="mensagem-erro">
                Digite uma palavra ou frase antes de analisar.
            </p>

        `;

        return;

    }


    // ======================================
    // NORMALIZAÇÃO
    // ======================================

    const textoNormalizado =
        normalizarTexto(
            textoOriginal
        );


    // ======================================
    // APENAS LETRAS
    // ======================================

    const letras =
        textoNormalizado.replace(
            /[^A-Z]/g,
            ""
        );


    if (
        letras.length === 0
    ) {

        resultado.innerHTML = `

            <p class="mensagem-erro">
                Digite pelo menos uma letra válida.
            </p>

        `;

        return;

    }


    // ======================================
    // PRESENTE
    // ======================================

    const L =
        letras.length;

    const valores = [];

    let V1 = 0;


    for (
        const letra of letras
    ) {

        const valor =
            alfabetoGC[letra];

        valores.push({

            letra: letra,

            valor: valor

        });

        V1 += valor;

    }


    // ======================================
    // FUTURO
    //
    // V1 → V2 → C1 → R1
    // ======================================

    const V2 =
        reduzirNumero(
            V1
        );

    const C1 =
        L + V2;

    const R1 =
        reduzirNumero(
            C1
        );


    // ======================================
    // PASSADO
    //
    // V1 → C2 → R2
    // ======================================

    const C2 =
        V1 + L;

    const R2 =
        reduzirNumero(
            C2
        );


    // ======================================
    // ENCONTRO
    //
    // R1 + R2 → R3 → R4
    // ======================================

    const R3 =
        R1 + R2;

    const R4 =
        reduzirNumero(
            R3
        );


    // ======================================
    // TEXTO SEGURO
    // ======================================

    const tituloSeguro =
        escaparHTML(
            textoOriginal.toUpperCase()
        );


    // ======================================
    // GERAR ESTRUTURA
    //
    // IMPORTANTE:
    //
    // O JavaScript não define posições.
    //
    // A geometria continua sendo
    // controlada pelo CSS atual.
    // ======================================

    resultado.innerHTML = `

        <div class="gc-molde">


            <!-- =========================
                 L
            ========================== -->

            <div class="gc-caixa gc-l">

                <span class="gc-sigla">
                    L
                </span>

                <strong>
                    ${L}
                </strong>

                <small class="gc-detalhe">
                    Quantidade de letras
                </small>

            </div>


            <!-- =========================
                 ROTAS DE L
            ========================== -->

            <div class="gc-rota-l-passado"></div>

            <div class="gc-rota-l-futuro"></div>


            <!-- =========================
                 ÁREA DINÂMICA DAS LETRAS
            ========================== -->

            <div class="gc-letras-area">

                <h2 class="gc-texto-analisado">

                    ${tituloSeguro}

                </h2>


                <div class="gc-letras">

                    ${valores.map(
                        function(item) {

                            return `

                                <div class="gc-letra">

                                    <span class="gc-letra-nome">

                                        ${item.letra}

                                    </span>


                                    <span class="gc-letra-valor">

                                        ${item.valor}

                                    </span>


                                    <div class="gc-fio-letra"></div>

                                </div>

                            `;

                        }
                    ).join("")}

                </div>


                <div class="gc-coletor-letras"></div>

            </div>


            <!-- =========================
                 ESTRUTURA FIXA
            ========================== -->

            <div class="gc-estrutura-fixa">


                <!-- =====================
                     V1
                ====================== -->

                <div class="gc-caixa gc-v1">

                    <span class="gc-sigla">
                        V1
                    </span>

                    <strong>
                        ${V1}
                    </strong>

                    <small class="gc-detalhe">
                        Soma dos valores das letras
                    </small>

                </div>


                <!-- =====================
                     DIVISÃO
                ====================== -->

                <div class="gc-divisao-rotas"></div>


                <!-- =====================
                     PASSADO
                ====================== -->

                <div class="gc-passado">

                    <div class="gc-linha-v1-c2"></div>


                    <div class="gc-caixa gc-c2">

                        <span class="gc-sigla">
                            C2
                        </span>

                        <strong>
                            ${C2}
                        </strong>

                        <small class="gc-detalhe">
                            V1 + L
                        </small>

                    </div>


                    <div class="gc-linha-c2-r2"></div>


                    <div class="gc-caixa gc-r2">

                        <span class="gc-sigla">
                            R2
                        </span>

                        <strong>
                            ${R2}
                        </strong>

                        <small class="gc-detalhe">
                            Redução de C2
                        </small>

                    </div>

                </div>


                <!-- =====================
                     FUTURO
                ====================== -->

                <div class="gc-futuro">

                    <div class="gc-linha-v1-v2"></div>


                    <div class="gc-caixa gc-v2">

                        <span class="gc-sigla">
                            V2
                        </span>

                        <strong>
                            ${V2}
                        </strong>

                        <small class="gc-detalhe">
                            Redução de V1
                        </small>

                    </div>


                    <div class="gc-linha-v2-c1"></div>


                    <div class="gc-caixa gc-c1">

                        <span class="gc-sigla">
                            C1
                        </span>

                        <strong>
                            ${C1}
                        </strong>

                        <small class="gc-detalhe">
                            L + V2
                        </small>

                    </div>


                    <div class="gc-linha-c1-r1"></div>


                    <div class="gc-caixa gc-r1">

                        <span class="gc-sigla">
                            R1
                        </span>

                        <strong>
                            ${R1}
                        </strong>

                        <small class="gc-detalhe">
                            Redução de C1
                        </small>

                    </div>

                </div>


                <!-- =====================
                     PRESENTE FINAL
                ====================== -->

                <div class="gc-presente-final">

                    <div class="gc-linha-r2-r3"></div>

                    <div class="gc-linha-r1-r3"></div>


                    <div class="gc-caixa gc-r3">

                        <span class="gc-sigla">
                            R3
                        </span>

                        <strong>
                            ${R3}
                        </strong>

                        <small class="gc-detalhe">
                            R1 + R2
                        </small>

                    </div>


                    <div class="gc-linha-r3-r4"></div>


                    <div class="gc-caixa gc-r4">

                        <span class="gc-sigla">
                            R4
                        </span>

                        <strong>
                            ${R4}
                        </strong>

                        <small class="gc-detalhe">
                            Redução de R3
                        </small>

                    </div>

                </div>

            </div>

        </div>

    `;


    // ======================================
    // CRIAR CONTROLE ON/OFF
    // ======================================

    criarControleDetalhesGC();


    // ======================================
    // RESTAURAR ESTADO ATUAL
    //
    // Se estava ON antes de fazer uma nova
    // análise, continua ON.
    // ======================================

    aplicarEstadoDetalhesGC();

}


// ==========================================
// EVENTOS PRINCIPAIS
// ==========================================

if (
    botaoAnalisar &&
    campoTexto &&
    resultado
) {

    botaoAnalisar.addEventListener(
        "click",
        analisarGC
    );


    campoTexto.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                analisarGC();

            }

        }
    );

}


// ==========================================
// MENU E MODAIS
// ==========================================

const botaoAlfabeto =
    document.getElementById(
        "botaoAlfabeto"
    );

const botaoGuia =
    document.getElementById(
        "botaoGuia"
    );

const modalAlfabeto =
    document.getElementById(
        "modalAlfabeto"
    );

const modalGuia =
    document.getElementById(
        "modalGuia"
    );

const fecharAlfabeto =
    document.getElementById(
        "fecharAlfabeto"
    );

const fecharGuia =
    document.getElementById(
        "fecharGuia"
    );


// ==========================================
// ABRIR ALFABETO
// ==========================================

if (
    botaoAlfabeto &&
    modalAlfabeto
) {

    botaoAlfabeto.addEventListener(
        "click",
        function() {

            modalAlfabeto.classList.add(
                "aberto"
            );

        }
    );

}


// ==========================================
// FECHAR ALFABETO
// ==========================================

if (
    fecharAlfabeto &&
    modalAlfabeto
) {

    fecharAlfabeto.addEventListener(
        "click",
        function() {

            modalAlfabeto.classList.remove(
                "aberto"
            );

        }
    );

}


// ==========================================
// ABRIR GUIA
// ==========================================

if (
    botaoGuia &&
    modalGuia
) {

    botaoGuia.addEventListener(
        "click",
        function() {

            modalGuia.classList.add(
                "aberto"
            );

        }
    );

}


// ==========================================
// FECHAR GUIA
// ==========================================

if (
    fecharGuia &&
    modalGuia
) {

    fecharGuia.addEventListener(
        "click",
        function() {

            modalGuia.classList.remove(
                "aberto"
            );

        }
    );

}


// ==========================================
// FECHAR AO CLICAR FORA
// ==========================================

if (
    modalAlfabeto
) {

    modalAlfabeto.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modalAlfabeto
            ) {

                modalAlfabeto.classList.remove(
                    "aberto"
                );

            }

        }
    );

}


if (
    modalGuia
) {

    modalGuia.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modalGuia
            ) {

                modalGuia.classList.remove(
                    "aberto"
                );

            }

        }
    );

}


// ==========================================
// FECHAR COM ESC
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            if (
                modalAlfabeto
            ) {

                modalAlfabeto.classList.remove(
                    "aberto"
                );

            }


            if (
                modalGuia
            ) {

                modalGuia.classList.remove(
                    "aberto"
                );

            }

        }

    }
);