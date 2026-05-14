namespace BrightFutureSchoolApi.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime NoticeDate { get; set; }
        public string Audience { get; set; } = string.Empty;
    }
}
