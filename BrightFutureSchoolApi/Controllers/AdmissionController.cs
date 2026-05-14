using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdmissionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Admission>>> GetAdmissions()
        {
            return await _context.Admissions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Admission>> GetAdmission(int id)
        {
            var admission = await _context.Admissions.FindAsync(id);

            if (admission == null)
            {
                return NotFound();
            }

            return admission;
        }

        [HttpPost]
        public async Task<ActionResult<Admission>> AddAdmission(Admission admission)
        {
            _context.Admissions.Add(admission);
            await _context.SaveChangesAsync();

            return Ok(admission);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdmission(int id, Admission admission)
        {
            if (id != admission.Id)
            {
                return BadRequest();
            }

            _context.Entry(admission).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmission(int id)
        {
            var admission = await _context.Admissions.FindAsync(id);

            if (admission == null)
            {
                return NotFound();
            }

            _context.Admissions.Remove(admission);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
