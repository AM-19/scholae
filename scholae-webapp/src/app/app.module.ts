import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatButtonToggleModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { CommonToolbarComponent } from './common-toolbar/common-toolbar.component';
import { DndDirective } from '../dnd.directive';
import { MatSelectModule } from '@angular/material';
import { ProgressComponent } from './progress/progress.component';
import { UploadBookContainerComponent } from './upload-book-container/upload-book-container.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReadBookComponent } from './read-book/read-book.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BookCardComponent } from './book-card/book-card.component';
import { AvatarModule } from 'ngx-avatar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LimitPipe } from './limit.pipe';
import { MdePopoverModule } from '@material-extended/mde';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookContainerComponent } from './book-container/book-container.component';
import { CardComponent } from './card/card.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavBarComponent,
    CommonToolbarComponent,
    UploadBookContainerComponent,
    ProgressComponent,
    DndDirective,
    DialogBoxComponent,
    ReadBookComponent,
    BookCardComponent,
    LimitPipe,
    UserProfileComponent,
    BookFilterComponent,
    AddNoteDialogComponent,
    BookContainerComponent,
    CardComponent
  ],
  entryComponents: [
    DialogBoxComponent,
    AddNoteDialogComponent
  ],
  imports: [
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSidenavModule,
    HttpClientModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    NgbModule,
    MdePopoverModule,
    MatExpansionModule,
    PdfViewerModule,
    MatMenuModule,
    AvatarModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],

  providers: [],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
