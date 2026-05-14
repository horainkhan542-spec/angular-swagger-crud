using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transport>>> GetTransports()
        {
            return await _context.Transports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transport>> GetTransport(int id)
        {
            var transport = await _context.Transports.FindAsync(id);

            if (transport == null)
            {
                return NotFound();
            }

            return transport;
        }

        [HttpPost]
        public async Task<ActionResult<Transport>> AddTransport(Transport transport)
        {
            _context.Transports.Add(transport);
            await _context.SaveChangesAsync();

            return Ok(transport);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransport(int id, Transport transport)
        {
            if (id != transport.Id)
            {
                return BadRequest();
            }

            _context.Entry(transport).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransport(int id)
        {
            var transport = await _context.Transports.FindAsync(id);

            if (transport == null)
            {
                return NotFound();
            }

            _context.Transports.Remove(transport);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
