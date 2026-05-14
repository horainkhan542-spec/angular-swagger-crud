using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<SchoolClass> SchoolClasses { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Fee> Fees { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Timetable> Timetables { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Admission> Admissions { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Payroll> Payrolls { get; set; }
        public DbSet<Notice> Notices { get; set; }
        public DbSet<LibraryBook> LibraryBooks { get; set; }
        public DbSet<Transport> Transports { get; set; }
        public DbSet<Homework> Homeworks { get; set; }
    }
}
