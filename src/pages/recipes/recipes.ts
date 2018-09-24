import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  PopoverController
} from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { RecipesService } from '../../services/recipes';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popOverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private recipesService: RecipesService,
    private authService: AuthService) {
  }

  ionViewWillEnter () {
    this.recipes = this.recipesService.getRecipes();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe () {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

  onLoadRecipe (recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {
      recipe,
      index
    });
  }

  onShowOptions (ev: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popOverCtrl.create(DatabaseOptionsPage);
    popover.present({ ev });

    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }

      if (data.action === 'load') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.recipesService.fetchList(token)
              .subscribe(
                (list: Recipe[]) => {
                  loading.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              )
          });
      } else if (data.action === 'store') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.recipesService.storeList(token)
              .subscribe(
                () => {
                  loading.dismiss();
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              )
          });
      }
    })
  }

  private handleError (message: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message,
      buttons: ['Ok']
    });

    alert.present();
  }

}
