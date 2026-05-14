namespace BrightFutureSchoolApi.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string HeadOfDepartment { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
