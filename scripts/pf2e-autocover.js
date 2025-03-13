console.log("[amalgamemnon's PF2e AutoCover] Module loaded successfully.");

Hooks.once("ready", async function () {
    console.log("[amalgamemnon's PF2e AutoCover] Configuring Levels-AutoCover settings...");

    const settings = {
    "apiMode": true,
    "coverMessageAPI": true,
    "onlyOwnedNames": true,
    "coverRestriction": 4,
    "displayChat": true,
    "tokensProvideCover": true,
    "activeEffectDefinition": "25,Greater Cover|50,Standard Cover|75,Lesser Cover", // Corrected this setting
    "copsesProvideCover": false,
    "ignoreFriendly": false,
    "tokenhppath": "actor.system.attributes.hp.value",
    "tokenCoverText": "Obstructed",
    "enableActiveEffect": false,
    "enableDucking": true,
    "duckingIcon": "modules/levelsautocover/icons/ducking.png"
};


    for (let [key, value] of Object.entries(settings)) {
    if (game.settings.settings.has(`levelsautocover.${key}`)) {
        console.log(`[amalgamemnon's PF2e AutoCover] Setting ${key} = ${value}`);
        await game.settings.set("levelsautocover", key, value);
    } else {
        console.warn(`[amalgamemnon's PF2e AutoCover] Warning: Setting ${key} does not exist in Levels-AutoCover.`);
    }
}


    console.log("[amalgamemnon's PF2e AutoCover] Levels-AutoCover settings applied successfully.");
});

// Hook when a player targets or untargets a token
Hooks.on("targetToken", async function (user, target, targeted) {
    console.log(`[amalgamemnon's PF2e AutoCover] targetToken Hook Fired. Target: ${target?.name}, Targeted: ${targeted}`);

    let attackerToken = game.user.character ? game.user.character.getActiveTokens()[0] : canvas.tokens.controlled[0];

    if (!attackerToken || !attackerToken.actor) {
        console.error("[amalgamemnon's PF2e AutoCover] No valid attacker token found, stopping execution.");
        return;
    }

    console.log(`[amalgamemnon's PF2e AutoCover] Attacker Token: ${attackerToken.name}, Actor: ${attackerToken.actor.name}`);

    if (!targeted) {
        console.log(`[amalgamemnon's PF2e AutoCover] Targeting was removed from ${target.name}, removing cover effect.`);
        await removeCoverEffect(target.actor);
        return;
    }

    console.log(`[amalgamemnon's PF2e AutoCover] Processing cover for targeted token: ${target.name}`);
    await processCover(attackerToken, target);
});

// Function to calculate and apply cover effects
async function processCover(attackerToken, target) {
    let coverData;
    try {
        coverData = await AutoCover.calculateCover(attackerToken, target);
    } catch (error) {
        console.error("[amalgamemnon's PF2e AutoCover] Error calling AutoCover.calculateCover():", error);
        return;
    }

    if (!coverData) {
        console.log(`[amalgamemnon's PF2e AutoCover] No cover data found for ${target.name}, stopping execution.`);
        return;
    }

    let percentVisible = coverData.visibleVolume;
    console.log(`[amalgamemnon's PF2e AutoCover] Percent Visible for ${target.name}: ${percentVisible}%`);

    // Detect "No Cover - Obstructed" and apply Lesser Cover
    if (coverData.cover === null && coverData.obstructingTokens.length > 0) {
        console.log(`[amalgamemnon's PF2e AutoCover] Detected "No Cover - Obstructed" for ${target.name}, applying Lesser Cover.`);
        await toggleLesserCover(target.actor);
        return;
    }

    if (percentVisible > 0 && percentVisible <= 25) {
        console.log(`[amalgamemnon's PF2e AutoCover] Applying Greater Cover to ${target.name}`);
        await toggleGreaterCover(target.actor);
    } else if (percentVisible > 25 && percentVisible <= 50) {
    let hasTakenCover = target.actor.items.some(e => e.name === "Effect: Has Taken Cover");

    if (hasTakenCover) {
        console.log(`[amalgamemnon's PF2e AutoCover] Target ${target.name} has "Effect: Has Taken Cover". Upgrading to Greater Cover.`);
        await toggleGreaterCover(target.actor);
    } else {
        console.log(`[amalgamemnon's PF2e AutoCover] Applying Standard Cover to ${target.name}`);
        await toggleStandardCover(target.actor);
    }
}
 else if (percentVisible > 50 && percentVisible <= 75) {
        console.log(`[amalgamemnon's PF2e AutoCover] Applying Lesser Cover to ${target.name}`);
        await toggleLesserCover(target.actor);
    } else {
        console.log(`[amalgamemnon's PF2e AutoCover] No cover applies to ${target.name}, stopping execution.`);
    }
}

// Functions to apply cover effects using the macro logic
async function toggleGreaterCover(actor) {
    console.log(`[amalgamemnon's PF2e AutoCover] Processing Greater Cover for ${actor.name}`);

    const ITEM_UUID = "Item.8GxVXOK577Ha4vuq"; // Greater Cover
    await toggleEffect(actor, ITEM_UUID);
}

async function toggleStandardCover(actor) {
    console.log(`[amalgamemnon's PF2e AutoCover] Processing Standard Cover for ${actor.name}`);

    const ITEM_UUID = "Item.qIFVLKta76DuuGnt"; // Standard Cover
    await toggleEffect(actor, ITEM_UUID);
}

async function toggleLesserCover(actor) {
    console.log(`[amalgamemnon's PF2e AutoCover] Processing Lesser Cover for ${actor.name}`);

    const ITEM_UUID = "Item.BR8Ufhl0XcVjW0Cl"; // Lesser Cover
    await toggleEffect(actor, ITEM_UUID);
}

// Function to apply or remove the effect (matches your provided macro logic)
async function toggleEffect(actor, ITEM_UUID) {
    console.log(`[amalgamemnon's PF2e AutoCover] Toggling effect on ${actor.name} with UUID: ${ITEM_UUID}`);

    if (!actor) {
        console.error("[amalgamemnon's PF2e AutoCover] No valid actor found.");
        return;
    }

    const item = await fromUuid(ITEM_UUID);
    if (!item) {
        console.error(`[amalgamemnon's PF2e AutoCover] Effect item not found: ${ITEM_UUID}`);
        return;
    }

    console.log(`[amalgamemnon's PF2e AutoCover] Found effect: ${item.name}`);

    const source = item.toObject();
    source._stats.compendiumSource = ITEM_UUID;

    const existing = actor.itemTypes.effect.find((e) => e._stats.compendiumSource === ITEM_UUID);
    if (existing) {
        await existing.delete();
        console.log(`[amalgamemnon's PF2e AutoCover] Removed existing effect "${existing.name}" from ${actor.name}`);
    } else {
        await actor.createEmbeddedDocuments("Item", [source]);
        console.log(`[amalgamemnon's PF2e AutoCover] Successfully applied effect "${item.name}" to ${actor.name}`);
    }
}

// Function to remove cover effects when untargeted
async function removeCoverEffect(actor) {
    if (!actor) return;

    let effects = actor.items.filter(e =>
        ["Effect: Lesser Cover", "Effect: Standard Cover", "Effect: Greater Cover"].includes(e.name)
    );

    if (effects.length === 0) return; // No effects to remove

    console.log(`[amalgamemnon's PF2e AutoCover] Removing cover effects from ${actor.name}`);

    for (let effect of effects) {
        await effect.delete();
        console.log(`[amalgamemnon's PF2e AutoCover] Removed "${effect.name}" from ${actor.name}`);
    }
}
