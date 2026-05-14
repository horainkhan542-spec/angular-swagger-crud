namespace BrightFutureSchoolApi.Models
{
    public class Parent
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string FatherName { get; set; } = string.Empty;
        public string MotherName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
