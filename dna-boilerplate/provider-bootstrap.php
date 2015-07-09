<?php

// Angular UI Giiant `CallbackProvider` configuration
// -------------------------

// Handsontable inputs

$handsontableOrdinaryColumn = function ($attribute, $model) {
    $attribute = str_replace("hot-column.", "", $attribute);
    return <<<INPUT
    <hot-column data="attributes.$attribute" title="'$attribute'"></hot-column>
INPUT;
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
    'neam\gii2_workflow_ui_generators\yii1_crud\providers\CallbackProvider', // yii1_crud since re-using that generator's callback provider class
    [
        'activeFields' => $activeFields,
        'columnFormats' => $columnFormats
    ]
);
