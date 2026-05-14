using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClassController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SchoolClass>>> GetClasses()
        {
            return await _context.SchoolClasses.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolClass>> GetClass(int id)
        {
            var schoolClass = await _context.SchoolClasses.FindAsync(id);

            if (schoolClass == null)
            {
                return NotFound();
            }

            return schoolClass;
        }

        [HttpPost]
        public async Task<ActionResult<SchoolClass>> AddClass(SchoolClass schoolClass)
        {
            _context.SchoolClasses.Add(schoolClass);
            await _context.SaveChangesAsync();

            return Ok(schoolClass);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(int id, SchoolClass schoolClass)
        {
            if (id != schoolClass.Id)
            {
                return BadRequest();
            }

            _context.Entry(schoolClass).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var schoolClass = await _context.SchoolClasses.FindAsync(id);

            if (schoolClass == null)
            {
                return NotFound();
            }

            _context.SchoolClasses.Remove(schoolClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
