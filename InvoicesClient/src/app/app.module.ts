import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesInspectComponent } from './components/invoices-inspect/invoices-inspect.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { invoicesReducer } from './store/invoice/invoices.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesListComponent,
    InvoicesInspectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   	HttpClientModule,
    StoreModule.forRoot({invoices: invoicesReducer} 
    ),
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
