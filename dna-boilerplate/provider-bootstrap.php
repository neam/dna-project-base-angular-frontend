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
    <select2 ng-model="$lcfirstModelClass.attributes.$attribute.id" name="$lcfirstModelClass.attributes.$attribute.id" id="$lcfirstModelClass.attributes.$attribute.id">
        <option value="" ng-selected="{{{$lcfirstModelClass}.attributes.$attribute.id === null}}">&lt;none&gt;</option>
        <option ng-repeat="itemOption in {$lcfirstModelClass}Crud.relations.$attribute.relatedCollection"
                value="{{itemOption.id}}"
                ng-selected="{{itemOption.id == $lcfirstModelClass.attributes.$attribute.id}}">
            {{itemOption.item_label}}
        </option>
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

// Handsontable inputs

$handsontableOrdinaryColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);

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
        <hot-column data="attributes.$attribute" title="'Delete'" attribute-type="'delete-button'" renderer="{$lcfirstModelClass}Crud.handsontable.deleteButtonRenderer" readOnly></hot-column>
        <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'{$attributeInfo["type"]}'" readOnly></hot-column>
        <hot-column data="item_label" title="'Label'" attribute-type="'{$attributeInfo["type"]}'" readOnly></hot-column>
INPUT;
        case "ordinary":
            return <<<INPUT
        <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'{$attributeInfo["type"]}'"></hot-column>
INPUT;
            break;
        case "has-one-relation":
            return <<<INPUT
        <hot-column data="attributes.$attribute.id" title="'$attribute'" attribute-type="'has-one-relation'" renderer="{$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.cellRenderer" editor="'select2'" select2Options="{$lcfirstModelClass}Crud.handsontable.columnLogic.$attribute.select2Options"></hot-column>
INPUT;
            break;
    }

};

$handsontableCheckboxColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);
    return <<<INPUT
        <hot-column data="attributes.$attribute" title="'$attribute'" type="'checkbox'"
                checkedTemplate="1" uncheckedTemplate="0"></hot-column>
INPUT;
};

$todo = function ($attribute, $model) {
    return "<!-- \"$attribute\" TODO -->";
};

// Mapping between attribute names and CRUD form input fields
$activeFields = [

    'hot-column.*\.is_*' => $handsontableCheckboxColumn,
    'hot-column.*\.*_enabled' => $handsontableCheckboxColumn,
    'hot-column.*' => $handsontableOrdinaryColumn,
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
