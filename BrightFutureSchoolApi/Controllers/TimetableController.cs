using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimetableController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TimetableController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Timetable>>> GetTimetables()
        {
            return await _context.Timetables.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Timetable>> GetTimetable(int id)
        {
            var timetable = await _context.Timetables.FindAsync(id);

            if (timetable == null)
            {
                return NotFound();
            }

            return timetable;
        }

        [HttpPost]
        public async Task<ActionResult<Timetable>> AddTimetable(Timetable timetable)
        {
            _context.Timetables.Add(timetable);
            await _context.SaveChangesAsync();

            return Ok(timetable);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTimetable(int id, Timetable timetable)
        {
            if (id != timetable.Id)
            {
                return BadRequest();
            }

            _context.Entry(timetable).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimetable(int id)
        {
            var timetable = await _context.Timetables.FindAsync(id);

            if (timetable == null)
            {
                return NotFound();
            }

            _context.Timetables.Remove(timetable);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
