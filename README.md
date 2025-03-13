amalgamemnon's PF2e AutoCover

Overview

amalgamemnon's PF2e AutoCover is a Foundry VTT module designed to automate cover calculations in Pathfinder 2e, leveraging the Levels-AutoCover module. This module ensures that cover effects are applied dynamically based on visibility, obstacles, and special conditions such as the "Take Cover" action.

Features

✅ Automatically applies cover effects based on Levels-AutoCover's detection.✅ Supports multiple targeted tokens, applying effects individually.✅ Removes cover effects when a token is untargeted.✅ Upgrades Standard Cover to Greater Cover when the target has the "Has Taken Cover" effect.✅ Detects "No Cover - Obstructed" cases and applies Lesser Cover when necessary.✅ Automatically configures Levels-AutoCover settings on startup, ensuring correct functionality.✅ Detailed logging for debugging to track cover changes.

Installation

To install the module:

Download the module from the GitHub Repository or Foundry package manager.

Place it in your Foundry VTT Data/modules/ folder.

Enable it in Foundry VTT > Game Settings > Manage Modules.

Ensure Levels-AutoCover is installed and enabled.

How It Works

This module works by:

Detecting cover using Levels-AutoCover when a token is targeted.

Applying the correct cover effect based on the target's visibility:

Greater Cover (≤ 25% visibility)

Standard Cover (≤ 50% visibility)

Lesser Cover (≤ 75% visibility)

Upgrading Standard Cover to Greater Cover if the target has "Has Taken Cover."

Applying Lesser Cover if Levels-AutoCover detects "No Cover - Obstructed."

Removing cover effects when a token is untargeted.

Automatically configuring Levels-AutoCover settings using game.settings.set() on module load.

Required Modules

This module requires:

Levels-AutoCover – Provides cover detection.

Pathfinder 2e System for Foundry VTT

Configuration

This module ensures the following Levels-AutoCover settings are automatically applied:

Setting Key

Value

apiMode

true

coverMessageAPI

true

onlyOwnedNames

true

coverRestriction

4

displayChat

true

tokensProvideCover

true

activeEffectDefinition

`25,Greater Cover

50,Standard Cover

75,Lesser Cover`

copsesProvideCover

false

ignoreFriendly

false

tokenhppath

actor.system.attributes.hp.value

tokenCoverText

Obstructed

enableActiveEffect

false

enableDucking

true

duckingIcon

modules/levelsautocover/icons/ducking.png

Debugging & Logs

To check how the module is functioning:

Open Foundry Console (F12).

Look for logs starting with [amalgamemnon's PF2e AutoCover].

If an issue occurs, logs will provide detailed cover calculations and effect applications.

Planned Features / Future Enhancements

Custom Cover Modifiers: Allow GMs to define custom modifiers beyond the standard Pathfinder 2e values.

UI Indicators: Visual indicators on tokens for cover states.

GM Overrides: Options to manually adjust cover effects in real time.

Contributing

Pull requests and feature requests are welcome! If you encounter issues, please report them on the GitHub Issues page.

License

This module is released under the MIT License. See LICENSE for details.

Developed by amalgamemnon 🚀

