/**
 * @module hooks
 */

import DedupeThisForm from "./form.mjs";
import registerSettings from "./settings.mjs";

/**
 * Initialise Hooks for module use
 */
export function initialiseHooks() {
    Hooks.on("init", () => {
        registerSettings();
    });

    Hooks.on("renderSettings", (app, html, data) => {
        if (game.user.isGM) DedupeThisForm.addSidebarButton(html);
    });
}