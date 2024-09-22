using AutoMapper;
using BlogPage.Models.DTOs;
using BlogPage.Models;
using System.Reflection.Metadata;

namespace BlogPage.AutoMapper.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Comment, Profiles.CommentProfile>()
                .ForMember(d => d.Body, o => o.MapFrom(a => a.Body))
                .ForMember(d => d.UserName, o => o.MapFrom(a => a.Author.UserName))
                .ForMember(d => d.FirstName, o => o.MapFrom(a => a.Author.FirstName))
                .ForMember(d => d.CreatedAt, o => o.MapFrom(a => a.CreatedAt)); ;

            CreateMap<Article, Profiles.ArticleProfile>()
                .ForMember(d => d.FirstName, o => o.MapFrom(a => a.User.FirstName))
                .ForMember(d => d.UserName, o => o.MapFrom(a => a.User.UserName)); ;

            CreateMap<Article, ArticleDto>()
                .ForMember(d => d.Comments, o => o.MapFrom(a => a.Comments))
                .ForMember(d => d.Image, o => o.MapFrom(a => a.Photo.Url))
                .ForMember(d => d.User, o => o.MapFrom(a => a.User))
                .ForMember(d => d.UserName, o => o.MapFrom(a => a.User.UserName));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.FirstName, o => o.MapFrom(a => a.Author.FirstName))
                .ForMember(d => d.UserName, o => o.MapFrom(a => a.Author.UserName))
                .ForMember(d => d.CreatedAt, o => o.Ignore());

            CreateMap<Article, Article>();

            CreateMap<Category, CategoryDto>()
                .ForMember(d => d.Articles, o => o.MapFrom(a => a.Articles));

            CreateMap<Category, Category>();

            CreateMap<Comment, Comment>()
                .ForMember(d => d.CreatedAt, o => o.Ignore());
            CreateMap<Category, CategoryDto>();

            CreateMap<User, Profiles.UserProfile>()
                .ForMember(d => d.FirstName, o => o.MapFrom(a => a.FirstName))
                .ForMember(d => d.UserName, o => o.MapFrom(a => a.UserName));
        }
    }
}
