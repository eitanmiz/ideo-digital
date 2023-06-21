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
