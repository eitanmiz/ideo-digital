using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using System.Linq;

namespace InvoiceSystem.Controllers
{
    /// <summary>
    /// Main controller for manipulate select/update/delete for the db.
    /// Since the data is mocked,
    /// ... I reserve the collection of the invoices for better performance.
    /// </summary>
    [ApiController]
    [Route("[controller]/[action]")]
    public class Invoices : Controller
    {
        // data - in memory for better performance, since there is one spot of this activities (assumption).
        // invoiceData - the list of invoices in memory for first time.
        //  .. it changes while actions are triggered.
        // The data is always kept in file.
        Dictionary<string, InvoiceRecord>? invoicesData;
        readonly string invoicesPath;
        public Invoices()
        {
            invoicesPath = Path.Combine("Data", "invoices.json");
            ReadData(); // first reading the data before manipulate it - to memory.
        }
        /// <summary>
        /// Read invoices data to memory.
        /// </summary>
        private void ReadData() 
        {
            string invoicesContent = System.IO.File.ReadAllText(invoicesPath);
            invoicesData = JsonConvert.DeserializeObject<Dictionary<string, InvoiceRecord>>(invoicesContent);
        }
        /// <summary>
        /// Index
        /// GET - due select (fetch all the invoices and return to client).
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        // GET: 
        public IEnumerable<InvoiceRecord>? Index()
        {
            if (invoicesData == null)
            {
                ReadData();
            }
//            InvoiceRecord x = new InvoiceRecord { Amount = 0 };
            return invoicesData?.ToDictionary(kvp => kvp.Key, kvp => 
                new InvoiceRecord
                {
                    Id = kvp.Key,
                    Amount = kvp.Value.Amount,
                    InvoiceDate = kvp.Value.InvoiceDate,
                    Status = kvp.Value.Status,
                }).Values.ToList();

        }
        /// <summary>
        /// GET: i.e. Invoices/Details/5
        /// Get specific id + details for invoice.
        /// </summary>
        /// <param name="id">the id of invoice</param>
        /// <returns>invoice details</returns>
        /// 
        [HttpGet]
        public InvoiceRecord? Details(string id)
        {
            InvoiceRecord? record = null;
            if (invoicesData != null)
            {
                _ = invoicesData.TryGetValue(id, out record);
                if (record != null)
                    record.Id = id;
            }
            return record;
        }

        /// <summary>
        /// Add new invoice.
        /// Only amount is relevant - other are auto-filled.
        /// i.e. Get specific id + details for invoice.
        /// </summary>
        /// <param name="record">The record (for amount only)</param>
        /// <returns>The inserted record with all details</returns>
        [HttpPost]
        public InvoiceRecord? AddRecord([FromBody] InvoiceRecord record)
        {
            InvoiceRecord? r = null;
            if (invoicesData != null)
            {
                // fillup some data for new invoice
                if (invoicesData.Count == 0)
                    record.Id = "1";
                else {
                    // resolve the maximum id of invoices.
                    int maxId = invoicesData.Max(p =>
                    {
                        if (int.TryParse(p.Value.Id, out int invVal)) return invVal;
                        else return -1;
                    });
                    maxId++;
                    record.Id = maxId.ToString();
                }
                record.InvoiceDate = DateTime.UtcNow;
                record.Status = 0; // open
                
                if (invoicesData.TryAdd(record.Id, record))
                {
                    r = record;
                    // reserve data to file after add
                    System.IO.File.WriteAllText(invoicesPath, JsonConvert.SerializeObject(invoicesData));
                }
            }
            return r;
        }

        /// <summary>
        /// Update an existing record
        /// </summary>
        /// <param name="id">The id of the existing record</param>
        /// <param name="record">The record that was changed after updating, when successfull (otherwise - no data)</param>
        /// <returns></returns>
        [HttpPut]
        public InvoiceRecord? UpdateRecord(string id, [FromBody] InvoiceRecord record)
        {
            if (invoicesData != null) // only valid invoice record
            {
                if (invoicesData.TryGetValue (id, out _))
                {
                    invoicesData[id] = record;
                    if (invoicesData[id] != null)
                        invoicesData[id].Id = id;
                    System.IO.File.WriteAllText(invoicesPath, JsonConvert.SerializeObject(invoicesData));
                    return record;
                }
            }
            return null;
        }
    }
}
