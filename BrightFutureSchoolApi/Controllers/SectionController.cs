using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SectionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Section>>> GetSections()
        {
            return await _context.Sections.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Section>> GetSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            return section;
        }

        [HttpPost]
        public async Task<ActionResult<Section>> AddSection(Section section)
        {
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return Ok(section);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSection(int id, Section section)
        {
            if (id != section.SectionId)
            {
                return BadRequest();
            }

            _context.Entry(section).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
