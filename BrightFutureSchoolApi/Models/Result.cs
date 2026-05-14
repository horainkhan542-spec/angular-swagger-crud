namespace BrightFutureSchoolApi.Models
{
    public class Result
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int ExamId { get; set; }
        public int MarksObtained { get; set; }
        public string Grade { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
    }
}
