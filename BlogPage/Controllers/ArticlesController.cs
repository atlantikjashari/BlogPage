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
using Microsoft.AspNetCore.Authorization;

namespace BlogPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public ArticlesController(ApplicationDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        // Get All Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetArticles()
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            return await _context.Articles.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get Articles By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleDto>> GetArticle(Guid id)
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            var article = await _context.Articles.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.ArticleId == id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // Get user's articles
        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetUserArticles()
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
            if (user == null)
            {
                return NotFound();
            }
            return await _context.Articles.Where(x => x.User == user).ProjectTo<ArticleDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Add a new enum to specify the search type
        public enum SearchType
        {
            Title,
            User
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> SearchArticles([FromQuery] string searchTerm, [FromQuery] SearchType searchType)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest("Search term cannot be empty.");
            }

            IQueryable<Article> query = _context.Articles;

            // Apply search based on selected search type
            switch (searchType)
            {
                case SearchType.Title:
                    query = query.Where(a => EF.Functions.Like(a.Title, $"%{searchTerm}%"));
                    break;
                case SearchType.User:
                    query = query.Where(a => EF.Functions.Like(a.User.UserName, $"%{searchTerm}%"));
                    break;
                default:
                    return BadRequest("Invalid search type.");
            }

            var matchingArticles = await query
                .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(matchingArticles);
        }

        // Put (Edit) Article
        [Authorize(Roles ="Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(Guid id, Article article)
        {
            if (id != article.ArticleId)
            {
                return BadRequest();
            }

            var newArticle = await _context.Articles.FindAsync(id);
            _mapper.Map(article, newArticle);

            try
            {
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return NoContent();
                return BadRequest("Problem updating article!");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        // Post (Add) New Article
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
          if (_context.Articles == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Articles'  is null.");
          }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

            article.User = user;

            _context.Articles.Add(article);
            var result  =await _context.SaveChangesAsync() > 0;

            if(result) return Ok(_mapper.Map<ArticleDto>(article));

            return BadRequest("Problem adding article!");
        }

        // Delete Article
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(Guid id)
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(Guid id)
        {
            return (_context.Articles?.Any(e => e.ArticleId == id)).GetValueOrDefault();
        }
    }
}