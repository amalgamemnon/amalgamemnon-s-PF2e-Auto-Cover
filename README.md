###amalgamemnon's PF2e AutoCover

📖 A fully automated cover detection module for Foundry VTT using Levels-AutoCover!
This module ensures that Pathfinder 2e cover mechanics are correctly applied based on target visibility and obstructions, removing the need for manual adjustments.
⚡ Features

✅ Automatically applies the correct cover effect when targeting a token.
✅ Removes the cover effect when untargeted.
✅ Handles multiple targets, applying effects individually.
✅ Upgrades Standard Cover to Greater Cover if the target has "Has Taken Cover".
✅ Detects "No Cover - Obstructed" and applies Lesser Cover.
✅ Fully automates Levels-AutoCover settings on module load.
🔧 Installation

    Download the module or clone this repository:

git clone https://github.com/YOUR_GITHUB_USERNAME/amalgamemnons-pf2e-autocover.git

Move the module into Foundry's modules/ directory:

    foundrydata/Data/modules/amalgamemnons-pf2e-autocover/

    Enable the module in Foundry VTT under Manage Modules.
    Ensure Levels-AutoCover is installed and enabled.

⚙️ Automated Settings Configuration

This module automatically configures Levels-AutoCover to ensure proper functionality. The following settings are applied at startup:
Setting Key	Value
apiMode	true
coverMessageAPI	true
onlyOwnedNames	true
coverRestriction	4
displayChat	true
tokensProvideCover	true
activeEffectDefinition	`"25,Greater Cover|50,Standard Cover|75,LesserCover"`
copsesProvideCover	false
ignoreFriendly	false
tokenhppath	"actor.system.attributes.hp.value"
tokenCoverText	"Obstructed"
enableActiveEffect	false
enableDucking	true
duckingIcon	"modules/levelsautocover/icons/ducking.png"

These settings ensure Levels-AutoCover functions correctly with this module.
📜 Cover Mechanics

This module automates Pathfinder 2e’s cover rules:

    Lesser Cover (+1 AC): Applied when visibility is 50-75%.
    Standard Cover (+2 AC, +1 Reflex, +1 Stealth): Applied when visibility is 25-50%.
    Greater Cover (+4 AC, +2 Reflex, +2 Stealth): Applied when visibility is 0-25%.
    Standard Cover is upgraded to Greater Cover if the target has "Has Taken Cover".
    "No Cover - Obstructed" (from Levels-AutoCover) is treated as Lesser Cover.

📌 Usage
🎯 Cover Effects

    Select a token and target another token.
    The script automatically calculates cover and applies the effect.
    Untarget the token to remove the cover effect.

🛠️ Debugging

To view module activity, open the Foundry Console (F12) and look for logs such as:

[amalgamemnon's PF2e AutoCover] Applying Standard Cover to Goblin Warrior

This helps confirm the correct cover effect is being applied.
💡 Future Enhancements

    🏹 UI Toggle for Cover Override (GM Only)
    📊 Additional debugging tools
    🎨 Custom cover effect icons

📜 License

This module is available under the MIT License. You are free to modify and distribute it. If you expand on this project, contributions are welcome!
✉️ Support & Feedback

If you have issues or feature requests, open an issue on GitHub or reach out via Foundry VTT forums.

🚀 Happy gaming! Enjoy your fully automated Pathfinder 2e cover system! 🎲
