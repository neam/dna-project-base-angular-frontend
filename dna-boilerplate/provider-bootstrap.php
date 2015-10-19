<?php

// Angular UI Giiant `CallbackProvider` configuration
// -------------------------

// Text input

$textInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<label for="$lcfirstModelClass.attributes.$attribute">{$attributeInfo["label"]}</label>
<input type="text" ng-model="$lcfirstModelClass.attributes.$attribute" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute" class="form-control m-b" />
INPUT;

};

// "Boolean" tri-state (0,1,NULL) radio inputs

$tristateRadioInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div>
    <label>{$attributeInfo["label"]}</label>
    <div class="radio">
        <label>
            <input icheck type="radio" ng-model="$lcfirstModelClass.attributes.$attribute"
                   ng-value="'1'"
                   name="$attribute"/> Yes
        </label>
    </div>
    <div class="radio">
        <label>
            <input icheck type="radio" ng-model="$lcfirstModelClass.attributes.$attribute"
                   ng-value="'0'"
                   name="$attribute"/> No
        </label>
    </div>
    <div class="radio">
        <label>
            <input icheck type="radio" ng-model="$lcfirstModelClass.attributes.$attribute"
                   ng-value="null"
                   name="$attribute"/> Don't know
        </label>
    </div>
</div>
INPUT;

};

// Has-one-relation select2 input

$hasOneRelationSelect2Input = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<label for="$lcfirstModelClass.attributes.$attribute.id">{$attributeInfo["label"]}</label>
<div class="select2 m-b">
    <select2 ng-model="$lcfirstModelClass.attributes.$attribute.id" name="$lcfirstModelClass.attributes.$attribute.id" id="$lcfirstModelClass.attributes.$attribute.id"
    options="{$lcfirstModelClass}Crud.relations.$attribute.select2Options">
        <option value="{{{$lcfirstModelClass}.attributes.$attribute.id}}">{{{$lcfirstModelClass}.attributes.$attribute.item_label}}</option>
    </select2>
</div>
INPUT;

};

// Default input

$defaultInput = function ($attribute, $model) use ($textInput, $hasOneRelationSelect2Input) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    switch ($attributeInfo["type"]) {
        default:
            return <<<INPUT
<!-- "$attribute" TYPE {$attributeInfo["type"]} TODO -->
INPUT;
        case "primary-key":
            return <<<INPUT
<!-- "$attribute" TYPE {$attributeInfo["type"]} TODO -->
INPUT;
        case "ordinary":
            return $textInput($attribute, $model);
            break;
        case "has-one-relation":
            return $hasOneRelationSelect2Input($attribute, $model);
            break;
    }

};

// Handsontable column settings

$handsontableOrdinaryColumn = function ($attribute, $model) {
    $attribute = str_replace("handsontable-column-settings.", "", $attribute);
    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $attribute = str_replace("hot-column.", "", $attribute);
    $attributeInfo["label"] = json_encode($attributeInfo["label"]);
    return <<<INPUT
            {
                data: 'attributes.$attribute',
                title: {$attributeInfo["label"]},
            },
INPUT;
};

$handsontableCheckboxColumn = function ($attribute, $model) {
    $attribute = str_replace("handsontable-column-settings.", "", $attribute);
    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $attribute = str_replace("hot-column.", "", $attribute);
    $attributeInfo["label"] = json_encode($attributeInfo["label"]);
    return <<<INPUT
            {
                data: 'attributes.$attribute',
                title: {$attributeInfo["label"]},
                type: 'checkbox',
                checkedTemplate: true,
                uncheckedTemplate: false,
            },
INPUT;
};

$handsontablePrimaryKeyColumn = function ($attribute, $model) {
    $attribute = str_replace("handsontable-column-settings.", "", $attribute);
    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));
    $attribute = str_replace("hot-column.", "", $attribute);
    $attributeInfo["label"] = json_encode($attributeInfo["label"]);
    return <<<INPUT
            {
                data: 'attributes.$attribute',
                title: 'Delete',
                renderer: {$lcfirstModelClass}Crud.handsontable.deleteButtonRenderer,
                readOnly: true,
            },{
                data: 'attributes.$attribute',
                title: {$attributeInfo["label"]},
                readOnly: true,
            },{
                data: 'item_label',
                title: 'Summary',
                readOnly: true,
            },
INPUT;
};

$handsontableHasOneRelationColumn = function ($attribute, $model) {
    $attribute = str_replace("handsontable-column-settings.", "", $attribute);
    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));
    $attribute = str_replace("hot-column.", "", $attribute);
    $attributeInfo["label"] = json_encode($attributeInfo["label"]);
    return <<<INPUT
            {
                data: 'attributes.$attribute.id',
                title: {$attributeInfo["label"]},
                renderer: {$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.cellRenderer,
                editor: 'select2',
                select2Options: {$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.select2Options,
            },
INPUT;
};

$handsontableAutoDetectColumn = function ($attribute, $model) use (
    $handsontableOrdinaryColumn,
    $handsontableCheckboxColumn,
    $handsontablePrimaryKeyColumn,
    $handsontableHasOneRelationColumn
) {
    $attribute = str_replace("handsontable-column-settings.", "", $attribute);
    $itemTypeAttributes = $model->itemTypeAttributes();

    // Handle attributes that have no item type attribute information (ie for pure crud columns)
    if (!array_key_exists($attribute, $itemTypeAttributes)) {
        return <<<INPUT
            {
                data: 'attributes.$attribute',
                title: '$attribute',
            },
INPUT;
    }

    $attributeInfo = $itemTypeAttributes[$attribute];

    switch ($attributeInfo["type"]) {
        default:
            return <<<INPUT
            // "$attribute" TYPE {$attributeInfo["type"]} TODO
INPUT;
        case "internal":
            return <<<INPUT
            // "$attribute" TYPE {$attributeInfo["type"]}
INPUT;
            break;
        case "ordinary":
            return $handsontableOrdinaryColumn($attribute, $model);
        case "boolean":
            return $handsontableCheckboxColumn($attribute, $model);
        case "primary-key":
            return $handsontablePrimaryKeyColumn($attribute, $model);
        case "has-one-relation":
            return $handsontableHasOneRelationColumn($attribute, $model);
    }

};

// Handsontable inputs

/*
$handsontableOrdinaryColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);

    $itemTypeAttributes = $model->itemTypeAttributes();

    // Handle attributes that have no item type attribute information (ie for pure crud columns)
    if (!array_key_exists($attribute, $itemTypeAttributes)) {
            return <<<INPUT
    <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'crud'"></hot-column>
INPUT;
    }

    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    switch ($attributeInfo["type"]) {
        default:
            return <<<INPUT
        <!-- "$attribute" TYPE {$attributeInfo["type"]} TODO -->
INPUT;
        case "primary-key":
            return <<<INPUT
        <hot-column data="attributes.$attribute" title="'Delete'" attribute-type="'delete-button'" renderer="{$lcfirstModelClass}Crud.handsontable.deleteButtonRenderer" read-only></hot-column>
        <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'{$attributeInfo["type"]}'" read-only></hot-column>
        <hot-column data="item_label" title="'Label'" attribute-type="'{$attributeInfo["type"]}'" read-only></hot-column>
INPUT;
        case "ordinary":
            return <<<INPUT
        <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'{$attributeInfo["type"]}'"></hot-column>
INPUT;
            break;
        case "has-one-relation":
            return <<<INPUT
        <hot-column data="attributes.$attribute.id" title="'$attribute'" attribute-type="'has-one-relation'" renderer="{$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.cellRenderer" editor="'select2'" select2-options="{$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.select2Options"></hot-column>
INPUT;
            break;
    }

};

$handsontableCheckboxColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);
    return <<<INPUT
        <hot-column data="attributes.$attribute" title="'$attribute'" type="'checkbox'"
                checked-template="true" unchecked-template="false"></hot-column>
INPUT;
};
*/

$todo = function ($attribute, $model) {
    return "<!-- \"$attribute\" TODO -->";
};

// Mapping between attribute names and CRUD form input fields
$activeFields = [

    'handsontable-column-settings.*\.is_*' => $handsontableCheckboxColumn,
    'handsontable-column-settings.*\.*_enabled' => $handsontableCheckboxColumn,
    'handsontable-column-settings.*' => $handsontableAutoDetectColumn,
    '\.is_*' => $tristateRadioInput,
    '\.*_enabled' => $tristateRadioInput,
    'owner' => $todo,
    'node' => $todo,
    '.*' => $defaultInput,

];

// Mapping between attribute names and CRUD admin grid columns
$columnFormats = [];

// ---
// Applying the configuration to the dependency injection container
\Yii::$container->set(
// yii1_crud since re-using that generator's callback provider class
    'neam\gii2_workflow_ui_generators\yii1_crud\providers\CallbackProvider',
    [
        'activeFields' => $activeFields,
        'columnFormats' => $columnFormats
    ]
);
