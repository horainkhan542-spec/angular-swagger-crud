using System.ComponentModel.DataAnnotations;

namespace BrightFutureSchoolApi.Models
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public DateTime AttendanceDate { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;
    }
}
