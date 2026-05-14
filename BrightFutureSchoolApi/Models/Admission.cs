namespace BrightFutureSchoolApi.Models
{
    public class Admission
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string PreviousSchool { get; set; } = string.Empty;
        public string AdmissionStatus { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}