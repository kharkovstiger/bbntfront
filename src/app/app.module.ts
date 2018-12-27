import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {HomeComponent, CountriesComponent, MainComponent, PlayersComponent, DialogOverviewExampleDialog, ChatComponent} from './components';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from "./components/profile";

@NgModule({
  declarations: [
    AppComponent, CountriesComponent, HomeComponent, MainComponent, ProfileComponent, PlayersComponent, DialogOverviewExampleDialog,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, NoopAnimationsModule,
    MatFormFieldModule, MatInputModule,
    FormsModule,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatSelectModule, MatOptionModule,
    MatCheckboxModule,
    MatTableModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent, DialogOverviewExampleDialog],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class AppModule { }
