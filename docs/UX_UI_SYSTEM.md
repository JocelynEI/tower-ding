# Design system

Toutes les valeurs sont dans `src/ui/theme.ts`.

## Couleurs : « jouet pastel » (depuis 1.1.0)

| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#FFF1E3` | écrans (crème) |
| Surface | `#FFFFFF` | cartes, pastilles du HUD |
| Ombre « jouet » | `#F2D9C4` | ombre pleine sous les blocs (`ledge`) |
| Texte principal | `#3B2F56` | prune foncé, contraste 11:1 sur le fond |
| Texte secondaire | `#685A86` | contraste 5,6:1 |
| Accent | `#6E52D6` | action principale (texte blanc, 5,5:1) |
| Combo / or | `#FFC93C` | remplissages ; en texte : `comboText` `#A35F00` |
| Danger | `#C8323F` | stress élevé, suppression |
| Succès | `#2B7D4C` | stress bas, validations |
| Attention | `#E2702A` | stress moyen, maintenance (icônes, jamais en texte) |

Les 10 couleurs d'étage (`floorPalette`) sont franches pour se distinguer d'un coup d'œil sur les étagères pastel, avec un texte prune lisible sur toutes (4,5:1 au minimum) et un fin contour foncé autour des pastilles. Chaque étage a aussi une teinte très claire (`floorTints`) pour son « étagère ». La couleur accompagne **toujours** un numéro et une flèche.

## Typographie : Nunito

Police arrondie, cohérente avec le style jouet. Graisses chargées : 600, 700, 800, 900.

| Style | Taille / interligne | Graisse |
|---|---|---|
| display | 40 / 42 | Black |
| h1 | 28 / 34 | ExtraBold |
| h2 | 20 / 26 | ExtraBold |
| body | 16 / 22 | SemiBold |
| caption | 13 / 18 | Bold |
| overline | 12 / 16, majuscules, espacé | ExtraBold |
| button | 17 / 22 | ExtraBold |

Les chiffres utilisent des largeurs fixes (`tabular-nums`), pour que les scores ne « sautent » pas. La taille du texte suit le réglage d'accessibilité du téléphone, jusqu'à ×1,4.

## Espacements et formes

- Grille de 4 px : 4, 8, 12, 16, 24, 32, 48.
- Rayons : 8, 14, 20, 28, pilule.
- Ombres : `shadow('low')` pour les boutons, `shadow('high')` pour les panneaux.
- Zones tactiles d'au moins **48** (au-dessus du minimum Apple de 44 pt et égal au minimum Android de 48 dp). Chaque étage entier est une zone tactile.

## Composants

| Composant | Rôle |
|---|---|
| `PressableScale` | base de tout élément touchable : réduction d'échelle au toucher, son de clic, vibration légère |
| `Button` | 4 variantes (primary, secondary, ghost, danger), 2 tailles, état désactivé |
| `IconButton` | bouton rond 48, avec libellé accessible obligatoire |
| `Screen` | écran secondaire : zone sûre, bouton retour, défilement, largeur max 520 |
| `Card` | carte avec titre de section |
| `ToggleRow`, `VolumeRow`, `SegmentedRow`, `LinkRow` | lignes de réglages accessibles |
| `ConfirmDialog` | confirmation destructive ; l'action sûre vient en premier |
| `CoinBadge`, `Icon`, `LiftMark`, `Wordmark` | éléments d'identité |

## Mouvement

- Durées : 90 ms (appui), 160 ms, 220 ms (entrées), 300 ms.
- Entrées : fondu + montée de 18 px avec *ease-out cubic* (`useEntrance`).
- Jeu : accélération et freinage de la cabine, légère déformation à l'arrivée et en vitesse, traînée lumineuse, rebond du combo, particules, textes flottants, léger tremblement quand un passager part.
- **Réduire les animations** : plus de tremblement, de déformation ni de traînée, particules réduites, entrées instantanées, transitions d'écran coupées. La valeur initiale reprend le réglage du téléphone.

## Hiérarchie de l'écran de jeu

1. la tour (≈ 80 % de l'écran) : étages, cabine, files ;
2. le stress (pleine largeur, graduations à 25, 50 et 75 %) ;
3. le score (à gauche) et le combo (au centre) ;
4. l'événement en cours (bandeau réservé, pour que la tour ne bouge pas) ;
5. la pause (en haut à droite, 48 px).

Les fenêtres (améliorations, pause, fin de partie) s'ouvrent **en bas de l'écran**, dans la zone du pouce.

## Zones sûres

Tous les écrans utilisent `useSafeAreaInsets` : rien sous l'encoche, la Dynamic Island ou la barre de gestes. Le contenu est limité à 520 px de large sur tablette et navigateur.
