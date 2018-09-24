import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListService } from '../services/shopping-list';
import { RecipesService } from '../services/recipes';
import { AuthService } from '../services/auth';
import { EditRecipePageModule } from '../pages/edit-recipe/edit-recipe.module';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { RecipePageModule } from '../pages/recipe/recipe.module';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { DatabaseOptionsPageModule } from '../pages/database-options/database-options.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EditRecipePageModule,
    RecipesPageModule,
    RecipePageModule,
    ShoppingListPageModule,
    TabsPageModule,
    SigninPageModule,
    SignupPageModule,
    DatabaseOptionsPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
