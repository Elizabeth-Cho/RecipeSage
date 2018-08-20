import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { RecipeServiceProvider } from '../../../providers/recipe-service/recipe-service';
import { LoadingServiceProvider } from '../../../providers/loading-service/loading-service';

@IonicPage({
  priority: 'low'
})
@Component({
  selector: 'page-new-shopping-list-item-modal',
  templateUrl: 'new-shopping-list-item-modal.html',
})
export class NewShoppingListItemModalPage {

  inputType: string = 'items';

  itemFields: any = [{}];

  searchWorker: any;
  searchText: string = '';
  searching: boolean = false;

  selectedRecipe: any;

  recipes: any = [];
  ingredientBinders: any = {};
  showAutocomplete: boolean = false;
  autocompleteSelectionIdx: number = -1;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public recipeService: RecipeServiceProvider,
    public loadingService: LoadingServiceProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {
    var loading = this.loadingService.start();

    this.loadRecipes().then(function () {
      loading.dismiss();
    }, function () {
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewShoppingListItemModalPage');
  }

  loadRecipes() {
    var me = this;

    return new Promise(function (resolve, reject) {
      me.recipeService.fetch({
        folder: 'main',
        sortBy: 'title',
      }).subscribe(function (response) {

        if (me.searchWorker) me.searchWorker.terminate();
        me.searchWorker = new Worker('assets/src/search-worker.js');

        me.searchWorker.postMessage(JSON.stringify({
          op: 'init',
          data: response
        }));

        me.searchWorker.onmessage = function (e) {
          me.searching = false;
          var message = JSON.parse(e.data);
          if (message.op === 'results') {
            me.recipes = message.data;
          }
        }

        me.recipes = response;

        resolve();
      }, function (err) {
        reject();

        switch (err.status) {
          case 0:
            let offlineToast = me.toastCtrl.create({
              message: 'It looks like you\'re offline. While offline, we\'re only able to fetch data you\'ve previously accessed on this device.',
              duration: 5000
            });
            offlineToast.present();
            break;
          case 401:
            me.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
            break;
          default:
            let errorToast = me.toastCtrl.create({
              message: 'An unexpected error occured. Please restart application.',
              duration: 30000
            });
            errorToast.present();
            break;
        }
      });
    });
  }

  onSearchInputChange() {
    this.search(this.searchText);
  }

  search(text) {
    if (!text) text = '';
    this.searchText = text;
    this.searchWorker.postMessage(JSON.stringify({
      op: 'search',
      data: text
    }));
    this.searching = true;
  }

  addOrRemoveTextFields() {
    if ((this.itemFields[this.itemFields.length - 1].title || '').length > 0) {
      this.itemFields.push({});
    }
  }

  toggleAutocomplete(show, event?) {
    if (event && event.relatedTarget) {
      if (event.relatedTarget.className.indexOf('suggestion') > -1) {
        return;
      }
    }
    this.showAutocomplete = show;
    this.autocompleteSelectionIdx = -1;
  }

  labelFieldKeyUp(event) {
    // Only listen for up or down arrow
    if (event.keyCode !== 38 && event.keyCode !== 40) return;

    // Get all suggestions (including click to create)
    var suggestions = document.getElementsByClassName('autocomplete')[0].children;

    // If result list size was reduced, do not overflow
    if (this.autocompleteSelectionIdx > suggestions.length - 1) this.autocompleteSelectionIdx = suggestions.length - 1;

    if (event.keyCode === 40 && this.autocompleteSelectionIdx < suggestions.length - 1) {
      // Arrow Down
      this.autocompleteSelectionIdx++;
    } else if (event.keyCode === 38 && this.autocompleteSelectionIdx >= 0) {
      // Arrow Up
      this.autocompleteSelectionIdx--;
    }

    if (this.autocompleteSelectionIdx === -1) {
      (document.getElementById('labelInputField') as HTMLElement).focus();
    } else {
      (suggestions[this.autocompleteSelectionIdx] as HTMLElement).focus();
    }
  }

  selectRecipe(recipe) {
    this.searchText = '';
    this.toggleAutocomplete(false);

    var me = this;
    this.recipeService.fetchById(recipe._id).subscribe(function (response) {
      me.selectedRecipe = response;
      me.ingredientBinders = {};

      if (me.selectedRecipe.ingredients) {
        me.selectedRecipe.ingredients = me.selectedRecipe.ingredients.match(/[^\r\n]+/g);

        for (var i = 0; i < me.selectedRecipe.ingredients.length; i++) {
          me.ingredientBinders[i] = true;
        }
      }
    }, function (err) {
      switch (err.status) {
        case 0:
          let offlineToast = me.toastCtrl.create({
            message: 'It looks like you\'re offline. While offline, we\'re only able to fetch data you\'ve previously accessed on this device.',
            duration: 5000
          });
          offlineToast.present();
          break;
        case 401:
          me.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
          break;
        default:
          let errorToast = me.toastCtrl.create({
            message: 'An unexpected error occured. Please restart application.',
            duration: 30000
          });
          errorToast.present();
          break;
      }
    });
  }

  isFormValid() {
    if (this.inputType === 'recipe' && this.selectedRecipe && this.selectedRecipe._id) {
      for (var key in this.ingredientBinders) {
        if (this.ingredientBinders.hasOwnProperty(key) && this.ingredientBinders[key]) return true;
      }
    }
    if (this.inputType === 'items') {
      for (var i = 0; i < this.itemFields.length; i++) {
        if (this.itemFields[i].title) return true;
      }
    }
    return false;
  }

  save() {
    var items;
    if (this.inputType === 'recipe') {
      items = [];
      for (var i = 0; i < this.selectedRecipe.ingredients.length; i++) {
        if (this.ingredientBinders[i]) {
          items.push({
            title: this.selectedRecipe.ingredients[i],
            recipe: this.selectedRecipe._id
          });
        }
      }
    } else {
      // Redundant for now. Kept for sterilization
      items = this.itemFields.filter(function(e){
        return (e.title || '').length > 0;
      }).map(function(e) {
        return {
          title: e.title
        };
      });
    }

    this.viewCtrl.dismiss({
      destination: false,
      items: items
    });
  }

  cancel() {
    this.viewCtrl.dismiss({
      destination: false
    });
  }
}