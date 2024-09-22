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
using Microsoft.AspNetCore.Authorization;

namespace BlogPage.Controllers
{

    [Route("Api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public CommentController(ApplicationDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        // Get All Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments()
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            return await _context.Comments.OrderBy(x => x.CreatedAt).ProjectTo<CommentDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get Comments By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(Guid id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            var comment = await _context.Comments.ProjectTo<CommentDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.CommentId == id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // Get Comment by BlogId
        [HttpGet("blog/{articleId}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByArticleID(Guid articleId)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            return await _context.Comments
                    .Where(x => x.Article.ArticleId == articleId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        // Put (Edit) Comment
        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(Guid id, Comment comment)
        {
            if (id != comment.CommentId)
            {
                return BadRequest();
            }
            var newComment = await _context.Comments.FindAsync(id);
            _mapper.Map(comment, newComment);
            try
            {
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return NoContent();
                return BadRequest("Problem updating comment!");

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // Post (Add) New Comment
        [Authorize(Roles = "Administrator")]
        [HttpPost("{articleId}")]

        public async Task<ActionResult<CommentDto>> PostComment(Comment comment, Guid articleId)
        {
            var article = await _context.Articles.FindAsync(articleId);

            if(article == null)
            {
                return NotFound();
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

            var newComment = new Comment
            {
                CommentId = comment.CommentId,
                Body = comment.Body,
                Article = article,
                Author= user
            };

            article.Comments.Add(newComment);

            if (_context.Comments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Articles'  is null.");
            }
            _context.Comments.Add(newComment);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(_mapper.Map<CommentDto>(newComment));

            return BadRequest("Problem creating comment!");
        }

        // Delete Comment
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(Guid id)
        {
            return (_context.Comments?.Any(e => e.CommentId == id)).GetValueOrDefault();
        }
    }
}
