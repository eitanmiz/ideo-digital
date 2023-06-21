import { Update } from "@ngrx/entity";
import {Action} from "@ngrx/store";
import IInvoicesData from "src/app/interfaces/IInvoicesData";

export enum InvoiceActions {
  add = 'Invoice - Add',
  update = 'Invoice - Update',
  load = 'Invoice - Load'
}

export class InvoiceAdd implements Action {
  readonly type: string = InvoiceActions.add;

  constructor(public invoice: IInvoicesData ) {
  }
}

export class InvoiceUpdate implements Action {
  readonly type: string = InvoiceActions.update;

  constructor(public invoice: Update<IInvoicesData> ) {
  }
}

export class InvoiceLoadAll implements Action {
  readonly type: string = InvoiceActions.load;

  constructor(public invoices: IInvoicesData[] ) {
  }
}
