/**
 * AboutApp module
 * @module about
 */

import { NAME, TITLE, MODULE_PATH, TEMPLATES_PATH } from "./config.mjs";

/**
 * About this module FormApp
 * @extends FormApplication
 */
export default class AboutApp extends FormApplication {
    constructor(options={}) {
        super(options);
    }

    /**
     * Call app default options
     * @override
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: `${NAME}-about`,
            title: `About ${TITLE}`,
            template: `${TEMPLATES_PATH}/about.hbs`,
            popOut: true,
            width: 500,
            height: "auto"
        });
    }

    /**
     * Supplies data to the template
     */
    async getData() {
        return {
            version: game.modules.get(NAME).data.version,
            patrons: await this.fetchPatrons()
        }
    }

    /**
     * Fetches a list of Patrons to display on the About page
     */
    async fetchPatrons() {
        const jsonPath = `${MODULE_PATH}/patrons.json`;
        const response = await fetch(jsonPath);
        if (!response.ok) return null;

        const json = await response.json();
        return json;
    }
}