namespace BrightFutureSchoolApi.Models
{
    public class Payroll
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string Month { get; set; } = string.Empty;
        public decimal BasicSalary { get; set; }
        public decimal Bonus { get; set; }
        public decimal Deduction { get; set; }
        public decimal NetSalary { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
