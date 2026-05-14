namespace BrightFutureSchoolApi.Models
{
    public class Transport
    {
        public int Id { get; set; }
        public string RouteName { get; set; } = string.Empty;
        public string VehicleNumber { get; set; } = string.Empty;
        public string DriverName { get; set; } = string.Empty;
        public string DriverPhone { get; set; } = string.Empty;
        public decimal MonthlyFee { get; set; }
    }
}
