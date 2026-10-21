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

## Amis (version 12)
- Ajout par code ami (6 caractères), puis acceptation par l'autre. Retrait possible des deux côtés.
- « Toi dans le carnet » (Mon compte) relie ton joueur local à ton compte. Ses résultats sont publiés pour tes amis : jeu, date, gagné ou non, points (place au 421). Aucun nom d'adversaire. Interrupteur pour arrêter le partage.
- Un ami peut être relié à un joueur local (champ `uid` du joueur) pour retrouver vos parties ensemble.
- Nouvelles clés locales : `yz-friends` (cache des amis), `yz-pub` (état du partage).
- `firebase-13.1.0.js` a été reconstruit (ajout des requêtes) : à remplacer aussi.

## Parties partagées (version 13)
- Une partie enregistrée avec des amis reliés part automatiquement dans leur boîte aux lettres (`inbox/{uid}/items`). Sur la fiche d'un ami, « Envoyer » rattrape les anciennes parties.
- Chez l'ami, la partie arrive dans son historique local (id `r:<expéditeur>:<id>`, jamais de doublon), puis la boîte est vidée.
- Correspondance : « Toi dans le carnet » pour lui-même, joueurs reliés pour les autres comptes, un joueur non relié du même nom est relié automatiquement, sinon un joueur est créé. Les invités deviennent « Prénom (invité de X) ».
- Supprimer une partie envoyée la retire aussi chez les amis. Supprimer une partie reçue ne la fait pas revenir.
- Clés locales : `yz-outbox` (envois en attente, hors ligne), `yz-recv-del` (parties reçues supprimées).
