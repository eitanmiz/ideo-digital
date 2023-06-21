import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import IInvoicesData from 'src/app/interfaces/IInvoicesData';
import { InvoicesService } from 'src/app/services/invoices.service';
import { InvoiceAdd, InvoiceUpdate } from 'src/app/store/invoice/invoices.actions';

// *******************************************************************************
// This component is dialog based (angular material) for both update and insert.
// Only the relevant data that should be update/inserted is enabled.
// *******************************************************************************
@Component({
  selector: 'app-invoices-inspect',
  templateUrl: './invoices-inspect.component.html',
  styleUrls: ['./invoices-inspect.component.scss']
})
export class InvoicesInspectComponent {
  // isUpdate - flag whether update (true) or insert (false)
  public isUpdate: boolean = false;
  
  // newData - the data should be copied due the origial is read-only.
  newData: IInvoicesData;

  // constuctor.
  // dialogRef - ref, so it can be opened as a dialog.
  // data - the data that is passed to the object.
  constructor(
    public dialogRef: MatDialogRef<InvoicesInspectComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IInvoicesData,
    private invoicesService: InvoicesService,
    private store: Store<AppState>
  ) { 
    this.newData = data;
  }

  ngOnInit(): void {
    // detect update - whether there is an Id already.
    this.isUpdate = this.data !== undefined && this.data.id > '';
    if (!this.isUpdate) { // when new invoice - the value are reseted.
      this.data = {
        id: '',
        amount: 0,
        status: 0,
        invoiceDate: new Date()
      }
    }
    this.newData = {...this.data};
  }

  // closeDialog - when closing the dialog by the relevant button (apply - make changes. close - w/o any changes)
  closeDialog(apply: number) {
    if (apply === 0) { 
      this.dialogRef.close(
        { event: 'close',  
          data: '' }
      );
    } else {
      if (this.isUpdate) {
        this.invoicesService.updateData(this.newData.id, this.newData).subscribe(data => {
          this.store.dispatch(new InvoiceUpdate({ id: this.newData.id, changes: data}));
        });
      } else {
        this.invoicesService.insertData(this.newData).subscribe(newData => {
          this.store.dispatch(new InvoiceAdd(newData));
        })
      }
    }
   }
}
