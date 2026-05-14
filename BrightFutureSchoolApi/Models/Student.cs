namespace BrightFutureSchoolApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public int SchoolClassId { get; set; }
        public SchoolClass? SchoolClass { get; set; }
    }
}
