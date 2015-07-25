<?php

// Angular UI Giiant `CallbackProvider` configuration
// -------------------------

// Handsontable inputs

$handsontableOrdinaryColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];

    switch ($attributeInfo["type"]) {
        default:
            return "    <!-- \"$attribute\" TYPE {$attributeInfo["type"]} TODO -->";
            break;
        case "primary-key":
        case "ordinary":
            return <<<INPUT
    <hot-column data="attributes.$attribute" title="'$attribute'" attribute-type="'{$attributeInfo["type"]}'"></hot-column>
INPUT;
            break;
        case "has-one-relation":
            $lcfirstModelClass = lcfirst(get_class($model));
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
    return "<!-- \"$attribute TODO \" -->";
};

// Mapping between attribute names and CRUD form input fields
$activeFields = [

    'hot-column.*.is_*' => $handsontableCheckboxColumn,
    'hot-column.*' => $handsontableOrdinaryColumn,
    '.*' => $todo,

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
