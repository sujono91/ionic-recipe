import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private popOverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  ionViewWillEnter () {
    this.loadItems();
  }

  onAddItem (form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems () {
    this.listItems = this.slService.getItems();
  }

  private handleError (message: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message,
      buttons: ['Ok']
    });

    alert.present();
  }

  onCheckItem (index: number) {
    this.slService.removeItem(index);
    this.loadItems();
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
            this.slService.fetchList(token)
              .subscribe(
                (list: Ingredient[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
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
            this.slService.storeList(token)
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
}
