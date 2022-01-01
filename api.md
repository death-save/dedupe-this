## Modules

<dl>
<dt><a href="#module_about">about</a></dt>
<dd><p>AboutApp module</p>
</dd>
<dt><a href="#module_config">config</a></dt>
<dd></dd>
<dt><a href="#module_Dedupe This!">Dedupe This!</a></dt>
<dd></dd>
<dt><a href="#module_form">form</a></dt>
<dd></dd>
<dt><a href="#module_hooks">hooks</a></dt>
<dd></dd>
<dt><a href="#module_settings">settings</a></dt>
<dd></dd>
<dt><a href="#module_util">util</a></dt>
<dd></dd>
<dt><a href="#module_init">init</a></dt>
<dd></dd>
</dl>

<a name="module_about"></a>

## about
AboutApp module


* [about](#module_about)
    * [~AboutApp](#module_about..AboutApp) ⇐ <code>FormApplication</code>
        * _instance_
            * [.getData()](#module_about..AboutApp+getData)
            * [.fetchPatrons()](#module_about..AboutApp+fetchPatrons)
        * _static_
            * [.defaultOptions](#module_about..AboutApp.defaultOptions)

<a name="module_about..AboutApp"></a>

### about~AboutApp ⇐ <code>FormApplication</code>
About this module FormApp

**Kind**: inner class of [<code>about</code>](#module_about)  
**Extends**: <code>FormApplication</code>  

* [~AboutApp](#module_about..AboutApp) ⇐ <code>FormApplication</code>
    * _instance_
        * [.getData()](#module_about..AboutApp+getData)
        * [.fetchPatrons()](#module_about..AboutApp+fetchPatrons)
    * _static_
        * [.defaultOptions](#module_about..AboutApp.defaultOptions)

<a name="module_about..AboutApp+getData"></a>

#### aboutApp.getData()
Supplies data to the template

**Kind**: instance method of [<code>AboutApp</code>](#module_about..AboutApp)  
<a name="module_about..AboutApp+fetchPatrons"></a>

#### aboutApp.fetchPatrons()
Fetches a list of Patrons to display on the About page

**Kind**: instance method of [<code>AboutApp</code>](#module_about..AboutApp)  
<a name="module_about..AboutApp.defaultOptions"></a>

#### AboutApp.defaultOptions
Call app default options

**Kind**: static property of [<code>AboutApp</code>](#module_about..AboutApp)  
<a name="module_config"></a>

## config
<a name="module_Dedupe This!"></a>

## Dedupe This!

* [Dedupe This!](#module_Dedupe This!)
    * [~DedupeThis](#module_Dedupe This!..DedupeThis)
        * [new DedupeThis()](#new_module_Dedupe This!..DedupeThis_new)
        * [.getFolder(nameOrId)](#module_Dedupe This!..DedupeThis+getFolder)
        * [.getEntities()](#module_Dedupe This!..DedupeThis+getEntities)
        * [.dedupe(folder, criteria)](#module_Dedupe This!..DedupeThis+dedupe)
        * [.getDuplicateFolder(entityType)](#module_Dedupe This!..DedupeThis+getDuplicateFolder)
        * [.createDuplicatesFolder(entityType)](#module_Dedupe This!..DedupeThis+createDuplicatesFolder)
        * [.moveEntities(entities, folder)](#module_Dedupe This!..DedupeThis+moveEntities)

<a name="module_Dedupe This!..DedupeThis"></a>

### Dedupe This!~DedupeThis
Main worker class

**Kind**: inner class of [<code>Dedupe This!</code>](#module_Dedupe This!)  

* [~DedupeThis](#module_Dedupe This!..DedupeThis)
    * [new DedupeThis()](#new_module_Dedupe This!..DedupeThis_new)
    * [.getFolder(nameOrId)](#module_Dedupe This!..DedupeThis+getFolder)
    * [.getEntities()](#module_Dedupe This!..DedupeThis+getEntities)
    * [.dedupe(folder, criteria)](#module_Dedupe This!..DedupeThis+dedupe)
    * [.getDuplicateFolder(entityType)](#module_Dedupe This!..DedupeThis+getDuplicateFolder)
    * [.createDuplicatesFolder(entityType)](#module_Dedupe This!..DedupeThis+createDuplicatesFolder)
    * [.moveEntities(entities, folder)](#module_Dedupe This!..DedupeThis+moveEntities)

<a name="new_module_Dedupe This!..DedupeThis_new"></a>

#### new DedupeThis()
Instantiate a dedupe worker

<a name="module_Dedupe This!..DedupeThis+getFolder"></a>

#### dedupeThis.getFolder(nameOrId)
Get folder helper

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  

| Param | Type |
| --- | --- |
| nameOrId | <code>String</code> | 

<a name="module_Dedupe This!..DedupeThis+getEntities"></a>

#### dedupeThis.getEntities()
Get entities helper

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  
<a name="module_Dedupe This!..DedupeThis+dedupe"></a>

#### dedupeThis.dedupe(folder, criteria)
Perform a dedupe against the provided folder using the supplied criteria.
Returns both the `unique` and `duplicate` entities

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  
**Todo**

- [ ] make this more functional


| Param |
| --- |
| folder | 
| criteria | 

<a name="module_Dedupe This!..DedupeThis+getDuplicateFolder"></a>

#### dedupeThis.getDuplicateFolder(entityType)
Determines if there is an existing Duplicates folder for the given entityType

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  

| Param |
| --- |
| entityType | 

<a name="module_Dedupe This!..DedupeThis+createDuplicatesFolder"></a>

#### dedupeThis.createDuplicatesFolder(entityType)
Creates a Duplicates folder for the given Entity Type. Localized.

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  

| Param |
| --- |
| entityType | 

<a name="module_Dedupe This!..DedupeThis+moveEntities"></a>

#### dedupeThis.moveEntities(entities, folder)
Moves the given entities to the provided folder

**Kind**: instance method of [<code>DedupeThis</code>](#module_Dedupe This!..DedupeThis)  

| Param |
| --- |
| entities | 
| folder | 

<a name="module_form"></a>

## form

* [form](#module_form)
    * [~DedupeThisForm](#module_form..DedupeThisForm)
        * [new DedupeThisForm(...args)](#new_module_form..DedupeThisForm_new)
        * _instance_
            * [.getData()](#module_form..DedupeThisForm+getData)
            * [._getHeaderButtons()](#module_form..DedupeThisForm+_getHeaderButtons)
            * [.activateListeners(html)](#module_form..DedupeThisForm+activateListeners)
            * [._onChangeEntityType(event)](#module_form..DedupeThisForm+_onChangeEntityType)
            * [._onChangeFolder(event)](#module_form..DedupeThisForm+_onChangeFolder)
            * [._onClickButton(event)](#module_form..DedupeThisForm+_onClickButton)
            * [._buildCriteriaObject(formData)](#module_form..DedupeThisForm+_buildCriteriaObject) ⇒ <code>Object</code>
            * [.preview()](#module_form..DedupeThisForm+preview)
            * [.dedupe()](#module_form..DedupeThisForm+dedupe)
            * [._showWarningDialog()](#module_form..DedupeThisForm+_showWarningDialog)
        * _static_
            * [.defaultOptions](#module_form..DedupeThisForm.defaultOptions)
            * [.addSidebarButton(html)](#module_form..DedupeThisForm.addSidebarButton)

<a name="module_form..DedupeThisForm"></a>

### form~DedupeThisForm
FormApp Class

**Kind**: inner class of [<code>form</code>](#module_form)  

* [~DedupeThisForm](#module_form..DedupeThisForm)
    * [new DedupeThisForm(...args)](#new_module_form..DedupeThisForm_new)
    * _instance_
        * [.getData()](#module_form..DedupeThisForm+getData)
        * [._getHeaderButtons()](#module_form..DedupeThisForm+_getHeaderButtons)
        * [.activateListeners(html)](#module_form..DedupeThisForm+activateListeners)
        * [._onChangeEntityType(event)](#module_form..DedupeThisForm+_onChangeEntityType)
        * [._onChangeFolder(event)](#module_form..DedupeThisForm+_onChangeFolder)
        * [._onClickButton(event)](#module_form..DedupeThisForm+_onClickButton)
        * [._buildCriteriaObject(formData)](#module_form..DedupeThisForm+_buildCriteriaObject) ⇒ <code>Object</code>
        * [.preview()](#module_form..DedupeThisForm+preview)
        * [.dedupe()](#module_form..DedupeThisForm+dedupe)
        * [._showWarningDialog()](#module_form..DedupeThisForm+_showWarningDialog)
    * _static_
        * [.defaultOptions](#module_form..DedupeThisForm.defaultOptions)
        * [.addSidebarButton(html)](#module_form..DedupeThisForm.addSidebarButton)

<a name="new_module_form..DedupeThisForm_new"></a>

#### new DedupeThisForm(...args)
Instantiate form and worker


| Param |
| --- |
| ...args | 

<a name="module_form..DedupeThisForm+getData"></a>

#### dedupeThisForm.getData()
Get data for app render

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
**Todo**

- [ ] #1 find a better way to get entity properties

<a name="module_form..DedupeThisForm+_getHeaderButtons"></a>

#### dedupeThisForm.\_getHeaderButtons()
Override the header buttons method

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
<a name="module_form..DedupeThisForm+activateListeners"></a>

#### dedupeThisForm.activateListeners(html)
Activate app event listeners

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  

| Param |
| --- |
| html | 

<a name="module_form..DedupeThisForm+_onChangeEntityType"></a>

#### dedupeThisForm.\_onChangeEntityType(event)
Handle change entity type

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  

| Param |
| --- |
| event | 

<a name="module_form..DedupeThisForm+_onChangeFolder"></a>

#### dedupeThisForm.\_onChangeFolder(event)
Handle change folder

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  

| Param |
| --- |
| event | 

<a name="module_form..DedupeThisForm+_onClickButton"></a>

#### dedupeThisForm.\_onClickButton(event)
Handle click

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  

| Param |
| --- |
| event | 

<a name="module_form..DedupeThisForm+_buildCriteriaObject"></a>

#### dedupeThisForm.\_buildCriteriaObject(formData) ⇒ <code>Object</code>
Builds a Criteria object from the app's form

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
**Returns**: <code>Object</code> - criteria  

| Param |
| --- |
| formData | 

<a name="module_form..DedupeThisForm+preview"></a>

#### dedupeThisForm.preview()
Search for entities using the current formapp's values

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
<a name="module_form..DedupeThisForm+dedupe"></a>

#### dedupeThisForm.dedupe()
Performs the dedupe action

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
<a name="module_form..DedupeThisForm+_showWarningDialog"></a>

#### dedupeThisForm.\_showWarningDialog()
Shows a warning dialog before deduping

**Kind**: instance method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
<a name="module_form..DedupeThisForm.defaultOptions"></a>

#### DedupeThisForm.defaultOptions
Get defaultOptions for application render

**Kind**: static property of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  
<a name="module_form..DedupeThisForm.addSidebarButton"></a>

#### DedupeThisForm.addSidebarButton(html)
Adds the Dedupe This! button to the sidebar

**Kind**: static method of [<code>DedupeThisForm</code>](#module_form..DedupeThisForm)  

| Param |
| --- |
| html | 

<a name="module_hooks"></a>

## hooks
<a name="module_hooks.initialiseHooks"></a>

### hooks.initialiseHooks()
Initialise Hooks for module use

**Kind**: static method of [<code>hooks</code>](#module_hooks)  
<a name="module_settings"></a>

## settings
<a name="exp_module_settings--module.exports"></a>

### module.exports() ⏏
Register module settings

**Kind**: Exported function  
<a name="module_util"></a>

## util

* [util](#module_util)
    * [.buildFormData(FD)](#module_util.buildFormData)
    * [.getKeyByValue(object, value)](#module_util.getKeyByValue)

<a name="module_util.buildFormData"></a>

### util.buildFormData(FD)
Builds a FD returned from _getFormData into a formData array
Borrowed from foundry.js

**Kind**: static method of [<code>util</code>](#module_util)  

| Param | Type |
| --- | --- |
| FD | <code>\*</code> | 

<a name="module_util.getKeyByValue"></a>

### util.getKeyByValue(object, value)
Retrieves a key using the given value

**Kind**: static method of [<code>util</code>](#module_util)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | - the object that contains the key/value |
| value | <code>\*</code> |  |

<a name="module_init"></a>

## init
