# Amalgamemnon's PF2e Auto Cover

**An automation module for Pathfinder 2e in Foundry VTT that integrates seamlessly with Levels-Auto Cover to automatically apply and remove cover effects.**

## 🎯 **Features**
- 📏 **Automatically applies cover effects** (Lesser Cover, Standard Cover, Greater Cover) when targeting a token.
- 🔄 **Removes cover effects** when a token is untargeted.
- 🎯 **Supports multiple targeted tokens**, applying and removing effects individually.
- 🛡 **"Has Taken Cover" support** – Standard Cover upgrades to Greater Cover if the target has this effect.
- ❌ **"No Cover - Obstructed" detection** – Automatically applies Lesser Cover when an obstructing token is present.
- ⚙️ **Auto-configures Levels-Auto Cover settings** to the required values on startup.

## 🛠 **Installation**
1. Download or clone this repository.
2. Place the module folder inside `FoundryVTT/Data/modules/`.
3. Activate `Amalgamemnon's PF2e Auto Cover` in **Foundry VTT > Configure Settings > Manage Modules**.

## ⚙️ **Required Dependencies**
This module requires:
- ✅ [Levels - AutoCover](https://github.com/theripper93/Levels-Auto-Cover)
- ✅ Pathfinder 2e System in Foundry VTT

## 📌 **Configuration & Settings**
On startup, this module **automatically configures** Levels-Auto Cover to ensure correct functionality. The following settings are enforced:
| Setting Key                     | Value |
|----------------------------------|--------------------------------|
| `apiMode`                        | `true` |
| `coverMessageAPI`                | `true` |
| `onlyOwnedNames`                 | `true` |
| `coverRestriction`               | `4` |
| `displayChat`                    | `true` |
| `tokensProvideCover`             | `true` |
| `activeEffectDefinition`         | `"25,Greater Cover|50,Standard Cover|75,Lesser Cover"` |
| `copsesProvideCover`             | `false` |
| `ignoreFriendly`                 | `false` |
| `tokenhppath`                    | `"actor.system.attributes.hp.value"` |
| `tokenCoverText`                 | `"Obstructed"` |
| `enableActiveEffect`             | `false` |
| `enableDucking`                  | `true` |
| `duckingIcon`                    | `"modules/levelsAuto Cover/icons/ducking.png"` |

## 🛡 **How It Works**
1. **Target a token** – The script detects cover using Levels-Auto Cover and applies the appropriate effect.
2. **Untarget a token** – The cover effect is removed automatically.
3. **Multiple targets?** – Each targeted token gets its **own** correct cover effect.
4. **"Has Taken Cover" detection** – If the target has this effect, Standard Cover upgrades to Greater Cover.
5. **"No Cover - Obstructed" detection** – If an obstructing token is present, Lesser Cover is applied.

## 🔄 **Updating**
Simply replace your current module folder with the latest version from this repository and restart Foundry VTT.

## 🐞 **Troubleshooting**
- If cover effects are not applying, ensure that:
  - **Levels-Auto Cover is installed and enabled**.
  - **The attacker has a valid token selected**.
  - **You are using the correct Pathfinder 2e system version**.

## 📜 **License**
This module is released under the **MIT License**. Feel free to modify and share!

## 🎉 **Acknowledgments**
Special thanks to [theripper93](https://github.com/theripper93) for developing **Levels-Auto Cover**, which this module builds upon.

---

