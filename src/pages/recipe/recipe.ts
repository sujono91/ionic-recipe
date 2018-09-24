import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { ShoppingListService } from '../../services/shopping-list';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private recipesService: RecipesService
  ) { }

  ionViewDidLoad () {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit () {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients () {
    this.slService.addItems(this.recipe.ingredients);
  }

  onEditRecipe () {
    this.navCtrl.push(EditRecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    });
  }

  onDeleteRecipe () {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
