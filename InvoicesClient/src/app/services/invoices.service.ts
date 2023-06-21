import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IInvoicesData from '../interfaces/IInvoicesData';

const BASE_URL = 'https://localhost:7010/Invoices';

@Injectable({
  providedIn: 'root'
})

// **********************************************************
// InvoicesService - main service to communicate with server 
// (for update / fetching / delete from db or any mocked data)
// **********************************************************
export class InvoicesService {

  constructor(private http: HttpClient) { }

  // read all invoices from db / mocked data.
  getData(): Observable<IInvoicesData[]> {
    return this.http.get<IInvoicesData[]>(`${BASE_URL}/Index`)
  }

  // update specfic invoice
  updateData(id: string, invoice: IInvoicesData ): Observable<IInvoicesData> {
    return this.http.put<IInvoicesData>(`${BASE_URL}/UpdateRecord?id=${id}`, invoice,
    {'headers': { 'content-type': 'application/json'} } 
    )
  }

  // insert new invoice.
  insertData(invoice: IInvoicesData): Observable<IInvoicesData> {
    return this.http.post<IInvoicesData>(`${BASE_URL}/AddRecord`, invoice, 
      {'headers': { 'content-type': 'application/json'} } )
  }
  
}
