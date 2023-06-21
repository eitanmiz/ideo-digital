using InvoiceSystem.ENums;

namespace InvoiceSystem
{

    /// <summary>
    /// Invoice single record.
    /// </summary>
    public class InvoiceRecord
    {
        /// <summary>
        /// The index. When new record - not index yet.
        /// </summary>
        public string? Id { get; set; }
        /// <summary>
        /// Invoice date
        /// </summary>
        public DateTime? InvoiceDate { get; set; }
        /// <summary>
        /// Status - OPEN/CLOSE/CANCEL
        /// </summary>
        public StatusPhase Status { get; set; }
        /// <summary>
        /// Amount - can have digits.
        /// </summary>
        public double Amount { get; set; }
    }
}
