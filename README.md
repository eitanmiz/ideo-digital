# Home work for creating server-client project, enabling add/update/select data from databases.
## Written by Eitan Mizrahi.
---
# Original task:

Create a customer Invoices web-based app that allow to view/create/edit all invoices in the system.

This app should be based on the following:

net.
Any chosen client framework (Angular)
 

Please consider the following:

Server Architecture
Client Architecture
Storage structure:
Dates
Id's
Statuses
Amount
---

### Basic assumption and implementation concept.
## Server side:
* C#
* There is mocked-file (instead of db - json file)
* The mocked file is ensured to worked as good as possible, since it is in memory with index (dictionary), for fast retrieval).
* The mocked file is updated as well, by client requests.
# Server - API methods:
* Invoice/Index - 
 * Returns the list of invoices
 * Method: GET
 * No parameters
* Invoice/Details/<id>
 * Returns specific invoice id details
 * Method - Get
 * Parameters: Id - the invoice id
* Invoice/AddRecord - add a specific record.
  * Return - the added record, whether successful.
  * Method: Post.
  * Parameters: Invoice data (amount only - in body).
 * Invoice/UpdateRecord - update a specific record.
   * Return - the updated record.
   * Method - Put
   * Parameters - Id of the invoice (address). Invoice data  (body).

## Client side:
* All of invoices are uploaded only once when the program starts.
* The invoices changes are in one spot, hence after the data is loaded - only the differential are saved.
* The program use redux in order to reserve the data with less state manipulations.
* One client served (when mock). Can spread, when much effective rational db used.
* Use service, components, and some extra more than standard package.json.
* Use enums and documentation inside.
# Extras
* Angular material is used basely for dialog.
* Enhanced styles (scss) are used.
* There are unit-test.
* Angular version 13.
# Heirarcy
* Components - the components including dialog.
 * invoice-inspect - the dialog for update/add invoice
 * invoice-list - all the list of the invoice.
* Enums - All enums.
  * StatusPhase - enum for statuses.
 * Interfaces - all interfaces (invoices only).
* services - Services
 * invoices-service - provide ability for rest-api calls.
* Store - ngrx.
  * invoices - actions/reducers/selectors.
 
