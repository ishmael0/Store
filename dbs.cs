using Core.Controllers;
using Core.DB;
using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class MyAccStore : BaseAccountDBContext<BaseApplicationUser, BaseApplicationRole>
    {
        public MyAccStore(DbContextOptions<MyAccStore> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
    public class MyAccStoreContextFactory : IDesignTimeDbContextFactory<MyAccStore>
    {
        public MyAccStore CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<MyAccStore>("Store");
            return new MyAccStore(o.Options);
        }
    }
    public class StoreContextFactory : IDesignTimeDbContextFactory<StoreDB>
    {
        public StoreDB CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<StoreDB>("Store");
            return new StoreDB(o.Options);
        }
    }
    public class StoreDB : BaseWebSiteDBContext
    {
        public DbSet<Category> Categories { set; get; }
        public DbSet<Size> Sizes { set; get; }
        public DbSet<Color> Colors { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<Keyword> Keywords { set; get; }
        public StoreDB(DbContextOptions<StoreDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(e => e.DetailsNodeValues).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<int, string>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Types).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductType>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Labels).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductLabel>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Related).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductIdTitleHelper>>(v));
            modelBuilder.Entity<Product>().Property(e => e.KeyWords).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductIdTitleHelper>>(v));
            modelBuilder.Entity<Category>().Property(e => e.TreeNodes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<TreeNode>>(v));
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));

        }
    }
    [SafeToGetAll]
    public class Color : BaseModelWithTitle
    {
        public string Value { set; get; }
    }
    public class Keyword : BaseModelWithTitle
    {
    }
    [SafeToGetAll]
    public class Size : BaseModelWithTitle
    {
        public string Value { set; get; }
    }
    [SafeToGetAll]
    public class Category : BaseModelWithTitle
    {
        [ForeignKey("ParentCategoryId")]
        public Category ParentCategory { set; get; }
        public int? ParentCategoryId { set; get; }
        public List<TreeNode> TreeNodes { get; set; }
        public List<Images> Images { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public int DetailsNodeValuesMaxId { set; get; }

    }
    public class ProductController : BaseController<StoreDB, Product>
    {
        public ProductController(StoreDB dbContext, UserPermissionManager upm) : base(dbContext, upm)
        {
        }
        public override async Task<JsonResult> Set([FromQuery] IDictionary<string, string> param, [FromBody] Product t)
        {
            if (t.Types != null && t.Types.Count > 0)
                t.Supply = t.Types.Sum(c => c.Supply);
            else t.Supply = 0;
            return await base.Set(param, t);
        }
        [NonAction]
        public override async Task<JsonResult> GetHandler([FromQuery] IDictionary<string, string> param, Product currentItem)
        {
            var x = await PostRequest(param);
            if (x.Item2.Count > 0)
            {
                var ids = x.Item2.Where(c => c.Related != null).SelectMany(c => c.Related).Select(c => c.Id).Distinct().ToList();
                if (ids.Count > 0)
                {
                    var titles = await _context.Products.Where(c => ids.Contains(c.Id)).Select(c => new { c.Title, c.Id }).ToListAsync();
                    foreach (var i in x.Item2)
                    {
                        if (i.Related != null)
                            foreach (var r in i.Related)
                            {
                                r.Title = titles.FirstOrDefault(c => c.Id == r.Id)?.Title;
                            }
                    }
                }

                ids = x.Item2.Where(c => c.KeyWords != null).SelectMany(c => c.KeyWords).Select(c => c.Id).Distinct().ToList();
                if (ids.Count > 0)
                {
                    var titles = await _context.Keywords.Where(c => ids.Contains(c.Id)).Select(c => new { c.Title, c.Id }).ToListAsync();
                    foreach (var i in x.Item2)
                    {
                        if (i.KeyWords != null)
                            foreach (var r in i.KeyWords)
                            {
                                r.Title = titles.FirstOrDefault(c => c.Id == r.Id)?.Title;
                            }
                    }
                }

            }

            return JR(StatusCodes.Status200OK, data: new { Records = x.Item2, TotalRecords = x.Item1, Model = currentItem });
        }
    }

    public class Product : BaseModelWithTitle
    {
        [ForeignKey("CategoryId")]
        public Category Category { set; get; }
        public int CategoryId { set; get; }
        //[NotMapped]
        public int Supply { set; get; }
        //public string Logo { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public List<ProductLabel> Labels { set; get; }
        public List<ProductType> Types { set; get; }
        public List<Images> Images { set; get; }
        public Dictionary<int, string> DetailsNodeValues { set; get; }
        public List<ProductIdTitleHelper> Related { set; get; }
        public List<ProductIdTitleHelper> KeyWords { set; get; }
    }

    public class ProductLabel
    {
        public string Label { set; get; }
        public string Color { set; get; }
    }
    public class Images
    {
        public string Path { set; get; }
        public string Description { set; get; }
    }
    public class ProductDetailsNodeValue
    {
        public int Id { set; get; }
        public string Value { set; get; }
    }
    public class ProductIdTitleHelper
    {
        public int Id { set; get; }
        public string Title { set; get; }
    }

    public class ProductType
    {
        public string Title { set; get; }
        public string Color { set; get; }
        public string Decription { set; get; }
        public int Price { set; get; }
        public int Off { set; get; }
        public int TotalPriceAfterOff { set; get; }
        public int Supply { set; get; }
        public int Sells { set; get; }
    }
    public class TreeNode
    {
        public string name { get; set; }
        public int key { get; set; }
        public List<TreeNode> children { get; set; }
    }
}