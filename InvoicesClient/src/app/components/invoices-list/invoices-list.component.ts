import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dictionary } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from 'src/app/app.state';
import { StatusPhase } from 'src/app/enums/statusPhase';
import IInvoicesData from 'src/app/interfaces/IInvoicesData';
import { InvoicesService } from 'src/app/services/invoices.service';
import { InvoiceLoadAll } from 'src/app/store/invoice/invoices.actions';
import {
  selectAllInvoices,
  selectInviceById,
} from 'src/app/store/invoice/invoices.selectors';
import { InvoicesInspectComponent } from '../invoices-inspect/invoices-inspect.component';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
})

// *******************************************************************************
// This component shows list of the record and always up (since there is no routing etc.)
// Fetching first for all the record  (no pagination) - the data is in mocked json file, that can be updated.
// *******************************************************************************
export class InvoicesListComponent implements OnInit {
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  // observable object that has the list for all the invoices.f
  invoices$: Observable<Dictionary<IInvoicesData>> = of();

  // constructor has dialog and connection to service (for update/add/select all options)
  // stor - for ngrx store methodology.
  constructor(
    private dialog: MatDialog,
    private invoicesService: InvoicesService,
    private store: Store<AppState>
  ) {}

  // first ng-init.
  // load all the invoice.
  // the dispatch for communicate (only for first time) to all the new invoices.
  ngOnInit(): void {
    this.invoicesService.getData().subscribe((data: IInvoicesData[]) => {
      this.store.dispatch(new InvoiceLoadAll(data));
    });
    this.invoices$ = this.store.select(selectAllInvoices);
  }

  // open inspection dialog (update or add new invoice)
  openInvoiceInspectDlg(id: string | undefined) {
    if (id !== undefined) {
      this.store
        .pipe(select(selectInviceById(id)))
        .subscribe((currentData: IInvoicesData | undefined) => {
          const invoicesInspectDialog = this.dialog.open(
            InvoicesInspectComponent,
            { data: currentData }
          );
          invoicesInspectDialog.afterClosed().subscribe((res) => {});
        });
    }
  }

  // convert num to the string (pretty represention on the html file)
  statusToEnum(status?: StatusPhase) {
    if (status != null) return StatusPhase[status];
    else return '';
  }
}
