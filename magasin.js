/*Creez un objet pour les objet du magasin */
let IdObjet = 0
function Objet(nomObjet, PuissanceObjet, DefenseObjet, cout=0){
    IdObjet++
    this.nomObjet = nomObjet;
    this.PuissanceObjet = PuissanceObjet;
    this.DefenseObjet = DefenseObjet;
    this.Cout=cout;
}
let ListeObjet = [];
//Instancier 4 objet pour le magasin
const Objet_1 = new Objet("Casque Cornu", 3, 6, 100)
const Objet_2 = new Objet("Pantoufles discrètes", 0, 8, 200)
const Objet_3 = new Objet("Sabre laser", 20, -5, 500)
const Objet_4 = new Objet("Plastron de Receveur", 0, 15, 75)

ListeObjet.push(Objet_1);
ListeObjet.push(Objet_2);
ListeObjet.push(Objet_3);
ListeObjet.push(Objet_4);

AfficherTableau()

function AfficherTableau(){
    let table = document.querySelector('#table tbody');
    table.innerHTML = '';
    ListeObjet.forEach(function(objet){
        let row = table.insertRow();
        let Nom = row.insertCell(0);
        let Puissance = row.insertCell(1);
        let Defense = row.insertCell(2);
        let Cout = row.insertCell(3);
        let checkbox = row.insertCell(4);

        //Creer le checkbox pour le tableau
        let cellCheckBox = document.createElement('input');
        cellCheckBox.type = 'checkbox';
        checkbox.appendChild(cellCheckBox);

        Nom.textContent = objet.nomObjet;
        Puissance.textContent = objet.PuissanceObjet;
        Defense.textContent = objet.DefenseObjet;
        Cout.textContent = objet.Cout.toFixed(2)+ '$';
        checkbox.checked = false;
    })
}

AfficherTableau();
const ListItem = document.getElementById('ListItem');
const ChoixCaracteres = document.getElementById('ChoixCaracteres');
const ImagePersonnage = document.getElementById('ImagePersonnage');
const AffichageAttaque = document.getElementById('Attaque');
const AffichageDefense = document.getElementById('Defense');
const AffichageArgent = document.getElementById('Argent');
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
        alert("Le personnage n'a pas assez de fond pour l'achat")

    }
    else {
        caracteres[caractereChoisi].Argent -= coutTotal;
        rechargerInfoCaracteres();
        let achatRemerciement = [
            "Merci de votre achat!",
            "Cela vous va ravir !",
            "Mort à vos ennemis"
        ];

        let randomIndex = Math.floor(Math.random() * achatRemerciement.length);
        let randomElement = achatRemerciement[randomIndex];

        alert(`${randomElement} \nTotal de ${coutTotal.toFixed(2)}$`);

        Array.from(ListItem.rows).forEach((row, index) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                ListItem.deleteRow(index);
            }
        })
    }

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

//Ajouter Un Objet
document.querySelector('#formulaireAjoutHero').addEventListener('submit', (e) => {
    e.preventDefault();
    let nom = document.getElementById('Nom').value;
    let puissance = parseInt(document.getElementById('puissance_o').value);
    let defense = parseInt(document.getElementById('puissance_d').value);
    let cout = parseInt(document.getElementById('cout').value);

   const objet = new Objet(nom, puissance, defense, cout);
   ListeObjet.push(objet);

   AfficherTableau()

   document.querySelector('#formulaireAjoutHero').reset();
})



