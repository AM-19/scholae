import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { UploadBookContainerComponent } from './upload-book-container/upload-book-container.component';
import { HomeComponent } from './home/home.component';
import { CanactivateguardService } from './services/canactivateguard.service';
import { ReadBookComponent } from './read-book/read-book.component';
import { BookCardComponent } from './book-card/book-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { BookContainerComponent } from './book-container/book-container.component';


const routes: Routes = [
  { path: 'readbook/:bookUrl/:bookTitle', component: ReadBookComponent },
  { path: 'upload', component: UploadBookContainerComponent },
  { path: '', component: HomeComponent },
  {
    path: 'dashboard', component: SideNavBarComponent,
    //  canActivate: [CanactivateguardService],
    children: [{ path: 'upload', component: UploadBookContainerComponent },
    // { path: '', component: BookCardComponent },
    { path: 'userprofile', component: UserProfileComponent },
    { path: '', component: BookContainerComponent }]
  },
  { path: 'books', component: BookCardComponent },
  { path: 'filter', component: BookFilterComponent },

];

export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
