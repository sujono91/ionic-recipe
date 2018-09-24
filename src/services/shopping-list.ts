import { AuthService } from './auth';
import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  addItem (name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems (items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems () {
    return this.ingredients.slice();
  }

  removeItem (index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList (token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://ionic-b2e88.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token,
      this.ingredients);
  }

  fetchList (token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get('https://ionic-b2e88.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });
  }
}