


const div_copertina_pranzo = document.getElementById('c_pranzo');
const div_copertina_cena = document.getElementById('c_cena');

const div_specificazione_pranzo = document.getElementById('ss_pranzo');
const div_specificazione_cena = document.getElementById('ss_cena');



// VISIBILITA' (SPECIFICAZIONE PRANZO)
div_copertina_pranzo.addEventListener('click', () => {
    div_copertina_pranzo.style.display = 'none';
    div_specificazione_pranzo.style.display = 'flex';
});

// VISIBILITA' (SPECIFICAZIONE CENA)
div_copertina_cena.addEventListener('click', () => {
    div_copertina_cena.style.display = 'none';
    div_specificazione_cena.style.display = 'flex';
});



// VISIBILITA' (COPERTINA PRANZO)
div_specificazione_pranzo.addEventListener('click', () => {
    div_specificazione_pranzo.style.display = 'none';
    div_copertina_pranzo.style.display = 'flex';
});

// VISIBILITA' (COPERTINA CENA)
div_specificazione_cena.addEventListener('click', () => {
    div_specificazione_cena.style.display = 'none';
    div_copertina_cena.style.display = 'flex';
});



// GESTIONE CHECKBOX DELLO STARTER MODIFIER
let testo_madre = document.getElementById('testo_madre');
let checkbox_madre = document.getElementById('checkbox_madre');
const eet2 = document.getElementById('eet2');
let inputbox_1 = document.getElementById('input_pers_1');
let container = document.getElementById('generatore_blocchi');
let container_row = document.getElementById('generatore_blocchi_row');
let container_preimpostato = document.getElementById('generatore_blocchi_preimpostato');
let container_preimpostato_row = document.getElementById('generatore_blocchi_preimpostato_row')
let canClick = true;

container_preimpostato.setAttribute('style', 'display: flex;');
container_preimpostato.style.borderColor = 'blue';
container_preimpostato.style.boxShadow = '0px 0px 15px rgba(0, 0, 255, 0.5)';
container_preimpostato.style.backgroundImage = 'linear-gradient(white, white)';
container_preimpostato.classList.add('show');

checkbox_madre.addEventListener('click', () => {

    if (!canClick) return; // SE NON PUÒ ESSERE CLICCATO, INTERROMPI LA FUNZIONE

    canClick = false; // DISABILITA ULTERIORI CLICK

    console.log('Before:', checkbox_madre.textContent.trim());
    if (checkbox_madre.textContent.trim() === '') {
        checkbox_madre.textContent = "x";
        eet2.classList.remove('show');

        container.classList.remove('show');
        container_preimpostato.classList.add('show');
        
        setTimeout(() => {
            eet2.style.display = 'none';

            container.style.display = 'none'; // CONTAINER non visibile
            container_preimpostato.style.display = 'flex';
            
        }, 200); // Attendere la fine della transizione di 0.2s
    } else {
        checkbox_madre.textContent = "";
        eet2.style.display = 'flex';

        container.style.display = 'flex'; // CONTAINER visibile
        container_preimpostato.style.display = 'none';
        
        setTimeout(() => {
            eet2.classList.add('show');

            container.classList.add('show');
            container_preimpostato.classList.remove('show');
            
        }, 200); // Attendere la fine della transizione di 0.2s
    }
    console.log('After:', checkbox_madre.textContent);

    setTimeout(() => {
        canClick = true; // RE-ABILITA IL CLICK DOPO 0.5 SECONDI
    }, 500);
});



// LIMITER PER INSERIMENTO NUMERO DI BOX
inputbox_1.addEventListener("input", function() {
    var value = inputbox_1.value;
    // Limiter, numero compreso tra 1 e 14
    if (!/^\d*$/.test(value) || (value !== "" && (parseInt(value, 10) < 1 || parseInt(value, 10) > 14))) {
        inputbox_1.value = value.slice(0, -1);
    }
});



// CREAZIONE DEI BOX IN BASE A QUANTI SCELTI - COMPILAZIONE DEI 2 FORM
document.addEventListener('DOMContentLoaded', (event) => {

    const form1 = document.getElementById('form_applica');
    const button = document.getElementById('button_applica');

    // COMPILAZIONE FORM1
    form1.addEventListener('submit', function (event) {

        event.preventDefault();

        // valore di 'input_pers_1'
        let inputValue = document.getElementById('input_pers_1').value;
        let inputValueInt = parseInt(inputValue, 10);



        // GESTIONE SCELTA: RAPID O MANUALE
        // SELEZIONE: RAPID BOX || IMPEDIMENTO MANUALE
        if (container_preimpostato.style.display === 'flex') {
            alert('Sei in modalità Rapid Box!');
            checkbox_madre.style.pointerEvents = 'none';
            checkbox_madre.style.opacity = 0.5;
            testo_madre.style.opacity = 0.5;
        }
        // SELEZIONE: MANUALE || IMPEDIMENTO RAPID BOX
        if (container_preimpostato.style.display == 'none' && inputValue != '') {
            alert('Sei in modalità Manuale!');
            checkbox_madre.style.pointerEvents = 'none';
            checkbox_madre.style.opacity = 0.5;
            testo_madre.style.opacity = 0.5;
        }



        // SELEZIONE: RAPID BOX || PULIZIA INIZIALE
        const generatore_blocchi_preimpostato_row = document.getElementById('generatore_blocchi_preimpostato_row');
        Array.from(generatore_blocchi_preimpostato_row.children).forEach(child => child.style.display = 'none');

        // SELEZIONE: RAPID BOX || CARICAMENTO BOX PREIMPOSTATI TRAMITE IL TASTO 'RAPID BOX'
        for (let i = 0; i < 7; i++) {
            
            function setRandomBackgroundColorAndTextColor(div) {

                // COLORE RANDOM
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                div.style.backgroundColor = randomColor;
            
                // HEX to RGB
                const r = parseInt(randomColor.slice(1, 3), 16);
                const g = parseInt(randomColor.slice(3, 5), 16);
                const b = parseInt(randomColor.slice(5, 7), 16);
            
                // Calcolo della luminosita'
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                div.style.color = brightness < 128 ? 'white' : 'black';
            }

            const newBoxPre = document.createElement('textarea');
            const newBoxPre_newId = `Box Pre n.${i + 1}`;
            newBoxPre.setAttribute('id', newBoxPre_newId);
            newBoxPre.setAttribute('maxlength', '23'); // MASSIMO 23 CARATTERI INSERIBILI
            newBoxPre.className = 'box_stile';
            setRandomBackgroundColorAndTextColor(newBoxPre);

            if (container_preimpostato.style.display == 'flex') {
                generatore_blocchi_preimpostato_row.appendChild(newBoxPre);
            }
        }



        // SELEZIONE: MANUALE || DICHIARAZIONI
        container.innerHTML = ''; // Pulizia container
        let px = 0; // Altezza da applicare

        // NUOVA RIGA CONTAINER
        let riga_nuova = document.createElement('div');
        riga_nuova.classList.add('generatore_blocchi_row');
        riga_nuova.setAttribute('id', 'Riga n.1');
        container.appendChild(riga_nuova); // Aggiunta riga al container

        // DICHIARAZIONE "gestione_colore_dei_box"
        let gestione_colore_dei_box = document.getElementById('gestione_colore_dei_box');

        // RIEMPIMENTO DI "gestione_colore_dei_box"
        if (checkbox_madre.textContent.trim() === '' && inputValue != '') {
            gestione_colore_dei_box.textContent = '';
        }
        else if(checkbox_madre.textContent == "x") {
            gestione_colore_dei_box.textContent = 'EMPTY';
        }

        // CREAZIONE DEL/DEI BOX
        for (let i = 0; i < inputValueInt; i++) {
            if (i % 7 === 0) {
                if (i !== 0) {
                    // Crea una nuova riga dopo ogni 6 box
                    riga_nuova = document.createElement('div');
                    riga_nuova.classList.add('generatore_blocchi_row');
                    const riga_nuova_newId = `Riga n.2`;
                    riga_nuova.setAttribute('id', riga_nuova_newId);
                    container.appendChild(riga_nuova);
                }
                px += 100;
                container.style.height = `${px}px`;
            }
            const newBox = document.createElement('textarea'); // TIPOLOGIA MODIFICATA
            const newBox_newId = `Box n.${i + 1}`;
            newBox.setAttribute('id', newBox_newId);
            newBox.setAttribute('maxlength', '23'); // MASSIMO 23 CARATTERI INSERIBILI
            newBox.className = 'box_stile';
            riga_nuova.appendChild(newBox);

            // GENERAZIONE DI OGNI ELEMENTO IN 'gestione_colore_dei_box' LEGATO A UN BOX
            const elemento_nuovo = document.createElement('span');
            elemento_nuovo.innerHTML = `<u>${newBox_newId}</u>`;
            const elemento_nuovo_newId = `El n.${i + 1}`;
            elemento_nuovo.setAttribute('id', elemento_nuovo_newId)
            elemento_nuovo.style.cursor = 'pointer';
            elemento_nuovo.style.marginTop = '5px';
            elemento_nuovo.style.marginBottom = '5px';
            elemento_nuovo.style.backgroundColor = '#7A6464';

            // AGGIUNTA DI OGNI ELEMENTO NEL DOM
            gestione_colore_dei_box.appendChild(elemento_nuovo);

            gestione_colore_dei_box.style.justifyContent = 'flex-start';
            gestione_colore_dei_box.style.fontSize = '1em';

            // GENERAZIONE DELLE PALETTE PER OGNI ELEMENTO CREATO
            const palette_nuova = document.createElement('div');
            palette_nuova.className = 'rounded_palette';
            const palette_nuova_newId = `Palette n.${i + 1}`;
            palette_nuova.setAttribute('id', palette_nuova_newId);

            // FUNZIONAMENTO PALETTE
            var colorPicker = new iro.ColorPicker(palette_nuova, {
                width: 150,
                // Colore iniziale
                color: "#f00"
            });

            // CREAZIONE E SHOW DI text_color_choise_div DEDICATO ALL'EL CLICCATO
            const text_color_choise_div = document.createElement('div');
            text_color_choise_div.className = 'text_color_choise_div';
            const text_color_choise_div_newId = `Text Color Choise Div n.${i + 1}`;
            text_color_choise_div.setAttribute('id', text_color_choise_div_newId);
            palette_nuova.appendChild(text_color_choise_div);

            // CREAZIONE E SHOW DELLA LABEL DI text_color_choise_div
            const text_color_choise_label = document.createElement('div');
            text_color_choise_label.className = 'text_color_choise_label';
            const text_color_choise_label_newId = `Text Color Choise Label n.${i + 1}`;
            text_color_choise_label.setAttribute('id', text_color_choise_label_newId);
            text_color_choise_div.appendChild(text_color_choise_label);

            text_color_choise_label.innerHTML = 'Colore del testo:';

            // CREAZIONE E SHOW DELLA SCELTA 1 DI text_color_choise_div
            const text_color_choise_1 = document.createElement('div');
            text_color_choise_1.className = 'text_color_choise_1';
            const text_color_choise_1_newId = `Text Color Choise 1 n.${i + 1}`;
            text_color_choise_1.setAttribute('id', text_color_choise_1_newId);
            text_color_choise_div.appendChild(text_color_choise_1);

            // CREAZIONE E SHOW DELLA SCELTA 2 DI text_color_choise_div
            const text_color_choise_2 = document.createElement('div');
            text_color_choise_2.className = 'text_color_choise_2';
            const text_color_choise_2_newId = `Text Color Choise 2 n.${i + 1}`;
            text_color_choise_2.setAttribute('id', text_color_choise_2_newId);
            text_color_choise_div.appendChild(text_color_choise_2);

            // CONTAINER STARTER MODIFIER
            const starter_modifier = document.getElementById('starter_modifier');
            starter_modifier.appendChild(palette_nuova);

            // FUNZIONE PER OGNI EL CREATO
            elemento_nuovo.addEventListener('click', function() {
                if (elemento_nuovo_newId.slice(-1) == palette_nuova_newId.slice(-1)) {

                    // NASCONDERE TUTTI I DIV CHE AL CLICK SONO SU 'FLEX'
                    Array.from(starter_modifier.children).forEach(child => child.id !== 'starter_modifier_settaggi_box' && (child.style.display = 'none'));

                    // MOSTRARE LA PALETTE DEDICATA ALL'EL CLICCATO
                    palette_nuova.style.display = 'flex';
                }
            });

            // FUNZIONAMENTO PALETTE CON CORRISPONDENZA COLORE IN NEWBOX
            colorPicker.on('color:change', function(color) {
                // Colore corrente della palette
                const colorePalette = color.hexString;
                // Verifica essenziale della connessione ELEMENTO : PALETTE
                if (elemento_nuovo_newId.slice(-1) == palette_nuova_newId.slice(-1)) {
                    // Continuo aggiornamento del colore di newBox
                    newBox.style.backgroundColor = colorePalette;
                }
            });

            text_color_choise_1.addEventListener('click', function() {
                if (elemento_nuovo_newId.slice(-1) == palette_nuova_newId.slice(-1)) {
                    // Continuo aggiornamento del testo di newBox
                    newBox.style.color = 'black';
                }
            });

            text_color_choise_2.addEventListener('click', function() {
                if (elemento_nuovo_newId.slice(-1) == palette_nuova_newId.slice(-1)) {
                    // Continuo aggiornamento del testo di newBox
                    newBox.style.color = 'white';
                }
            });



        }

    });



    const form2 = document.getElementById('form_successivo');

    form2.addEventListener('submit', function (event) {

        event.preventDefault();

        // STARTER MODIFIER
        const starter_modifier = document.getElementById('starter_modifier');
        // TABELLA FINALE
        const tabella_finale_box = document.getElementById('tabella_finale_box');
        // BUTTON SUCCESSIVO
        const button_successivo = document.getElementById('button_successivo');

        // -------------//-------------     GESTIONE SCELTA: RAPID O MANUALE     -------------//-------------
        // SELEZIONE: RAPID BOX || PROSEGUIMENTO
        if (container_preimpostato.style.display === 'flex') {

            var prima_riga_rapidbox = document.getElementById('generatore_blocchi_preimpostato_row');

            // VERIFICA SE IL GENERATORE BOX HA I BOX
            if (container_preimpostato_row.children.length > 0) {
                alert('Procedi con la compilazione della tabella');

                // DISATTIVAZIONE DEL SUBMIT
                button_successivo.style.opacity = 0;
                setTimeout(() => {
                    button_successivo.style.display = 'none';
                }, 200); // Attendere la fine della transizione di 0.2s

                // ANIMAZIONE STARTER-TABELLAFINALE
                starter_modifier.style.opacity = 0;
                setTimeout(() => {
                    starter_modifier.style.display = 'none';
                }, 200); // Attendere la fine della transizione di 0.2s
                setTimeout(() => {
                    tabella_finale_box.style.display = 'flex';
                }, 200); // Attendere la fine della transizione di 0.2s
                tabella_finale_box.style.opacity = 1;

                // BOX NON PIU SOVRASCRIVIBILI PRIMA RIGA
                var i_box_della_prima = prima_riga_rapidbox.children;
                for (var i = 0; i < i_box_della_prima.length; i++) {
                    var il_box_prima = i_box_della_prima[i];
                    // SOLO SE E' TEXTAREA
                    if (il_box_prima.tagName.toLowerCase() === 'textarea') {
                        // NON TRASCRIVIBILE
                        il_box_prima.readOnly = true;
                        il_box_prima.style.cursor = 'pointer';

                    }
                }

                // DRAG & DROP FINALE
                // Seleziona tutti gli oggetti draggabili con la classe box_stile dentro prima_riga_rapidbox
                document.querySelectorAll('#generatore_blocchi_preimpostato_row .box_stile').forEach(draggabile => {
                    draggabile.setAttribute('draggable', 'true');

                    // MANTENERE IL TESTO AGGIORNATO AL CLICK DEL SUBMIT
                    draggabile.textContent = draggabile.value;

                    draggabile.addEventListener('dragstart', (event) => {
                        // Salva l'HTML e il testo dell'elemento originale per il drop
                        event.dataTransfer.setData('text/plain', event.target.outerHTML);
                        event.dataTransfer.effectAllowed = 'move';
                    });

                    draggabile.addEventListener('dragend', () => {
                        // Non è più necessario rimuovere il clone dal DOM
                    });
                });

                // Seleziona tutti i contenitori di drop con la classe tabella_finale_box_contenitori
                document.querySelectorAll('.tabella_finale_box_contenitori').forEach(dropzone => {

                    dropzone.addEventListener('dragover', (event) => {
                        event.preventDefault();  // Necessario per permettere il drop
                    });

                    dropzone.addEventListener('drop', (event) => {
                        event.preventDefault();

                        // Rimuovi tutti i figli attuali della dropzone
                        while (dropzone.firstChild) {
                            dropzone.removeChild(dropzone.firstChild);
                        }

                        // Recupera i dati trasferiti
                        const cloneHTML = event.dataTransfer.getData('text/plain');

                        // Crea un nuovo elemento con l'HTML del clone
                        const draggabileElement = document.createElement('div');
                        draggabileElement.innerHTML = cloneHTML;
                        const element = draggabileElement.firstChild;

                        // Applica stili al clone
                        element.style.margin = 0;
                        element.style.height = '98.5%';
                        element.style.borderRadius = '0px';
                        element.style.padding = '1px';
                        element.style.paddingTop = '14px';

                        // BLOCCO DEDICATO AL TEXT FIX
                        element.style.fontSize = '0.55em';
                        if (element.innerHTML.length > 11) {
                            element.style.paddingTop = '6px';
                        }

                        // Aggiungi il clone alla dropzone
                        dropzone.appendChild(element);
                    });
                });



            }

        }
        // SELEZIONE: MANUALE || PROSEGUIMENTO
        if (container.style.display === 'flex') {

            let prima_riga_manual = document.getElementById('Riga n.1');
            let seconda_riga_manual = document.getElementById('Riga n.2');

            // VERIFICA SE IL GENERATORE BOX HA I BOX
            if (prima_riga_manual.children.length > 0) {
                alert('Procedi con la compilazione della tabella');

                // DISATTIVAZIONE DEL SUBMIT
                button_successivo.style.opacity = 0;
                setTimeout(() => {
                    button_successivo.style.display = 'none';
                }, 200); // Attendere la fine della transizione di 0.2s
                
                // ANIMAZIONE STARTER-TABELLAFINALE
                starter_modifier.style.opacity = 0;
                setTimeout(() => {
                    starter_modifier.style.display = 'none';
                }, 200); // Attendere la fine della transizione di 0.2s
                setTimeout(() => {
                    tabella_finale_box.style.display = 'flex';
                }, 200); // Attendere la fine della transizione di 0.2s
                tabella_finale_box.style.opacity = 1;

                // BOX NON PIU SOVRASCRIVIBILI PRIMA RIGA
                var i_box_della_prima = prima_riga_manual.children;
                for (var i = 0; i < i_box_della_prima.length; i++) {
                    var il_box_prima = i_box_della_prima[i];
                    // SOLO SE E' TEXTAREA
                    if (il_box_prima.tagName.toLowerCase() === 'textarea') {
                        // NON TRASCRIVIBILE
                        il_box_prima.readOnly = true;
                        il_box_prima.style.cursor = 'pointer';

                    }
                }

                //BOX NON PIU SOVRASCRIVIBILI SECONDA RIGA
                if (seconda_riga_manual) {
                    var i_box_della_seconda = seconda_riga_manual.children;
                    for (var i = 0; i < i_box_della_seconda.length; i++) {
                        var il_box_seconda = i_box_della_seconda[i];
                        // SOLO SE E' TEXTAREA
                        if (il_box_seconda.tagName.toLowerCase() === 'textarea') {
                            // NON TRASCRIVIBILE
                            il_box_seconda.readOnly = true;
                            il_box_seconda.style.cursor = 'pointer';

                        }
                    }
                }

                // DRAG & DROP FINALE
                // Seleziona tutti gli oggetti draggabili con la classe box_stile dentro prima_riga_rapidbox
                document.querySelectorAll('.generatore_blocchi_row .box_stile').forEach(draggabile => {
                    draggabile.setAttribute('draggable', 'true');

                    // MANTENERE IL TESTO AGGIORNATO AL CLICK DEL SUBMIT
                    draggabile.textContent = draggabile.value;

                    draggabile.addEventListener('dragstart', (event) => {
                        // Salva l'HTML e il testo dell'elemento originale per il drop
                        event.dataTransfer.setData('text/plain', event.target.outerHTML);
                        event.dataTransfer.effectAllowed = 'move';
                    });

                    draggabile.addEventListener('dragend', () => {
                        // Non è più necessario rimuovere il clone dal DOM
                    });
                });

                // Seleziona tutti i contenitori di drop con la classe tabella_finale_box_contenitori
                document.querySelectorAll('.tabella_finale_box_contenitori').forEach(dropzone => {

                    dropzone.addEventListener('dragover', (event) => {
                        event.preventDefault();  // Necessario per permettere il drop
                    });

                    dropzone.addEventListener('drop', (event) => {
                        event.preventDefault();

                        // Rimuovi tutti i figli attuali della dropzone
                        while (dropzone.firstChild) {
                            dropzone.removeChild(dropzone.firstChild);
                        }

                        // Recupera i dati trasferiti
                        const cloneHTML = event.dataTransfer.getData('text/plain');

                        // Crea un nuovo elemento con l'HTML del clone
                        const draggabileElement = document.createElement('div');
                        draggabileElement.innerHTML = cloneHTML;
                        const element = draggabileElement.firstChild;

                        // Applica stili al clone
                        element.style.margin = 0;
                        element.style.height = '98.5%';
                        element.style.borderRadius = '0px';
                        element.style.padding = '1px';
                        element.style.paddingTop = '14px';

                        // BLOCCO DEDICATO AL TEXT FIX
                        element.style.fontSize = '0.55em';
                        if (element.innerHTML.length > 11) {
                            element.style.paddingTop = '6px';
                        }

                        // Aggiungi il clone alla dropzone
                        dropzone.appendChild(element);
                    });
                });


            }

        }
    });



});

