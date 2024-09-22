using AutoMapper;
using BlogPage.AutoMapper.Mapping;
using BlogPage.Controllers;
using BlogPage.Data;
using BlogPage.Models;
using BlogPage.Models.DTOs;
using BlogPage.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using System.Security.Claims;

namespace BlogPage.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            //Arrange

            var _mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfiles>();
            }).CreateMapper();

            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            mockHttpContextAccessor.Setup(x => x.HttpContext.User.Identity.Name).Returns("TestUser");
            var _userAccessor = new UserAccessor(mockHttpContextAccessor.Object);

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Test Database")
                .Options;

            using (var dbContext = new ApplicationDbContext(options))
            {
                var articlesController = new ArticlesController(dbContext, _mapper, _userAccessor);

                //Act
                var article1 = new Article()
                {
                    ArticleId = Guid.NewGuid(),
                    Title = "Test Title",
                    Content = "Test Content",
                    PublicationDate = DateTime.Now,
                    Tags = new string[] { "Test1", "Test2", "Test3" }
                };
                var article2 = new Article()
                {
                    ArticleId = Guid.NewGuid(),
                    Title = "Test Title Two",
                    Content = "Test Content Two",
                    PublicationDate = DateTime.Now,
                    Tags = new string[] { "Test1", "Test2" }
                };
                dbContext.Articles.Add(article1);
                dbContext.Articles.Add(article2);
                dbContext.SaveChanges();

                var result = articlesController.GetArticles().Result;

                //Assert
                Assert.NotNull(result);
                Assert.Equal(2, result.Value.Count());
            }

        }
    }
}