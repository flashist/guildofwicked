
--------------------------------------------------------------------------------
	Isle of Lore 2: Strategy Figures
--------------------------------------------------------------------------------

- Introduction & Contact
- Note on Different Versions
- License
- Contents
- Content Structure
- Specification
- How to Use
- How to Use: Hex Kit
- How to Use: Showcase.kra Source File
- How to Use: Legible Source File
- Krita
- Modifications

--------------------------------------------------------------------------------
	Introduction & Contact
--------------------------------------------------------------------------------

Hey there!

Thanks a lot for buying my set of strategy figures. They fit best with strategy
games to mark the position of various units on a map and given the style, they
are highly compatible with my "Isle of Lore 2" hex tiles (in fact, there is
a Hex Kit compatible variant in this Strategy Figure set which can be directly
used with the hex tiles):

https://stevencolling.itch.io/isle-of-lore-2-hex-tiles-regular

If you encounter any problem, got a question or have some feedback,
you can reach me easily via mail (see below).

I may update this asset pack (at no additional cost) in the future
and if you want to keep up-to-date and learn more about my other game-related
projects, you can subscribe to my mailing list or join my Discord.

	Mailing List: 	https://mailinglist.stevencolling.com/game_assets/
	Discord:		http://discord.stevencolling.com
	Mail:			info@stevencolling.com
	Website:		https://www.stevencolling.com

I also draw a piece of art every day and post it to my Tumblr, Instagram and Twitter:

	Tumblr:			https://stevencolling.tumblr.com/
	Instagram:		https://www.instagram.com/its.steven.colling/
	Twitter:		https://twitter.com/StevenColling

See you there!
Steven Colling

--------------------------------------------------------------------------------
	Note on Different Versions
--------------------------------------------------------------------------------

This pack is sold across multiple marketplaces and for some of them, the
contents and the directory structures had to be adapted. To avoid having to
keep multiple README files up-to-date, this file is based on the most
extensive version of the sets. If there are files/folders missing which you
need, please write me at info@stevencolling.com. It's not that actual content
is missing, it's that content in a special format is missing, for example a
"Legible" variant of the files used by Tabletop RPG players, which is not
included in a version sold on a marketplace which targets video game developers
only. Again, if there's a problem, let me know! :)

--------------------------------------------------------------------------------
	License
--------------------------------------------------------------------------------

Depending on where you bought this asset, the store may provide license terms
for the assets they sell, including this one. If that's not the case, you'll
find a "License.txt" file in the topmost directory. Please refer to either the
storefront's asset license or to the license file provided with the assets.
If you think the seller's license is too restricting for your usage, or you
want the pack on another store too (with the exception of me being able to
generate keys on that platform), please reach out via mail:

	info@stevencolling.com

--------------------------------------------------------------------------------
	Contents
--------------------------------------------------------------------------------

The Strategy Figure Set contains...

80 Strategy Figures
	64 Figures
	16 Compositions
		*Compositions are groups of figures; I note them specifically to not
		 leave the impression to inflate the figure count by putting together
		 a bunch of already drawn figures.

in 2 sizes
	180x180 px
	90x90 px

in 2 variants
	with white frame
	without white frame

in 2 file variants
	single files (png)
	sprite sheets (png)

The figures included:

Villager, Elder, Worker, Miner, Farmer, Adventurer, Hero, Trader,
Priest, Druid, Warrior, Pikeman, Archer, Knight, Paladin, Mage,
Barbarian, Bandit, Rogue, Cat, Dog, Wolf, Rat, Sheep,
Chicken, Turkey, Cow, Bull, Pig, Boar, Rabbit, Stag,
Bear, Frog, Snake, Bat, Crow, Horse, Saddled Horse, Armored Horse,
Donkey, Saddled Donkey, Cart, Wagon, Carriage, Balloon, Orc, Goblin,
Slime, Zombie, Mummy, Skeleton, Skeleton Warrior, Skeleton Archer, Ghost, Spider,
Troll, Yeti, Cyclops, Fen Fire, Werewolf, Witch, Dragon, Kraken

The compositions included:

People, Workers, Trader with Donkey, Trader with Wagon, Adventurer with Horse,
	Hero with Horse, Party, Soldiers,
Bandits, Knight with Horse, Paladin with Horse, Livestock, Orcs, Goblins,
	Zombies, Skeletons

--------------------------------------------------------------------------------
	Content Structure
--------------------------------------------------------------------------------

In the topmost directory:

./Images				the figures as png files
./Images Legible		"Legible" is a version of the figures compatible with
						the Hex Kit software. The files are differently named
						and have different image bounds so they can be easily
						imported
./Sources Legible		the source files used to create the "Legible" variant
						explained above; the actual source of the figures
						is available in the Showcase.kra in the topmost folder
./Sprite Sheets			the figures compiled as sprite sheets
Changelog.txt			logging the asset pack's changes
License.txt				see "License" section somewhere above
README.txt				this file
Showcase.kra			source file including all figures' data
Showcase.png			png export
Showcase.psd			psd export (if there are problems, let me know!)

--------------------------------------------------------------------------------
	Specification
--------------------------------------------------------------------------------


> File Name Structure <


The figures as single pngs have the following file names:

strategy_figure_[size]_[framing]_[palette]_[name].png

	[size]		180x180		180x180 px size
				90x90		90x90 px size
	[framing]	framed		with white frame
				unframed	without white frame
	[palette]	standard	colored (only variant in pack right now)
	[name]		...			name of the figure

The sprite sheets are named similar:

strategy_figures_[size]_[framing]_[palette].png


> Dimensions <


180x180 px		15x15 mm with 300 DPI
90x90 px		7.5x7.5 mm with 300 DPI


> Color Palette <


Dark			#696a6d
Blue Dark		#748481
Blue Light		#909b97
Green Dark		#7f8a78
Green Medium	#b6bb7d
Green Light		#dfdf86
Brown			#867472
Brown Light		#d3baac
Red				#ff777c
Yellow			#ffda82
Light			#efefef


> Krita <


For all linework I used the "Ink-2 Fineliner" pen with a size of 7px.

--------------------------------------------------------------------------------
	How to Use
--------------------------------------------------------------------------------

The strategy figures are intended to be used on any map for marking the location
of units, players and monsters, in a fantasy or medieval context. Using the
variant with the white frame around them is recommended, because otherwise they
would blend into the environment too much! So the most recommended variant
would be:

./Images/180x180/Framed Standard

The Showcase.kra source file allows you to turn off single layers and even body
parts of the figures and re-color or re-draw them to fit your needs, for example
to place another weapon into their hands or give the horse armor another color
or even apply a whole new palette.

--------------------------------------------------------------------------------
	How to Use: Hex Kit
--------------------------------------------------------------------------------

The "Images Legible" folder contains a folder "Isle of Lore 2" like that one
from the "Isle of Lore 2: Hex Tiles Regular" asset pack I made. You can copy
the "Overlays Figure" folder within directly over to where you kept your
"Isle of Lore 2" Hex Kit assets. The folder should then look like that:

./Isle of Lore 2
./Isle of Lore 2/Overlays Figure							<- the copied folder
./Isle of Lore 2/Overlays Figure/Framed Cut Standard
./Isle of Lore 2/Overlays Figure/Framed Uncut Standard
./Isle of Lore 2/Overlays Figure/Unframed Cut Standard
./Isle of Lore 2/Overlays Figure/Unframed Uncut Standard
./Isle of Lore 2/Overlays Flair Standard
./Isle of Lore 2/Overlays Location
./Isle of Lore 2/Overlays Location/Framed Cut Standard
./Isle of Lore 2/Overlays Location/Framed Uncut Standard
./Isle of Lore 2/Overlays Location/Unframed Cut Standard
./Isle of Lore 2/Overlays Location/Unframed Uncut Standard
./Isle of Lore 2/Overlays Marker Standard
./Isle of Lore 2/Overlays Path
...and so on...

Then re-import the set within Hex Kit and you are good to go: you can
directly use the figures as overlays similar how you used the
location overlays!

Tip: use the "Framed Cut" variant of the figures to have white borders to make
the figures easier to read and cut, so they don't overlap with the tile's border.

--------------------------------------------------------------------------------
	How to Use: Showcase.kra Source File
--------------------------------------------------------------------------------

Open the file "Showcase.kra" (or psd) to open the source file. The first
part > Structure < explains the layer grouping within the source file. The
part > Figures < further below explains how the single figures are constructed.


> Structure <


On the topmost level, there are two groups:

	STRATEGY FIGURES		all the layers containing the figures and additional
							information like the figures' names and frames
	BACKGROUND				the showcase's background and additional
							information like the palette at the top
							(hide this when exporting!)

Within the STRATEGY FIGURES group:

	NAMES					the figures' names (written below the figures)
	FIGURES					the figures separated into smaller groups
	UTILITY					utility layers

Within FIGURES:

	PEOPLE, FIGHTERS,		groups for the single figures
	ANIMALS, UTILITY,
	CREATURES
	COMPOSITIONS			figures which consist of multiple copied figures
	WHITE BORDERS			the white frames around the figures

Within UTILITY:

	helper lines			various lines and pixels to help positioning the
							figures and their names properly; turn this on
							when you reposition figures or want to position
							your own figures, otherwise turn this off
	BACKGROUNDS				different background icons for the figures, like
							slightly deformed panels, pixel-perfect squares
							etc.; show only one of those!


> Figures <


Different body parts like head, body or a held weapon have their own groups. In
these groups, most of the time you'll find a layer called "line" which is the
linework or outlining, and "fill" which is the color within that line. There
is some variation to that, but they start with either the "line" or "fill"
keyword, like "line belt" denoting the linework for a belt within a BODY group.

The compositions have layers named after the figures they consist of.

"fix" is a special layer: sometimes when layering different parts on top, there
can be little gaps or spots between the lines which can be a bit distracting.
These "fix" layers close these gaps. Check GOBLIN in the CREATURES group:
there's a "fix under left arm" within the BODY group. Turning that off and on
will show you the fix in action (you have to zoom very close under the goblin's
left elbow to notice it!).

--------------------------------------------------------------------------------
	How to Use: Legible Source File
--------------------------------------------------------------------------------

The source file for the "Legible" variant of the figures (compatible with
Hex Kit) can be found in:

./Sources Legible/overlays_strategy_figures_standard.kra

The following groups can be found in the source file:

	BORDER (HIDE)		a hex tile border used as reference
	HELPER (HIDE)		contains an "area" layer used to mark the area in which
						to place figures (explanation below)
	TILE				the tile with all the figures
	BACKGROUND (HIDE)	background layer

The TILE group contains:

	MASK (HIDE FOR UNCUT)	this mask layer will cut off the figure when it
							reaches into the tile's border (and outside the
							tile). This mask is active to export the "Cut"
							variant of the figures, and hidden for the "Uncut"
							variant. Tiles in Hex Kit can overlay awkwardly,
							so I would recommend the Cut variant.
	UNFRAMED				every figure without a white frame
	FRAMED					every figure with a white frame

The "area" layer in the HELPER (HIDE) group is a striped rectangle which fits
the clear area used on the hex tiles from the "Isle of Lore 2: Hex Tiles Regular"
set. If you make new figures, put them into this rectangle horizontally centered,
and so that the figure stands on the bottom border of the rectangle. It shouldn't
reach below that line, because otherwise it may overlay tree tops from trees below
and that looks really awkward. Make sure that the bottom area (the feet) of the
figure is below the top border of the rectangle, too, because above that line,
there can be trees and bushes and having a figure stand there makes it look like it's
floating in a weird way. The figure itself can reach over that line, of course.

The pack already comes with the figures exported in all variants, so
this exporting procedure is only relevant if you want to export modified
figures or new figures.
To export a figure for Hex Kit, hide the BORDER (HIDE), HELPER (HIDE) and
BACKGROUND (HIDE) groups. Decide if to make the mask layer visible or not,
depending on if you want to export the cut or uncut version (cut is recommended).
Then decide if you want to export the figure with a white border (framed)
or not (unframed). Make one figure of the respective group visible and export
the file to png. Repeat this for every figure you want to export.

--------------------------------------------------------------------------------
	Krita
--------------------------------------------------------------------------------

The files were originally made with the free (and amazing) painting software
Krita, available at krita.org. There are also Photoshop exports available. If
you encounter a problem with those exports, please let me know!

--------------------------------------------------------------------------------
	Modifications
--------------------------------------------------------------------------------

Warning: if you make changes to the files, please copy the files to a different
location first, before you download a new version of the assets and hence
accidentally overwrite your modifications.





Thank you!