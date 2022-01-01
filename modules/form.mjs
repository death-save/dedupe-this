
/**
 * @module form
 */
import AboutApp from "./about.mjs";
import { NAME } from "./config.mjs";
import { SETTINGS_KEYS } from "./config.mjs";
import { TEMPLATES_PATH } from "./config.mjs";
import DedupeThis from "./dedupe.mjs";
import { buildFormData } from "./utils.mjs";

/**
 * FormApp Class
 */
export default class DedupeThisForm extends FormApplication {
    /**
     * Instantiate form and worker
     * @param args 
     */
    constructor(...args) {
        super(...args);

        this.dedupeWorker = new DedupeThis();
        this.entityType = null;
        this.folder = null;
        this.criteria = null;
        this.entities = null;
        this.duplicates = null;
        this.uniques = null;
    }

    /**
     * Get defaultOptions for application render
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "dedupe-this-form",
            title: "Dedupe This!",
            template: "modules/dedupe-this/templates/form.hbs",
            popout: true,
            resizeable: true,
            width: 500,
            height: "auto"
        });
    }

    /**
     * Get data for app render
     * @todo #1 find a better way to get entity properties
     */
    getData() {
        const entityTypes = CONST.FOLDER_ENTITY_TYPES;
        const entityType = this.entityType;
        
        const entityTypeEnum = entityType ? entityTypes.indexOf(entityType) : null;
        const folders = entityType ? game.folders.filter(f => f.type === entityType && f.name != this.dedupeWorker.duplicatesLocalized) : null;
        const folder = this.folder;
        const criteria = this.criteria;

        let isNameCriteria,
            isImgCriteria,
            isAdvancedCriteria;

        switch (criteria?.type) {
            case "name":
                isNameCriteria = true;
                break;

            case "img":
                isImgCriteria = true;
                break;
            
            case "advanced":
                isAdvancedCriteria = true;
                break;
                     
            default:
                break;
        }

        const entities = this.entities = this.folder ? this.dedupeWorker.getEntities(folder) : [];
        entities?.length ? entities.forEach(e => e.enrichedLink = TextEditor.enrichHTML(e.link)) : null;
        const uniques = this.uniques;
        const duplicates = this.duplicates;

        return {
            entityTypes,
            entityType,
            entityTypeEnum,
            folders,
            folder,
            criteria,
            isNameCriteria,
            isImgCriteria,
            isAdvancedCriteria,
            entities,
            uniques,
            duplicates,
        }
    }

    /**
     * Override the header buttons method
     */
    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        
        buttons.unshift(
            {
                label: game.i18n.localize("WORDS.About"),
                class: "about",
                icon: "fas fa-question-circle",
                onclick: ev => {
                    new AboutApp().render(true);
                }
            }
        );

        return buttons
    }

    /* -------------------------------------------- */
    /*                Event Handlers                */
    /* -------------------------------------------- */

    /**
     * Activate app event listeners
     * @param html 
     */
    activateListeners(html) {
        const buttons = html.find("button");
        const entityTypeSelect = html.find("select[name='entity-type']");
        const folderSelect = html.find("select[name='folder']");

        buttons.on("click", event => this._onClickButton(event));
        entityTypeSelect.on("change", event => this._onChangeEntityType(event));
        folderSelect.on("change", event => this._onChangeFolder(event));
    }

    /**
     * Handle change entity type
     * @param event 
     */
    _onChangeEntityType(event) {
        const entityTypeEnum = event.currentTarget.value;
        const entityType = CONST.FOLDER_ENTITY_TYPES[entityTypeEnum];
        
        this.entityType = entityType;
        this.folder = null;
        this.criteria = null;
        this.entities = null;
        this.duplicates = null;
        this.uniques = null;

        return this.render();
    }

    /**
     * Handle change folder
     * @param event 
     */
    async _onChangeFolder(event) {
        const folderId = event.currentTarget.value;
        const folder = this.dedupeWorker.getFolder(folderId);
        
        if (folder && !folder.type) folder.type = this.entityType;
        
        this.folder = folder;
        this.entities = null;
        this.duplicates = null;
        this.uniques = null;

        await this.render();
    }

    /**
     * Handle click
     * @param event 
     */
    _onClickButton(event) {
        const buttonName = event.currentTarget.name;

        switch (buttonName) {
            case "preview":
                this.preview();
                break;
            
            case "dedupe":
                this.dedupe();
                break;

            default:
                break;
        }
    }

    /* -------------------------------------------- */
    /*                    Helpers                   */
    /* -------------------------------------------- */

    /**
     * Builds a Criteria object from the app's form
     * @param formData 
     * @returns {Object} criteria
     */
    _buildCriteriaObject() {
        const formData = new FormDataExtended(this.form, {editors: this.editors});
        const data = formData.toObject();
        const criteria = {
            type: data.criteria.replace("criteria.",""),
            value: data.criteria === "criteria.advanced" ? data["criteria-advanced-text"] : data.criteria.replace("criteria.","")
        };

        /*
        const criteria = Object.keys(formData).filter(k => k.startsWith("criteria-")).reduce((obj, key) => {
            obj[key.substr(9,key.length)] = formData[key];
            return obj;
        }, {});
        */

        return criteria;
    }

    /* -------------------------------------------- */
    /*                    Actions                   */
    /* -------------------------------------------- */

    /**
     * Search for entities using the current formapp's values
     */
    async preview() {
        await this.dedupe({preview: true});

        return this.render();
    }

    /**
     * Performs the dedupe action
     */
    async dedupe({preview=false}={}) {
        const warningDialog = preview ? {proceed: true} : await this._showWarningDialog();

        if (!warningDialog.proceed) return;

        const criteria = this._buildCriteriaObject();
        const results = await this.dedupeWorker.dedupe(this.folder, criteria, {preview});

        this.criteria = criteria;
        this.duplicates = results.duplicates;
        this.uniques = results.uniques;

        return this.render();
    }

    /**
     * Shows a warning dialog before deduping
     */
    async _showWarningDialog() {
        const suppressWarning = game.settings.get(NAME, SETTINGS_KEYS.suppressWarning);

        if (suppressWarning) return { proceed: true };

        const content = await renderTemplate(`${TEMPLATES_PATH}/warning-dialog.hbs`, {suppressWarning});
        let proceed = false;
        let newSuppressWarning = false;

        const dialog = await Dialog.confirm({
            title: game.i18n.localize("DEDUPE_WARNING.Title"),
            content,
            yes: (html) => {
                const suppressWarningCheckbox = html.find("input[name='suppress']");

                newSuppressWarning = suppressWarningCheckbox.first().is(":checked");
                proceed = true;
            },
            no: (html) => {
                const suppressWarningCheckbox = html.find("input[name='suppress']");

                newSuppressWarning = suppressWarningCheckbox.first().is(":checked");
                proceed = false
            }
        });

        if (suppressWarning != newSuppressWarning) {
            game.settings.set(NAME, SETTINGS_KEYS.suppressWarning, newSuppressWarning);
        }
        return { proceed };
    }

    /* -------------------------------------------- */
    /*                    Statics                   */
    /* -------------------------------------------- */

    /**
     * Adds the Dedupe This! button to the sidebar
     * @param html 
     */
    static addSidebarButton(html) {
        const utilityDivHtml = `
        <h2>${game.i18n.localize("SIDEBAR.Utilities")}</h2>
        <div id="utility-modules">
            <button data-action="dedupe-this"><i class="fas fa-user"></i><i class="fas fa-user-slash"></i> Dedupe This!</button>
        </div>`;

        html.append(utilityDivHtml);
        const button = html.find("button[data-action='dedupe-this']");

        button.on("click", event => new DedupeThisForm().render(true));
    }
}