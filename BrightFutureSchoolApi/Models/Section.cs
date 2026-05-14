using System.ComponentModel.DataAnnotations;

namespace BrightFutureSchoolApi.Models
{
    public class Section
    {
        [Key]
        public int SectionId { get; set; }

        [Required]
        public string SectionName { get; set; } = string.Empty;

        [Required]
        public string ClassName { get; set; } = string.Empty;
    }
}
