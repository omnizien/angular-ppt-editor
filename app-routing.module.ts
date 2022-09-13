import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './giphy-search/pages/dashboard-page/dashboard-page.component';
import { SearchPageComponent } from './giphy-search/pages/search-page/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
// import { SearchPageComponent } from './pages/search-page/search-page/search-page.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: DashboardPageComponent
//   },
//   {
//     path: 'search',
//     component: SearchPageComponent
//   },
//   {
//     path: '**',
//     redirectTo: '/'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
