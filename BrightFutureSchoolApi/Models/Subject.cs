using System.ComponentModel.DataAnnotations;

namespace BrightFutureSchoolApi.Models
{
    public class Subject
    {
        [Key]
        public int SubjectId { get; set; }

        [Required]
        public string SubjectName { get; set; } = string.Empty;

        [Required]
        public string SubjectCode { get; set; } = string.Empty;

        [Required]
        public string ClassName { get; set; } = string.Empty;

        public int TeacherId { get; set; }
    }
}
