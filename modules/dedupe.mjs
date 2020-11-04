/**
 * @module Dedupe This!
 */

/**
 * Main worker class
 */
export default class DedupeThis {
    /**
     * Instantiate a dedupe worker
     */
    constructor() {
        this.folder = null;
        this.entityType = null;
        this.duplicates = null;
        this.duplicatesLocalized = game.i18n.localize("WORDS.Duplicates");
    }

    /**
     * Get folder helper
     * @param {String} nameOrId
     */
    getFolder(nameOrId) {
        if (nameOrId === "root") {
            return {
                name: "root",
                id: "root"
            }
        }

        const folder = game.folders.get(nameOrId) || game.folders.getName(nameOrId);

        return folder;
    }

    /**
     * Get entities helper
     */
    getEntities(folder) {
        const entityType = folder.type;

        if (folder.id === "root") {
            let gameEntityAccessor = null;

            switch (entityType) {
                case "JournalEntry":
                    gameEntityAccessor = "journal";
                    break;
                
                case "RollTable":
                    gameEntityAccessor = "tables";
                    break;

                default:
                    gameEntityAccessor = `${entityType.toLowerCase()}s`;
                    break;
            }
            
            folder.content = gameEntityAccessor ? game[gameEntityAccessor].entities.filter(e => e.folder === null) : [];
        }
        
        return folder.content;
    }

    /**
     * Perform a dedupe against the provided folder using the supplied criteria.
     * Returns both the `unique` and `duplicate` entities
     * @todo make this more functional
     * @param folder 
     * @param criteria 
     */
    async dedupe(folder, criteria, {preview=false}={}) {
        const entityType = folder.type;
        const entities = folder.content;
        /*
        if (!criteria.advanced && !criteria.name && !criteria.img) {
            return {
                uniques: null,
                duplicates: null
            }
        };

        const key = criteria.advanced ? criteria.advanced : criteria.name ? "name" : criteria.img ? "img" : null;
        */
        const uniques = entities.filter((v, i, a) => {
            return a.findIndex(t => {
                return (getProperty(t, criteria.value) === getProperty(v, criteria.value))
            }) === i
        });

        const duplicates = entities.filter(e => !uniques.find(u => u.id === e.id));

        if (!preview) {
            // Check/create Duplicates folder
            const duplicatesFolder = this.getDuplicateFolder(entityType) ?? await this.createDuplicatesFolder(entityType);

            if (!duplicatesFolder) throw "Error finding/creating duplicates folder!";

            // Re-parent entities
            const movedEntities = await this.moveEntities(duplicates, duplicatesFolder);
            movedEntities.length ? ui.notifications.notify(game.i18n.localize("DEDUPE.Successful")) : ui.notifications.warn(game.i18n.localize("DEDUPE.Failed"));
        }

        return { uniques, duplicates };
    }

    /**
     * Determines if there is an existing Duplicates folder for the given entityType
     * @param entityType 
     */
    getDuplicateFolder(entityType) {
        if (!entityType) return;

        return game.folders.entities.find(f => f.name === this.duplicatesLocalized && f.type === entityType);
    }

    /**
     * Creates a Duplicates folder for the given Entity Type. Localized.
     * @param entityType 
     */
    async createDuplicatesFolder(entityType) {
        return Folder.create({
            name: this.duplicatesLocalized,
            type: entityType,
            parent: null
        });
    }

    /**
     * Moves the given entities to the provided folder
     * @param entities 
     * @param folder 
     */
    async moveEntities(entities, folder) {
        const movedEntities = [];

        for (const e of entities) {
            const moved = await e.update({folder: folder.id});
            movedEntities.push(moved);
        }
        
        return movedEntities;
    }
}