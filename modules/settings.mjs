/**
 * @module settings
 */
import { NAME, SETTINGS_KEYS } from "./config.mjs";
import DedupeThisForm from "./form.mjs";

/**
 * Register module settings
 */
export default function registerSettings() {
    game.settings.registerMenu(NAME, SETTINGS_KEYS.formButton, {
        name: "SETTINGS.FormButtonN",
        label: "SETTINGS.FormButtonLabel",
        hint: "SETTINGS.FormButtonH",
        icon: "fas fa-user-slash",
        type: DedupeThisForm,
        restricted: true
    });

    game.settings.register(NAME, SETTINGS_KEYS.suppressWarning, {
        name: "SETTINGS.SuppressWarningN",
        hint: "SETTINGS.SuppressWarningH",
        scope: "client",
        type: Boolean,
        default: false,
        config: true,
        onChange: s => {}
    });
}