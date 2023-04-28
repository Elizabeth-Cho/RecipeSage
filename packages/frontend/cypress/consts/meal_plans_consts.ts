// create a new meal plan
export const NEW_MEAL_PLAN = '#main-content > page-meal-plans > ion-content > ion-fab > ion-fab-button';
export const NEW_MEAL_PLAN_MODAL = 'ion-modal > page-new-meal-plan-modal';
export const NEW_MEAL_PLAN_TITLE_INPUT = 'ion-modal > page-new-meal-plan-modal > ion-content > ion-item > ion-input';
export const NEW_MEAL_PLAN_COLLAB_INPUT = 'ion-modal > page-new-meal-plan-modal > ion-content > select-collaborators > div > div > input';
export const CREATE_NEW_MEAL_PLAN = 'ion-modal > page-new-meal-plan-modal > ion-footer > ion-button';
export const CLOSE_NEW_MEAL_PLAN_MODAL = 'ion-modal > page-new-meal-plan-modal > ion-header > ion-toolbar > ion-buttons > ion-button';
export const MEAL_PLAN_TITLE = '#main-content > page-meal-plan > ion-header > ion-toolbar > ion-title';

// meal planner page
export const CALENDAR_DATE = '#main-content > page-meal-plan > ion-content > div > meal-calendar > div > div > ion-grid > ion-row:nth-child(6) > ion-col:nth-child(3)';
export const OTHER_CALENDAR_DATE = '#main-content > page-meal-plan > ion-content > div > meal-calendar > div > div > ion-grid > ion-row:nth-child(5) > ion-col:nth-child(6)';
export const ADD_MEAL_PLAN_ITEM = '#main-content > page-meal-plan > ion-content > ion-fab > ion-fab-button';
export const ADD_MEAL_PLAN_ITEM_MODAL = 'ion-modal > page-new-meal-plan-item-modal';
export const ADD_TO_MEAL_PLAN = 'ion-modal > page-new-meal-plan-item-modal > ion-footer > ion-button';
// export const CLOSE_ADD_MEAL_PLAN_MODAL = 'ion-modal > page-new-meal-plan-item-modal > ion-header > ion-toolbar > ion-buttons > ion-button';
export const CLOSE_ADD_MEAL_PLAN_ITEM_MODAL = 'ion-modal > page-new-meal-plan-item-modal > ion-header > ion-toolbar > ion-buttons > ion-button';

export const CHOOSE_RECIPE_TAB = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(1) > ion-segment > ion-segment-button.md.in-segment.segment-button-checked.segment-button-layout-icon-top.ion-activatable.ion-activatable-instant.ion-focusable.hydrated';
export const RECIPE_SEARCH = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(2) > div > select-recipe > div > div > ion-searchbar > div > input';
export const RECIPE_SEARCH_FIRST_RESULT = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(2) > div > select-recipe > div > div > div > button > ion-item';
export const SELECT_MEAL = 'ion-modal > page-new-meal-plan-item-modal > ion-content > select-meal';
export const SELECT_MEAL_ALERT = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md';
export const SELECT_BREAKFAST = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-radio-group.sc-ion-alert-md > button:nth-child(1)';
export const SELECT_LUNCH = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-radio-group.sc-ion-alert-md > button:nth-child(2)';
export const SELECT_DINNER = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-radio-group.sc-ion-alert-md > button:nth-child(3)';
export const SELECT_SNACK = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-radio-group.sc-ion-alert-md > button:nth-child(4)';
export const SELECT_OTHER = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-radio-group.sc-ion-alert-md > button:nth-child(5)';
export const SELECT_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const SELECT_OK = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(2)';

// edit item
export const ITEM_SHOPPING_LIST = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(3)';
export const ITEM_PIN = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(4)';
export const ITEM_EDIT = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(5)'
export const ITEM_DUPLICATE = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(6)'
export const ITEM_DELETE =  'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item.item-has-start-slot.item.md.item-lines-default.item-fill-none.ion-activatable.ion-focusable.hydrated.item-label.item-label-color.ion-color-danger'
export const ITEM_CLOSE = 'ion-modal > page-meal-plan-item-details-modal > ion-footer > ion-button';
export const ITEM_CLOSE_X = 'ion-modal > page-meal-plan-item-details-modal > ion-header > ion-toolbar > ion-buttons > ion-button';

export const MANUAL_ENTRY_TAB = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(1) > ion-segment > ion-segment-button.md.in-segment.segment-button-layout-icon-top.ion-activatable.ion-activatable-instant.ion-focusable.hydrated.segment-button-after-checked';
export const ITEM_TITLE = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(2) > div > ion-item > ion-input > input';
export const CHANGE_DATE = 'ion-modal > page-new-meal-plan-item-modal > ion-content > ion-item > input';
export const SAVE_CHANGES = 'ion-modal > page-new-meal-plan-item-modal > ion-footer > ion-button';
export const MANUAL_EDIT = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(3)';
export const MANUAL_DUPLICATE = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item:nth-child(4)';
export const MANUAL_DELETE = 'ion-modal > page-meal-plan-item-details-modal > ion-content > ion-item.item-has-start-slot.item.md.item-lines-default.item-fill-none.ion-activatable.ion-focusable.hydrated.item-label.item-label-color.ion-color-danger';
export const ITEM_DELETE_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alertDanger.sc-ion-alert-md';
export const ITEM_DELETE_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const CHANGE_RECIPE = 'ion-modal > page-new-meal-plan-item-modal > ion-content > div:nth-child(2) > div > select-recipe > div > ion-item';
export const CEREAL_ITEM = '#main-content > page-meal-plan > ion-content > div > meal-calendar > div > div > ion-grid > ion-row:nth-child(6) > ion-col.day.md.hydrated.highlighted > div:nth-child(2) > meal-group > div:nth-child(1) > calendar-item';

// options
export const OPTIONS = '#main-content > page-meal-plan > ion-header > ion-toolbar > ion-buttons.buttons-last-slot.sc-ion-buttons-md-h.sc-ion-buttons-md-s.md.hydrated > ion-button';
export const DELETE_MEAL_PLAN = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(11)';
export const DELETE_SELECTED_DAYS = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(9)';
export const MOVE_SELECTED_DAYS = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(8)';
export const COPY_SELECTED_DAYS = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(7)';
export const ADD_TO_SHOPPING_LIST = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(6)';
export const PIN_OPEN = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(5)';
export const SHARE = 'ion-popover > page-meal-plan-popover > ion-list > ion-button:nth-child(4)';
export const START_WEEK_ON = 'ion-popover > page-meal-plan-popover > ion-list > ion-item';

export const DELETE_PLAN_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const DELETE_PLAN_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alertDanger.sc-ion-alert-md';

export const DELETE_DAY_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const DELETE_DAY_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alertDanger.sc-ion-alert-md';

export const PIN_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button';

export const MOVE_ALL_TO_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const MOVE_ALL_TO_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(2)';
export const MOVE_ALL_SELECT_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const MOVE_ALL_SELECT_ANOTHER = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button:nth-child(2)';
export const MOVE_ALL_SELECT_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button:nth-child(3)';

export const COPY_ALL_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const COPY_ALL_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(2)';
export const COPY_ALL_SELECT_CANCEL = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button.alert-button.ion-focusable.ion-activatable.alert-button-role-cancel.sc-ion-alert-md';
export const COPY_ALL_SELECT_ANOTHER = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button:nth-child(2)';
export const COPY_ALL_SELECT_CONFIRM = 'ion-alert > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.alert-button-group-vertical.sc-ion-alert-md > button:nth-child(3)';