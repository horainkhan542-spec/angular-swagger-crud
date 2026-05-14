namespace BrightFutureSchoolApi.Models
{
    public class Exam
    {
        public int Id { get; set; }
        public string ExamName { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public DateTime ExamDate { get; set; }
        public int TotalMarks { get; set; }
    }
}
