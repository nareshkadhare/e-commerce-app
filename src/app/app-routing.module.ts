import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'save-category/:action', component: CategoryFormComponent },
      { path: 'save-category/:action/:id', component: CategoryFormComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  LoginComponent,
  RegistrationComponent,
  PageNotFoundComponent,
  CategoriesComponent,
  ProductsComponent,
  OrdersComponent,
  AdminComponent,
  CategoryFormComponent
];
