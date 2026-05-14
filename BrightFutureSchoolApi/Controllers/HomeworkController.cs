using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeworkController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HomeworkController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Homework>>> GetHomeworks()
        {
            return await _context.Homeworks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Homework>> GetHomework(int id)
        {
            var homework = await _context.Homeworks.FindAsync(id);

            if (homework == null)
            {
                return NotFound();
            }

            return homework;
        }

        [HttpPost]
        public async Task<ActionResult<Homework>> AddHomework(Homework homework)
        {
            _context.Homeworks.Add(homework);
            await _context.SaveChangesAsync();

            return Ok(homework);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHomework(int id, Homework homework)
        {
            if (id != homework.Id)
            {
                return BadRequest();
            }

            _context.Entry(homework).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHomework(int id)
        {
            var homework = await _context.Homeworks.FindAsync(id);

            if (homework == null)
            {
                return NotFound();
            }

            _context.Homeworks.Remove(homework);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
