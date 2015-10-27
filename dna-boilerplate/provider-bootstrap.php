<?php

use yii\helpers\Inflector;

// Config

$recursionLevelLimit = 2;

// Angular UI Giiant `CallbackProvider` configuration
// -------------------------

// Text input

$textInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div class="col-sm-2">
    <label for="$lcfirstModelClass.attributes.$attribute">{$attributeInfo["label"]}</label>
</div>
<div class="col-sm-10">
    <input type="text" ng-model="$lcfirstModelClass.attributes.$attribute" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute" class="form-control m-b" />
</div>

INPUT;

};

// File selection widget

$fileSelectionWidget = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div class="col-sm-2">
    <label for="$lcfirstModelClass.attributes.$attribute">{$attributeInfo["label"]}</label>
</div>
<div class="col-sm-10">
    <dna-file-selection-widget ng-model="$lcfirstModelClass.attributes.$attribute.id" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute" class="form-control m-b"></dna-file-selection-widget>
</div>

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

// Has-many-relation editing

$hasManyRelationEditing = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    $relations = $model->relations();
    if (!isset($relations[$attribute])) {
        throw new Exception("Model " . get_class($model) . " does not have a relation '$attribute'");
    }
    $relationInfo = $relations[$attribute];
    $relatedModelClass = $relationInfo[1];

    $relatedModelClassSingular = $relatedModelClass;
    $relatedModelClassSingularId = Inflector::camel2id($relatedModelClassSingular);
    $relatedModelClassSingularWords = Inflector::camel2words($relatedModelClassSingular);
    $relatedModelClassPluralWords = Inflector::pluralize($relatedModelClassSingularWords);
    $relatedModelClassPlural = Inflector::camelize($relatedModelClassPluralWords);

    return <<<INPUT
<label>{$attributeInfo["label"]}</label>
<div ng-include="'crud/$relatedModelClassSingularId/list.html'"></div>
INPUT;

    // <div ng-controller="list{$relatedModelClassPlural}Controller" ng-include="'crud/$relatedModelClassSingularId/curate.html'"></div>

};

// Default input

$defaultInput = function ($attribute, $model) use ($textInput, $hasOneRelationSelect2Input, $hasManyRelationEditing) {

    $itemTypeAttributes = $model->itemTypeAttributes();

    // Handle attributes that have no item type attribute information (ie for pure crud columns)
    if (!array_key_exists($attribute, $itemTypeAttributes)) {
        return <<<INPUT
<!-- "$attribute" NO MATCHING ITEM TYPE ATTRIBUTE -->
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
<!-- "$attribute" TYPE {$attributeInfo["type"]} TODO -->
INPUT;
        case "ordinary":
            return $textInput($attribute, $model);
            break;
        case "has-one-relation":
            return $hasOneRelationSelect2Input($attribute, $model);
            break;
        case "has-many-relation":
            return $hasManyRelationEditing($attribute, $model);
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

// $uiRouterItemTypeStates

$uiRouterItemTypeStates = [];

$uiRouterItemTypeStates['item-type-template'] = function ($attribute, $model, $params) use ($recursionLevelLimit) {

    $step = $params["step"];
    $stepReference = $params["stepReference"];
    $parentState = $params["parentState"];
    $rootCrudState = $params["rootCrudState"];
    $recursionLevel = $params["recursionLevel"];
    $generator = $params["generator"];

    if ($recursionLevel >= $recursionLevelLimit) {

        // Prevent infinite loops and giant state trees
        return '        // Recursion limit reached';

    }

    $modelClass = get_class($model);

    $modelClassSingular = $modelClass;
    $modelClassLcfirstSingular = lcfirst($modelClassSingular);
    $modelClassSingularId = Inflector::camel2id($modelClassSingular);
    $modelClassSingularWords = Inflector::camel2words($modelClassSingular);
    $modelClassPluralWords = Inflector::pluralize($modelClassSingularWords);
    $modelClassPlural = Inflector::camelize($modelClassPluralWords);
    $modelClassPluralId = Inflector::camel2id($modelClassPlural);
    $labelSingular = ItemTypes::label($modelClassSingular, 1);
    $labelPlural = ItemTypes::label($modelClassSingular, 2);
    $labelNone = ItemTypes::label($modelClassSingular, 2);

    // TODO: handle prefixes through config
    $unprefixedModelClassSingular = str_replace(["Clerk", "Neamtime"], "", $modelClassSingular);
    $unprefixedModelClassLcfirstSingular = lcfirst($unprefixedModelClassSingular);
    $unprefixedModelClassSingularId = Inflector::camel2id($unprefixedModelClassSingular);
    $unprefixedModelClassSingularWords = Inflector::camel2words($unprefixedModelClassSingular);
    $unprefixedModelClassPluralWords = Inflector::pluralize($unprefixedModelClassSingularWords);
    $unprefixedModelClassPlural = Inflector::camelize($unprefixedModelClassPluralWords);
    $unprefixedModelClassPluralId = Inflector::camel2id($unprefixedModelClassPlural);

    // TODO: fix choiceformat interpretation in yii2 and use item type choiceformat label for labels instead of inflector-created labels
    $labelSingular = $unprefixedModelClassSingularWords;
    $labelPlural = $unprefixedModelClassPluralWords;

    // The state where the views for list, view and edit etc are defined the first state - necessary to keep track of in order to be able to reference their ui-views
    if (!$rootCrudState) {
        $rootCrudState = "$parentState.$modelClassPluralId";
    }

    // Route-based filter recursive resolve hack
    if ($recursionLevel === 0) {
        $setRouteBasedFiltersLevelResolveLine = "setRouteBasedFiltersLevel{$recursionLevel}: function (routeBasedFilters, \$stateParams) {";
    } else {
        $parentRecursionLevel = $recursionLevel - 1;
        $setRouteBasedFiltersLevelResolveLine = "setRouteBasedFiltersLevel{$recursionLevel}: function (setRouteBasedFiltersLevel{$parentRecursionLevel}, routeBasedFilters, \$stateParams) {";
    }

    $statesStart = <<<STATESSTART
            .state('{$parentState}.{$modelClassPluralId}', {
                abstract: true,
                url: "/{$unprefixedModelClassPluralId}",
                template: "<ui-view/>"
            })

            .state('{$parentState}.{$modelClassPluralId}.list', {
                url: "/list",
                views: {
                    '@{$rootCrudState}': {
                        templateUrl: "crud/{$modelClassSingularId}/list.html",
                    }
                },
                data: {pageTitle: 'List {$labelPlural}'}
            })

            .state('{$parentState}.{$modelClassPluralId}.create', {
                url: "/new",
                templateUrl: "crud/{$modelClassSingularId}/form.html",
                data: {pageTitle: 'New {$labelSingular}'}
            })

            .state('{$parentState}.{$modelClassPluralId}.existing', {
                abstract: true,
                url: "/:{$modelClassLcfirstSingular}Id",
                resolve: {
                    {$setRouteBasedFiltersLevelResolveLine}
                        // TODO: Generate the following dynamically based on data model
                        routeBasedFilters.Bar_order = 'Foo.id DESC';
                        routeBasedFilters.Bar_foo_id = \$stateParams.fooId;
                    },
                    {$modelClassLcfirstSingular}: function (apiEndpointParam, \$stateParams, {$modelClassLcfirstSingular}Resource) {

                        // Hot-load from singleton collection if already available
                        // TODO

                        var load = function (id) {
                            if (id) {
                                return {$modelClassLcfirstSingular}Resource.get({id: id});
                            } else {
                                return new {$modelClassLcfirstSingular}Resource({$modelClassLcfirstSingular}Resource.dataSchema);
                            }
                        };

                        return load(\$stateParams.{$modelClassLcfirstSingular}Id);

                    }
                },
                template: "<ui-view/>"
            })

            /*
             .state('{$parentState}.{$modelClassPluralId}', {
             url: "/dashboard",
             templateUrl: "crud/{$modelClassSingularId}/dashboard.html",
             data: {pageTitle: '{$labelPlural} Dashboard'}
             })
             */

            .state('{$parentState}.{$modelClassPluralId}.existing.view', {
                url: "/view",
                views: {
                    '@{$rootCrudState}': {
                        controller: "edit{$modelClassSingular}Controller",
                        templateUrl: "crud/$modelClassSingularId/view.html",
                    }
                },
                data: {pageTitle: 'View {$labelSingular}'}
            })

            .state('{$parentState}.{$modelClassPluralId}.existing.edit', {
                abstract: true,
                url: "/edit",
                views: {
                    '@{$rootCrudState}': {
                        controller: "edit{$modelClassSingular}Controller",
                        templateUrl: "crud/{$modelClassSingularId}/form.html"
                    },
                    'sidebar@root': {
                        templateUrl: "crud/{$modelClassSingularId}/navigation.html"
                    }
                },
                data: {
                    showSideMenu: true,
                    pageTitle: 'Edit {$labelSingular}'
                }
            })


STATESSTART;

    $stepStates = '';

    if (in_array($modelClassSingular, array_keys(\ItemTypes::where('is_workflow_item')))):
        $stepCaptions = $model->flowStepCaptions();

        $flowSteps = $model->flowSteps();
        $flowStepReferences = array_keys($flowSteps);
        $firstStepReference = reset($flowStepReferences);

        $stepStates = <<<STEPSTATESSTART
            // Add initial alias for "first-step" TODO: Refactor to have dynamic step logic in angular logic
            .state('{$parentState}.{$modelClassPluralId}.existing.edit.continue-editing', {
                url: "/continue-editing",
                templateUrl: "crud/{$modelClassSingularId}/steps/{$firstStepReference}.html",
                data: {pageTitle: 'Edit {$labelSingular}'}
            })


STEPSTATESSTART;

        foreach ($flowSteps as $stepReference => $stepAttributes):

            // Determine level of step
            $stepHierarchy = explode(".", $stepReference);
            $step = end($stepHierarchy);
            $jsonEncodedStepCaption = json_encode(!empty($stepCaptions[$step]) ? $stepCaptions[$step] : ucfirst($step));

            // Determine if there are sub-steps for the current steps
            // TODO

            $stepStates .= <<<STEPSTATES

            // {$jsonEncodedStepCaption}
            .state('{$parentState}.{$modelClassPluralId}.existing.edit.{$stepReference}', {
                url: "/{$step}",
                templateUrl: "crud/{$modelClassSingularId}/steps/{$stepReference}.html",
                data: {pageTitle: 'Edit {$labelSingular} - Step \'{$stepReference}\''}
            })

            .state('{$parentState}.{$modelClassPluralId}.existing.edit.$stepReference.attributes', {
                abstract: true,
                template: "<ui-view/>"
            })


STEPSTATES;


            foreach ($stepAttributes as $attribute):

                $params = [
                    "step" => $step,
                    "stepReference" => $stepReference,
                    "parentState" => "$parentState.$modelClassPluralId.existing.edit.$stepReference.attributes",
                    "rootCrudState" => $rootCrudState,
                    "recursionLevel" => $recursionLevel + 1,
                    "generator" => $generator,
                ];
                $stepStates .= $generator->prependActiveFieldForAttribute(
                    "ui-router-attribute-states." . $attribute,
                    $model,
                    $params
                );
                $stepStates .= $generator->activeFieldForAttribute(
                    "ui-router-attribute-states." . $attribute,
                    $model,
                    $params
                );
                $stepStates .= $generator->appendActiveFieldForAttribute(
                    "ui-router-attribute-states." . $attribute,
                    $model,
                    $params
                );

            endforeach;

            /*
                .state('{$parentState}.edit-modal', {
                    url: "/edit",
                    onEnter: function (\$modal) {

                        var open = function (template, size, params) {

                            var modalInstance = \$modal.open({
                                animation: true,
                                templateUrl: template,
                                controller: 'GeneralModalInstanceController',
                                size: size,
                                resolve: {
                                    modalParams: function () {
                                        return {};
                                    }
                                }
                            });

                            modalInstance.result.then(function (/*selectedItem* /) {
                                //\$scope.selected = selectedItem;
                            }, function () {
                                \$log.info('Modal dismissed at: ' + new Date());
                            });
                        };

                        open('crud/$relatedModelClassSingularId/modal.html', 'lg');

                    },
                })
             */

        endforeach;

    else:

        // [not a workflow-item]

    endif;

    return $statesStart . $stepStates;

};

// $uiRouterStepAttributeStates

$uiRouterStepAttributeStates = [];

$uiRouterStepAttributeStates['has-many-relation'] = function ($attribute, $model, $params) use ($uiRouterItemTypeStates
) {

    $attribute = str_replace("ui-router-attribute-states.", "", $attribute);

    $step = $params["step"];
    $stepReference = $params["stepReference"];
    $parentState = $params["parentState"];
    $recursionLevel = $params["recursionLevel"];
    $generator = $params["generator"];

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $modelClassSingular = get_class($model);
    $modelClassLcfirstSingular = lcfirst($modelClassSingular);

    $relations = $model->relations();
    if (!isset($relations[$attribute])) {
        throw new Exception("Model " . get_class($model) . " does not have a relation '$attribute'");
    }
    $relationInfo = $relations[$attribute];
    $relatedModelClass = $relationInfo[1];

    $relatedModel = $relatedModelClass::model();

    $relatedModelClassSingular = str_replace(["Clerk", "Neamtime"], "", $relatedModelClass);
    $relatedModelClassLcfirstSingular = lcfirst($relatedModelClassSingular);
    $relatedModelClassSingularId = Inflector::camel2id($relatedModelClassSingular);
    $relatedModelClassSingularWords = Inflector::camel2words($relatedModelClassSingular);
    $relatedModelClassPluralWords = Inflector::pluralize($relatedModelClassSingularWords);
    $relatedModelClassPlural = Inflector::camelize($relatedModelClassPluralWords);
    $relatedModelClassPluralId = Inflector::camel2id($relatedModelClassPlural);
    $relatedModelClassLcfirstPlural = lcfirst($relatedModelClassPlural);

    $stateStart = <<<STATESTART
        /**
         * START $modelClassSingular has-many-relation {$attributeInfo["label"]} editing functionality in step $parentState.$stepReference
         */

STATESTART;

    $relatedItemTypeStates = $uiRouterItemTypeStates['item-type-template']($attribute, $relatedModel, $params);

    $stateEnd = <<<STATEEND

        /**
         * END $modelClassSingular has-many-relation {$attributeInfo["label"]} editing functionality in step $parentState.$stepReference
         */


STATEEND;

    return $stateStart . $relatedItemTypeStates . $stateEnd;

};

// Default input

$uiRouterStepAttributeStates['default-ui-router-attribute-states'] = function ($attribute, $model, $params) use (
    $uiRouterStepAttributeStates
) {

    $attribute = str_replace("ui-router-attribute-states.", "", $attribute);

    $step = $params["step"];
    $stepReference = $params["stepReference"];
    $parentState = $params["parentState"];
    $recursionLevel = $params["recursionLevel"];
    $generator = $params["generator"];

    $itemTypeAttributes = $model->itemTypeAttributes();

    // Handle attributes that have no item type attribute information (ie for pure crud columns)
    if (!array_key_exists($attribute, $itemTypeAttributes)) {
        return <<<STATE
            // "$attribute" NO MATCHING ITEM TYPE ATTRIBUTE
STATE;
    }

    $attributeInfo = $itemTypeAttributes[$attribute];

    switch ($attributeInfo["type"]) {
        default:
        case "primary-key":
        case "ordinary":
        case "has-one-relation":
            return <<<STATE
            // "$attribute" TYPE {$attributeInfo["type"]} TODO scrollto/mark -->
            .state('{$parentState}.$attribute', {
                abstract: true,
                url: "/$attribute",
                template: "<ui-view/>"
            })


STATE;
        case "has-many-relation":
            return $uiRouterStepAttributeStates['has-many-relation']($attribute, $model, $params);
            break;
    }

};

$todo = function ($attribute, $model) {
    return "<!-- \"$attribute\" TODO -->";
};

// Mapping between attribute names and CRUD form input fields
$activeFields = [

    'handsontable-column-settings.*\.is_*' => $handsontableCheckboxColumn,
    'handsontable-column-settings.*\.*_enabled' => $handsontableCheckboxColumn,
    'handsontable-column-settings.*' => $handsontableAutoDetectColumn,
    'ui-router-attribute-states.*' => $uiRouterStepAttributeStates['default-ui-router-attribute-states'],
    'ui-router-item-type-states.*' => $uiRouterItemTypeStates['item-type-template'],
    '\.is_*' => $tristateRadioInput,
    '\.*_enabled' => $tristateRadioInput,
    '\.*Media' => $fileSelectionWidget,
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
