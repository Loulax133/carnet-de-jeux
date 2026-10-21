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
