import { AppState } from "src/app/app.state";

export const selectAllInvoices = (state: AppState) => state.invoices?.entities;
export const selectInviceById = (id: string) => (state: AppState) =>
  state.invoices?.entities[id];