import { NgModule } from '@angular/core';
import {LoginComponent} from './components/pages/login/login.component';
import {CategoryListComponent} from './components/pages/category/category-list/category-list.component';
import {AuthGuard} from './guards/auth.guard';
import {ProductCategoryListComponent} from './components/pages/product-category/product-category-list/product-category-list.component';
import {ProductListComponent} from './components/pages/product/product-list/product-list.component';
import {RouterModule} from '@angular/router';

const routes = [
    {path: 'login', component: LoginComponent},
    {path: 'categories/list', component: CategoryListComponent, canActivate: [AuthGuard]},
    {path: 'products/:product/categories/list', component: ProductCategoryListComponent, canActivate: [AuthGuard]},
    {path: 'products/list', component: ProductListComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ],
  imports: [
      RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
