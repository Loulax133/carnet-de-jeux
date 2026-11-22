# Carnet de jeux — version hors ligne

Compteur de points pour Yahtzee, 421, Skyjo, Shut the Box, Farkle, la Playlist et le Tarot. Fonctionne sans réseau une fois installé.

## Fichiers
- `index.html` — l'application
- `sw.js` — garde l'app en mémoire pour le hors-ligne
- `manifest.webmanifest` + `icon-*.png` — nom et icône sur l'écran d'accueil
- `figtree.woff2`, `instrument-serif.woff2`, `instrument-serif-italic.woff2` — les polices (licence OFL), servies par le site depuis la version 36 pour que l'app s'ouvre aussi vite hors ligne

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

## Jeux en modules et jeu virtuel (versions 31 et 32)
- Chaque jeu est un module dans `index.html` (`defGame(clé, {...})`) : règles, saisie, fin, fiche, stats, historique, direct. Ajouter un jeu = écrire un module.
- Nouveaux jeux : Shut the Box (`shutbox`) et Farkle (`farkle`), seul ou à plusieurs.
- « Jeu virtuel » au lancement (Yahtzee, Shut the Box, Farkle) : dés en 3D sur le téléphone, score inscrit tout seul. L'état du tour est gardé dans la partie (pause, rechargement, Drive).
- Option « Jeu virtuel » décochée par défaut à chaque nouvelle partie (version 33). Marche hors ligne.
- Version 33 : partie en direct aussi pour Shut the Box et Farkle → `firestore.rules` change (règle `watch`). La couronne ne compte que les parties à plusieurs.


## Hors ligne et dés (version 36)
- Plus aucun appel à Google Fonts au démarrage : les trois polices sont dans le dépôt et dans le cache du service worker. Avant, sans réseau ou avec un réseau qui traîne, l'affichage attendait la feuille de style de Google.
- Dés virtuels : deux dés ne se recouvrent plus jamais (tapis et bande « Gardés »). Glisser sur le tapis fait défiler la page ; on lance avec le bouton, en touchant le tapis loin des dés, ou en attrapant un dé et en le lançant vers le haut.

## Jeu de la playlist (version 37)
- Nouveau module `playlist` : chacun ajoute 2 à 4 morceaux YouTube (lien collé) en secret, la playlist est mélangée, chacun vote pour qui a mis le morceau. 1 point par bonne réponse ; morceau que personne n'a trouvé = bonus pour son auteur (Auto : (joueurs − 1) / 2 arrondi au supérieur, ou 1 à 3 au lancement). Au moins 3 joueurs.
- Lecture : bouton « Ouvrir la playlist » (lien YouTube `watch_videos`, dans l'ordre de l'app) ou morceau par morceau dans YouTube Music.
- Plusieurs téléphones : les amis reliés reçoivent l'invitation sur l'accueil. Base : `pl/{uid}_{début}` (état public, écrit par l'hôte) et `pl/{sid}/p/{uid}` (morceaux et votes d'un invité, lus seulement par lui et l'hôte). Sans compte : l'hôte saisit pour le joueur sur son téléphone.
- Verrou de test : document `cfg/app` `{playlistOpen}`. Tant qu'il est faux, seul l'administrateur peut lancer une partie (carte grisée « Bientôt » pour les autres) ; un invité peut quand même rejoindre une partie où on l'a invité. L'interrupteur « Réservé à moi / Ouvert à tous » est sur l'écran de lancement du jeu, visible par l'administrateur seul.
- `firestore.rules` change (blocs `cfg` et `pl`) : à recoller dans Firebase. **Remettre ton code ami à la place de `TON_CODE_AMI`** dans `isAdmin()` avant de publier.
- Nouvelle clé locale (à ne pas renommer) : `yz-pl`.
- Recherche par titre : `YT_KEY` dans `index.html` (clé API YouTube Data API v3, restreinte au référent `https://loulax133.github.io/*` et à cette API). Vide = mode lien collé. Quota gratuit ≈ 100 recherches par jour au total.
- Playlist YouTube Music : l'hôte autorise son compte Google (même identifiant OAuth que Drive, autorisation `youtube` en plus). L'app crée une playlist non répertoriée dans l'ordre mélangé, l'ouvre dans YouTube Music, et la supprime à la fin sauf « La garder ». Clé locale : `yz-yt-tok` (jeton 1 h).
- Confort : lancement bloqué sans internet, bandeau quand la connexion avec les autres téléphones est perdue, morceau choisi par deux joueurs signalé (la playlist attend qu'un des deux change), écran gardé allumé pendant la partie quand le téléphone le permet.

## Accueil trié (version 38)
- Les jeux de l'accueil sont triés pour chaque téléphone selon ses parties. Partie en cours d'abord, puis un score d'habitude : chaque partie des 90 derniers jours compte, d'autant plus qu'elle est récente (poids divisé par 2 tous les 30 jours). À égalité : le plus joué en tout, sinon l'ordre d'origine. Un jeu verrouillé (« Bientôt ») reste à la fin.
- Jeu nouveau (première partie il y a moins de 14 jours) : remonté au moins au milieu de la liste. Ensuite il garde la place que lui donnent ses parties.
- Rien de stocké : l'ordre est recalculé à chaque affichage (fonction `homeOrder()`, réglages `HOME_DAYS`, `HOME_HALF`, `HOME_NEW`). Les parties reçues d'amis comptent aussi.

## Sauvegarde sur le compte (version 41)
- Dès qu'on est connecté, le carnet est copié sur le compte, sans rien toucher : parties, joueurs (jamais les photos), parties en pause, réglages du 421. Les parties en cours restent sur le téléphone où on les joue.
- Nouveau téléphone : se connecter suffit, tout revient (la fenêtre « C'est qui, toi ? » attend la fin de la récupération).
- Deux téléphones : les ajouts, modifications et suppressions passent de l'un à l'autre (à l'ouverture, au retour au premier plan et au bouton Synchroniser). Si un élément a changé des deux côtés, la version du téléphone gagne. Garde-fou : un téléphone qui perd d'un coup plus de la moitié de ses parties (au-delà de 5) n'efface rien sur le compte.
- Base : `bk/{uid}/items/{clé}` `{d, at}` (clés `g_`, `p_`, `z_`, `s_`), lisible et modifiable par le titulaire seul. `firestore.rules` change (bloc `bk`) : à recoller dans Firebase. **Remettre ton code ami à la place de `TON_CODE_AMI`** avant de publier.
- Interrupteur « Sauvegarder mes parties sur mon compte » dans Mon compte → Confidentialité (Oui par défaut). Non = la copie est effacée du serveur. La suppression du compte l'efface aussi.
- Google Drive devient une option : plus de carte ni de point de rappel, plus de fenêtre Google au bouton Synchroniser. La copie Drive se fait toute seule si Google est encore connecté, ou avec « Sauvegarder maintenant ».
- Nouvelle clé locale (à ne pas renommer) : `yz-cloud`.

## Tarot (version 42)
- Nouveau module `tarot`, de 3 à 5 joueurs (règles FFT). Par donne : preneur, partenaire (roi appelé, à 5, « Seul » possible), contrat (Petite ×1, Garde ×2, Garde sans ×4, Garde contre ×6), bouts et points de l'attaque, primes (petit au bout, poignée, chelem).
- Attaque : ±(25 + écart) × contrat ± petit au bout (10 × contrat) ± poignée + chelem. Le preneur marque ce que paient les défenseurs (à 5, le partenaire prend une part) : la somme fait toujours 0.
- Fin de partie à la main, le plus gros total gagne. Une donne se corrige en la touchant dans le tableau.
- `firestore.rules` change (règle `watch` : ajout de `tarot` pour la partie en direct) : à recoller dans Firebase avant d'uploader. **Remettre ton code ami à la place de `TON_CODE_AMI`.**

