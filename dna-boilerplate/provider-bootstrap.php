<?php

use yii\helpers\Inflector;
use yii\helpers\Html;

// Config

$recursionLevelLimit = 2;

// Angular UI Giiant `CallbackProvider` configuration
// -------------------------

// Input wrapper
// TODO

// Text input

$textInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    // Sanitize
    $label = Html::encode($attributeInfo["label"]);
    $hint = htmlspecialchars($attributeInfo["hint"]);

    // Include hint markup if hint is not empty
    $hintMarkup =<<<HINT
<span class="badge badge-primary adoveo-badge" tooltip-placement="right" data-tooltip-html-unsafe="$hint">?</span>
HINT;
    $hintMarkup = !empty($hint) ? $hintMarkup : "";

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label for="$lcfirstModelClass.attributes.$attribute" class="label-left control-label">{$label}</label> $hintMarkup
    </div>
    <div class="col-sm-10">
        <input type="text" ng-model="$lcfirstModelClass.attributes.$attribute" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute" class="form-control m-b" />
    </div>
</div>

INPUT;

};

// Textarea input

$textAreaInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    // Sanitize
    $label = Html::encode($attributeInfo["label"]);
    $hint = htmlspecialchars($attributeInfo["hint"]);

    // Include hint markup if hint is not empty
    $hintMarkup =<<<HINT
<span class="badge badge-primary adoveo-badge" tooltip-placement="right" data-tooltip-html-unsafe="$hint">?</span>
HINT;
    $hintMarkup = !empty($hint) ? $hintMarkup : "";

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label for="$lcfirstModelClass.attributes.$attribute" class="label-left control-label">{$label}</label> $hintMarkup
    </div>
    <div class="col-sm-10">
        <textarea ng-model="$lcfirstModelClass.attributes.$attribute" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute" class="form-control m-b"></textarea>
    </div>
</div>

INPUT;

};

// File selection widget

$fileSelectionWidget = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label for="$lcfirstModelClass.attributes.$attribute" class="label-left control-label">{$attributeInfo["label"]}</label>
    </div>
    <div class="col-sm-10">
        <dna-file-selection-widget preview-height-pixels="dnaFileSelectionWidgetPreviewHeightPixels" file="$lcfirstModelClass.attributes.$attribute" ng-model="$lcfirstModelClass.attributes.$attribute.id" name="$lcfirstModelClass.attributes.$attribute" id="$lcfirstModelClass.attributes.$attribute"></dna-file-selection-widget>
    </div>
</div>

INPUT;

};

// "Boolean" tri-state (0,1,NULL) radio inputs

$tristateRadioInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label class="label-left control-label">{$attributeInfo["label"]}</label>
    </div>
    <div class="col-sm-10">
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
</div>

INPUT;

};

// Boolean switch input

$switchInput = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label class="label-left control-label">{$attributeInfo["label"]}</label>
    </div>
    <div class="col-sm-10">
        <label class="switch m-b">
            <input ng-model="$lcfirstModelClass.attributes.$attribute"
                 name="$lcfirstModelClass.attributes.$attribute"
                 id="$lcfirstModelClass.attributes.$attribute" type="checkbox" checked
                 name="activate" class="form-control m-b"><i></i>
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
<div class="row">
    <div class="col-sm-2">
        <label for="$lcfirstModelClass.attributes.$attribute.id" class="label-left control-label">{$attributeInfo["label"]}</label>
    </div>
    <div class="col-sm-10">
        <div class="select2 m-b">
            <select2 empty-to-null ng-model="$lcfirstModelClass.attributes.$attribute.id" name="$lcfirstModelClass.attributes.$attribute.id" id="$lcfirstModelClass.attributes.$attribute.id"
            options="{$lcfirstModelClass}Crud.relations.$attribute.select2Options">
                <option value="{{{$lcfirstModelClass}.attributes.$attribute.id}}">{{{$lcfirstModelClass}.attributes.$attribute.item_label}}</option>
            </select2>
        </div>
    </div>
</div>

INPUT;

};

// Has-many-relation editing

$hasManyRelationEditing = function ($attribute, $model) {

    $itemTypeAttributes = $model->itemTypeAttributes();
    $attributeInfo = $itemTypeAttributes[$attribute];
    $lcfirstModelClass = lcfirst(get_class($model));

    $_ = explode("RelatedBy", $attribute);
    $relationAttribute = $_[0];
    $relations = $model->relations();
    if (!isset($relations[$relationAttribute])) {
        $class = get_class($model);
        return <<<INPUT
<!-- "$attribute" - Model $class does not have a relation '$relationAttribute' -->

INPUT;
        //throw new Exception("Model " . get_class($model) . " does not have a relation '$relationAttribute'");
    }
    $relationInfo = $relations[$relationAttribute];
    $relatedModelClass = $relationInfo[1];

    $relatedModelClassSingular = $relatedModelClass;
    $relatedModelClassSingularId = Inflector::camel2id($relatedModelClassSingular);
    $relatedModelClassSingularWords = Inflector::camel2words($relatedModelClassSingular);
    $relatedModelClassPluralWords = Inflector::pluralize($relatedModelClassSingularWords);
    $relatedModelClassPlural = Inflector::camelize($relatedModelClassPluralWords);

    return <<<INPUT
<div class="row">
    <div class="col-sm-2">
        <label class="label-left control-label">{$attributeInfo["label"]}</label>
    </div>
    <div class="col-sm-10">
        <div ng-include="'crud/$relatedModelClassSingularId/compact-list.html'"></div>
    </div>
</div>

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
                renderer: handsontable.deleteButtonRenderer,
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
                renderer: handsontable.columnLogic.$attribute.cellRenderer,
                editor: 'select2',
                select2Options: handsontable.columnLogic.$attribute.select2Options,
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
    $modelClassLcfirstPlural = lcfirst($modelClassPlural);
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
        $setRouteBasedContentFiltersLevelResolveLine = "setRouteBasedContentFiltersLevel{$recursionLevel}: function (routeBasedContentFilters, \$stateParams) {";
    } else {
        $parentRecursionLevel = $recursionLevel - 1;
        $setRouteBasedContentFiltersLevelResolveLine = "setRouteBasedContentFiltersLevel{$recursionLevel}: function (setRouteBasedContentFiltersLevel{$parentRecursionLevel}, routeBasedContentFilters, \$stateParams) {";
    }
    if ($recursionLevel === 0) {
        $setRouteBasedVisibilitySettingsLevelResolveLine = "setRouteBasedVisibilitySettingsLevel{$recursionLevel}: function (routeBasedVisibilitySettings, \$stateParams) {";
    } else {
        $parentRecursionLevel = $recursionLevel - 1;
        $setRouteBasedVisibilitySettingsLevelResolveLine = "setRouteBasedVisibilitySettingsLevel{$recursionLevel}: function (setRouteBasedVisibilitySettingsLevel{$parentRecursionLevel}, routeBasedVisibilitySettings, \$stateParams) {";
    }

    /*
     * Overview of states:
     *  - item type root state
     *  - list
     *  - curate
     *  - curate step states
     *  - single item root state
     *  - edit
     *  - edit step and attribute states
     */

    $states = "";

    $states .= <<<STATES
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
                        controller: "list{$modelClassPlural}Controller",
                    }
                },
                data: {pageTitle: 'List {$labelPlural}'}
            })


STATES;

    $curateStepStates = <<<CURATESTEPSSTATESSTART
            .state('{$parentState}.{$modelClassPluralId}.curate', {
                abstract: true,
                url: "/curate",
                views: {
                    '@{$rootCrudState}': {
                        template: "<ui-view/>",
                        controller: "list{$modelClassPlural}Controller",
                    }
                },
                data: {pageTitle: 'Curate {$labelPlural}'}
            })


CURATESTEPSSTATESSTART;

    if (in_array($modelClassSingular, array_keys(\ItemTypes::where('is_workflow_item')))):
        $stepCaptions = $model->flowStepCaptions();

        $flowSteps = $model->flowSteps();
        $flowStepReferences = array_keys($flowSteps);
        $firstStepReference = reset($flowStepReferences);

        // Determine level of step
        $stepReference = $firstStepReference;
        $stepHierarchy = explode(".", $stepReference);
        $step = end($stepHierarchy);
        $stepCaption = !empty($stepCaptions[$step]) ? $stepCaptions[$step] : ucfirst($step);

        // Summarize metadata
        $stepMetadata = compact("stepReference", "step", "stepAttributes");

        // Json encode
        $jsonEncodedStepCaption = json_encode($stepCaption);
        $jsonEncodedStepMetadata = json_encode((object) $stepMetadata);

        $curateStepStates .= <<<STEPSTATESSTART
            // Add initial alias for "first-step" TODO: Refactor to have dynamic step logic in angular logic instead of repeated code
            .state('{$parentState}.{$modelClassPluralId}.curate.continue-editing', {
                url: "/continue-editing",
                data: {
                    pageTitle: 'Curate {$labelSingular} - Step \'{$stepReference}\'',
                    stepCaption: $jsonEncodedStepCaption,
                    stepMetadata: $jsonEncodedStepMetadata,
                },
                templateUrl: "crud/{$modelClassSingularId}/curate-steps/{$stepReference}.html",
                controller: "list{$modelClassPlural}Controller",
                resolve: {
                    {$setRouteBasedVisibilitySettingsLevelResolveLine}
                        routeBasedVisibilitySettings.{$modelClassSingular}_columns_by_step = '{$stepReference}';
                    },
                },
                data: {
                    stepCaption: 'Continue editing',
                    pageTitle: 'Curate {$labelSingular}'
                }
            })


STEPSTATESSTART;

        // Keep track of which states are already defined
        $defined = [];

        foreach ($flowSteps as $stepReference => $stepAttributes):

            // Determine level of step
            $stepHierarchy = explode(".", $stepReference);
            $step = end($stepHierarchy);
            $stepCaption = !empty($stepCaptions[$step]) ? $stepCaptions[$step] : ucfirst($step);

            // Summarize metadata
            $stepMetadata = compact("stepReference", "step", "stepAttributes");

            // Json encode
            $jsonEncodedStepCaption = json_encode($stepCaption);
            $jsonEncodedStepMetadata = json_encode((object) $stepMetadata);

            // Add necessary abstract states if the current step is a seb-step
            if (count($stepHierarchy) > 1) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.curate.{$stepHierarchy[0]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $curateStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[0]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            if (count($stepHierarchy) > 2) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.curate.{$stepHierarchy[0]}.{$stepHierarchy[1]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $curateStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[1]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            if (count($stepHierarchy) > 3) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.curate.{$stepHierarchy[0]}.{$stepHierarchy[1]}.{$stepHierarchy[2]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $curateStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[2]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            $curateStepStates .= <<<STEPSTATES
            // {$jsonEncodedStepCaption}
            .state('{$parentState}.{$modelClassPluralId}.curate.{$stepReference}', {
                url: "/{$step}",
                data: {
                    pageTitle: 'Curate {$labelSingular} - Step \'{$stepReference}\'',
                    stepCaption: $jsonEncodedStepCaption,
                    stepMetadata: $jsonEncodedStepMetadata,
                },
                templateUrl: "crud/{$modelClassSingularId}/curate-steps/{$stepReference}.html",
                controller: "list{$modelClassPlural}Controller",
                resolve: {
                    {$setRouteBasedVisibilitySettingsLevelResolveLine}
                        routeBasedVisibilitySettings.{$modelClassSingular}_columns_by_step = '{$stepReference}';
                    },
                }
            })


STEPSTATES;

        endforeach;

    else:

        // [not a workflow-item]

    endif;

    $states .= $curateStepStates;

    $states .= <<<STATES

            .state('{$parentState}.{$modelClassPluralId}.create', {
                url: "/new",
                templateUrl: "crud/{$modelClassSingularId}/form.html",
                data: {pageTitle: 'New {$labelSingular}'}
            })

            .state('{$parentState}.{$modelClassPluralId}.existing', {
                abstract: true,
                url: "/:{$modelClassLcfirstSingular}Id",
                resolve: {
                    {$setRouteBasedContentFiltersLevelResolveLine}
                        // TODO: Generate the following dynamically based on data model
                        routeBasedContentFilters.Bar_order = 'Foo.id DESC';
                        routeBasedContentFilters.Bar_foo_id = \$stateParams.fooId;
                    },
                    {$setRouteBasedVisibilitySettingsLevelResolveLine}
                        // TODO: Adjust the below so that columns that are all the same value due to a route-based filter are hidden
                        routeBasedVisibilitySettings.{$modelClassSingular}_hide_source_relation = '{$modelClassSingular}';
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


STATES;

    $editStepStates = <<<EDITSTEPSSTATESSTART

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


EDITSTEPSSTATESSTART;

    if (in_array($modelClassSingular, array_keys(\ItemTypes::where('is_workflow_item')))):
        $stepCaptions = $model->flowStepCaptions();

        $flowSteps = $model->flowSteps();
        $flowStepReferences = array_keys($flowSteps);
        $firstStepReference = reset($flowStepReferences);

        $editStepStates .= <<<STEPSTATESSTART
            // Add initial alias for "first-step" TODO: Refactor to have dynamic step logic in angular logic
            .state('{$parentState}.{$modelClassPluralId}.existing.edit.continue-editing', {
                url: "/continue-editing",
                templateUrl: "crud/{$modelClassSingularId}/steps/{$firstStepReference}.html",
                data: {pageTitle: 'Edit {$labelSingular}'}
            })


STEPSTATESSTART;

        // Keep track of which states are already defined
        $defined = [];

        foreach ($flowSteps as $stepReference => $stepAttributes):

            // Determine level of step
            $stepHierarchy = explode(".", $stepReference);
            $step = end($stepHierarchy);
            $stepCaption = !empty($stepCaptions[$step]) ? $stepCaptions[$step] : ucfirst($step);

            // Summarize metadata
            $stepMetadata = compact("stepReference", "step", "stepAttributes");

            // Json encode
            $jsonEncodedStepCaption = json_encode($stepCaption);
            $jsonEncodedStepMetadata = json_encode((object) $stepMetadata);

            // Add necessary abstract states if the current step is a seb-step
            if (count($stepHierarchy) > 1) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.existing.edit.{$stepHierarchy[0]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $editStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[0]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            if (count($stepHierarchy) > 2) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.existing.edit.{$stepHierarchy[0]}.{$stepHierarchy[1]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $editStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[1]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            if (count($stepHierarchy) > 3) {
                $fullStepReference = "{$parentState}.{$modelClassPluralId}.existing.edit.{$stepHierarchy[0]}.{$stepHierarchy[1]}.{$stepHierarchy[2]}";
                if (!in_array($fullStepReference, $defined)) {
                    $defined[] = $fullStepReference;
                    $editStepStates .= <<<STEPSTATES
            .state('{$fullStepReference}', {
                abstract: true,
                url: "/{$stepHierarchy[2]}",
                template: "<ui-view/>"
            })


STEPSTATES;
                }
            }

            $editStepStates .= <<<STEPSTATES
            // {$jsonEncodedStepCaption}
            .state('{$parentState}.{$modelClassPluralId}.existing.edit.{$stepReference}', {
                url: "/{$step}",
                templateUrl: "crud/{$modelClassSingularId}/steps/{$stepReference}.html",
                data: {
                    pageTitle: 'Edit {$labelSingular} - Step \'{$stepReference}\'',
                    stepCaption: $jsonEncodedStepCaption,
                    stepMetadata: $jsonEncodedStepMetadata,
                }
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
                $editStepStates .= $generator->prependActiveFieldForAttribute(
                    "ui-router-attribute-states." . $attribute,
                    $model,
                    $params
                );
                $editStepStates .= $generator->activeFieldForAttribute(
                    "ui-router-attribute-states." . $attribute,
                    $model,
                    $params
                );
                $editStepStates .= $generator->appendActiveFieldForAttribute(
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

    $states .= $editStepStates;

    return $states;

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

    $_ = explode("RelatedBy", $attribute);
    $relationAttribute = $_[0];
    $relations = $model->relations();
    if (!isset($relations[$relationAttribute])) {
        $class = get_class($model);
        return <<<INPUT
        // "$attribute" - Model $class does not have a relation '$relationAttribute'

INPUT;
        //throw new Exception("Model " . get_class($model) . " does not have a relation '$relationAttribute'");
    }
    $relationInfo = $relations[$relationAttribute];
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


STATE;
/*
            .state('{$parentState}.$attribute', {
                abstract: true,
                url: "/$attribute",
                template: "<ui-view/>"
            })
*/
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
    '\.is_*' => $switchInput,
    '\.*_enabled' => $switchInput,
    '\.*Media' => $fileSelectionWidget,
    '\.file' => $fileSelectionWidget,
    '\.*_message' => $textAreaInput,
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
