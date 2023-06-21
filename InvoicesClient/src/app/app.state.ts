// src/app/app.state.ts

import IInvoicesData from "./interfaces/IInvoicesData";
import { InvoiceState } from "./store/invoice/invoices.reducer";

export interface AppState {
  invoices: InvoiceState;
}