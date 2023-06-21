import IInvoicesData from 'src/app/interfaces/IInvoicesData';

import { Action, INIT } from '@ngrx/store';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { AppState } from 'src/app/app.state';
import {
  InvoiceActions,
  InvoiceAdd,
  InvoiceLoadAll,
  InvoiceUpdate,
} from './invoices.actions';

export interface InvoiceState extends EntityState<IInvoicesData> {
  id: string | undefined;
}

export function selectedInvoiceId(inv: IInvoicesData): string {
  return inv.id;
}

const invoiceAdapter = createEntityAdapter<IInvoicesData>({
  selectId: selectedInvoiceId,
});
export const invoiceInitialState: InvoiceState = invoiceAdapter.getInitialState(
  {
    id: undefined,
  }
);

export function invoicesReducer(
  state = invoiceInitialState,
  action: Action
): InvoiceState {
  switch (action.type) {
    case InvoiceActions.add:
      const newInvoice = invoiceAdapter.addOne(
        (action as InvoiceAdd).invoice,
        state
      );
      return newInvoice;
    case InvoiceActions.update:
      const currentInvoice = (action as InvoiceUpdate).invoice;
      const newStateRemove = invoiceAdapter.updateOne(currentInvoice, state);
      return newStateRemove;
    case InvoiceActions.load:
      const newState = invoiceAdapter.addMany(
        (action as InvoiceLoadAll).invoices,
        state
      );
      return newState;
    case INIT:
      return invoiceInitialState;
    default:
      throw Error(`The action type "${action.type}" is not implemented`);
  }
}
