using BlogPage.Data;
using BlogPage.Models;
using BlogPage.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPhotoAccessor _photoAccessor;

        public PhotosController(ApplicationDbContext context, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
        }

        [HttpPost("{articleId}")]
        public async Task<ActionResult<Photo>> Add([FromForm] IFormFile File, Guid articleId)
        {
            var article = await _context.Articles.Include(x => x.Photo).FirstOrDefaultAsync(x => x.ArticleId == articleId);
            if(article == null)
            {
                return NotFound();
            }

            var photoUploadResult = await _photoAccessor.AddPhoto(File);

            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                Id = photoUploadResult.PublicId,
                ArticleId = article.ArticleId
            };

            article.Photo= photo;

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok(photo);

            return BadRequest();
        }

        [HttpDelete("{articleId}")]
        public async Task<IActionResult> Delete(Guid articleId)
        {
            var article = await _context.Articles.Include(x => x.Photo).FirstOrDefaultAsync(x => x.ArticleId == articleId);

            if(article == null)
            {
                return NotFound();
            }

            var photo = article.Photo;

            if(photo == null)
            {
                return NotFound();
            }

            var result = await _photoAccessor.DeletePhoto(photo.Id);

            if (result == null)
            {
                return BadRequest("Problem deleting photo!");
            }

            _context.Photos.Remove(photo);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return NoContent();

            return BadRequest("Problem deleting photo!");
        }
    }
}
