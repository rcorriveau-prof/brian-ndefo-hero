/* Recuperation de nos boutons et de nos differents items de liste et de tableau pour y ajouter des actions*/

document.addEventListener('DOMContentLoaded', function() {
    const ListItem = document.getElementById('ListItem');
    const ChoixCaracteres = document.getElementById('ChoixCaracteres');
    const ImagePersonnage = document.getElementById('ImagePersonnage');
    const AffichageAttaque = document.getElementById('Attaque');
    const AffichageDefense = document.getElementById('Defense');
    const AffichageArgent = document.getElementById('Argent');
    const MessageAlerter = document.getElementById('.alerte');
    const FormulaireAjoutHero  = document.getElementById('FormulaireAjoutHero');
    const BoutonAcheter = document.getElementById('BoutonAcheter');

    /* Ajout des differents isntances de caracters dont ont aura le choix de voir les statistiques */
    const caracteres = {
        "Jacques le Pirate" : { Attaque: 12, Defense: 5, Argent: 350.00, Image: "images/JacquesLePirate.png" },
        "Farouche la sorciere" : { Attaque: 10, Defense: 7, Argent: 400.00, Image: "images/FaroucheLaSorciere.png" },
    }

    /* Fonction qui permet de mettre a jour les informations du caracteres choisit */
    function rechargerInfoCaracteres() {
        const caractereChoisi = ChoixCaracteres.value;
        const infoCharactere = caracteres[caractereChoisi];
        AffichageAttaque.textContent = `Attaque : ${infoCharactere.Attaque}`;
        AffichageDefense.textContent = `Defense : ${infoCharactere.Defense}`;
        AffichageArgent.textContent = `Argent : ${infoCharactere.Argent.toFixed(2)}$`;

    }

    BoutonAcheter.addEventListener('click', function() {
        const caractereChoisi = ChoixCaracteres.value;
        const Argentcaractere = caracteres[caractereChoisi].Argent;
        let coutTotal = 0;


        Array.from(ListItem.rows).forEach((row) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const coutString = row.cells[3].textContent;
                const cout = parseFloat(coutString.replace('$', '').trim());
                coutTotal += cout;
            }
        });

        if (coutTotal > Argentcaractere) {
            MessageAlerter.style.display = 'block';
        }
        else {
            caracteres[caractereChoisi].Argent -= coutTotal;
            rechargerInfoCaracteres();
            MessageAlerter.style.display = 'none';
            alert(`Merci de votre achat! \nCela vous va ravir ! \nMort a vos ennemies \nTotal de ${coutTotal.toFixed(2)}$`);
        }

        Array.from(ListItem.rows).forEach((row) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                row.remove();
            }
        })
    })

    ChoixCaracteres.addEventListener('change', rechargerInfoCaracteres);
    rechargerInfoCaracteres(); //Initialise les informations du caractere a charger sur la page





    /* Fonction qui permet de valider les differetes conditions pour les donnees*/
    function validateItem(Nom, Attaque, Defense, Cout) {
        if (Nom.lenght < 3 || Nom.lenght > 30 ) {
            alert("Le nom doit avoir une longeur de 3 a 30 caracteres.");
            return false;
        }

        if (Attaque < -50 || Attaque > 100 ) {
            alert("La puissance doit etre entre -50 et 100 caracteres.");
            return false;
        }

        if (Defense < -50 || Defense > 100 ) {
            alert("La puissance défensive doit etre entre -50 et 100 caracteres.");
            return false;
        }

        if (Cout <= 0 || isNaN(Cout)) {
            alert("Le cout doit etre un nombre reel et positif");
            return false;
        }
        return true;
    }

    /* Fonction pour vider le formulaire apres la soummision*/
    function clearForm() {
        FormulaireAjoutHero.reset()
        MessageAlerter.style.display = 'none';
    }



    document.querySelector('#formulaireAjoutHero').addEventListener('submit', (e) => {
        e.preventDefault();
        let nom = document.getElementById('Nom').value;
        let puissance = parseInt(document.getElementById('puissance_o').value);
        let defense = parseInt(document.getElementById('puissance_d').value);
        let cout = parseInt(document.getElementById('cout').value);

        let table = document.querySelector('#table tbody');
        let row = table.insertRow(-1);
        let Nom = row.insertCell(0);
        let Puissance = row.insertCell(1);
        let Defense = row.insertCell(2);
        let Cout = row.insertCell(3);
        let checkbox

        Nom.textContent = nom
        Puissance.textContent = puissance.toString()
        Defense.textContent = defense.toString()
        Cout.textContent = cout.toFixed(2) + '$'


    })
})



