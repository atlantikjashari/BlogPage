using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogPage.Data;
using BlogPage.Models;
using AutoMapper.QueryableExtensions;
using BlogPage.Models.DTOs;
using AutoMapper;
using BlogPage.Services;

namespace BlogPage.Controllers
{

    [Route("Api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get All Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            return await _context.Categories.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get categories By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.CategoryId == id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }


        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Categories'  is null.");
            }

            _context.Categories.Add(category);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(_mapper.Map<CategoryDto>(category));

            return BadRequest("Problem adding category!");
        }

        // PUT: api/categories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(Guid id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            var newCategory = await _context.Categories.FindAsync(id);
            _mapper.Map(category, newCategory);

            try
            {
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return NoContent();
                return BadRequest("Problem updating category!");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/categories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(Guid id)
        {
            return (_context.Categories?.Any(e => e.CategoryId == id)).GetValueOrDefault();
        }
    }
}