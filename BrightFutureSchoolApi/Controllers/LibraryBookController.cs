using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrightFutureSchoolApi.Data;
using BrightFutureSchoolApi.Models;

namespace BrightFutureSchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryBookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LibraryBookController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<LibraryBook>>> GetLibraryBooks()
        {
            return await _context.LibraryBooks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LibraryBook>> GetLibraryBook(int id)
        {
            var libraryBook = await _context.LibraryBooks.FindAsync(id);

            if (libraryBook == null)
            {
                return NotFound();
            }

            return libraryBook;
        }

        [HttpPost]
        public async Task<ActionResult<LibraryBook>> AddLibraryBook(LibraryBook libraryBook)
        {
            _context.LibraryBooks.Add(libraryBook);
            await _context.SaveChangesAsync();

            return Ok(libraryBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLibraryBook(int id, LibraryBook libraryBook)
        {
            if (id != libraryBook.Id)
            {
                return BadRequest();
            }

            _context.Entry(libraryBook).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibraryBook(int id)
        {
            var libraryBook = await _context.LibraryBooks.FindAsync(id);

            if (libraryBook == null)
            {
                return NotFound();
            }

            _context.LibraryBooks.Remove(libraryBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
