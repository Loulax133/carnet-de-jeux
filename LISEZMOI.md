# Carnet de jeux — version hors ligne

Compteur de points pour Yahtzee, 421 et Skyjo. Fonctionne sans réseau une fois installé.

## Fichiers
- `index.html` — l'application
- `sw.js` — garde l'app en mémoire pour le hors-ligne
- `manifest.webmanifest` + `icon-*.png` — nom et icône sur l'écran d'accueil

## Mettre à jour
Remplacer les fichiers sur GitHub (Add file → Upload files, puis Commit changes).
Les données de jeu sont stockées dans chaque téléphone, à part : une mise à jour ne les efface jamais.

## Règles pour les prochaines versions (à ne pas casser)
- Garder la même adresse GitHub Pages : les données sont liées à l'adresse.
- Ne jamais changer la clé de stockage `yz-carnet`.
- Changer `VERSION` dans `sw.js` à chaque publication pour que les téléphones proposent la mise à jour.

## Compte et sauvegarde Drive (version 10)
- `firebase-13.1.0.js` — le SDK Firebase (connexion + base), embarqué ici pour marcher hors ligne. Chargé seulement si on a un compte.
- `firestore.rules` — les règles de sécurité de la base. À coller dans Firebase → Firestore Database → Règles → Publier, à chaque fois que ce fichier change.
- Le compte est facultatif et se pose par-dessus le stockage local : il ne remplace ni n'efface rien.
- Clés locales ajoutées (à ne pas renommer) : `yz-acct` (profil en cache), `yz-drive` (réglage Drive), `yz-drive-tok` (jeton Google, 1 h).
- Drive : accès `drive.file` uniquement, 10 dernières sauvegardes dans « Carnet de jeux », les plus anciennes vont à la corbeille Drive.
