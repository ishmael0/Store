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
        public DbSet<Province> Provinces { set; get; }
        public DbSet<City> Cities { set; get; }
        public DbSet<Customer> Customers { set; get; }
        public DbSet<Invoice> Invoices { set; get; }
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
            modelBuilder.Entity<Product>().Property(e => e.Relateds).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductIdTitleHelper>>(v));
            modelBuilder.Entity<Product>().Property(e => e.KeyWords).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductIdTitleHelper>>(v));
            modelBuilder.Entity<Category>().Property(e => e.TreeNodes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<TreeNode>>(v));
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Customer>().Property(e => e.Addresses).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Address>>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.Address).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Address>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.ProductTypes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductTypeForInvoice>>(v));

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
            {
                t.SupplyCount = t.Types.Sum(c => c.SupplyCount);
                t.PurchasesCount = t.Types.Sum(c => c.PurchasesCount);
            }
            else
            {
                t.SupplyCount = 0;
                t.PurchasesCount = 0;
            }
            return await base.Set(param, t);
        }
        [NonAction]
        public override async Task<JsonResult> GetHandler([FromQuery] IDictionary<string, string> param, Product currentItem)
        {
            var x = await PostRequest(param);
            if (x.Item2.Count > 0)
            {
                var ids = x.Item2.Where(c => c.Relateds != null).SelectMany(c => c.Relateds).Select(c => c.Id).Distinct().ToList();
                if (ids.Count > 0)
                {
                    var titles = await _context.Products.Where(c => ids.Contains(c.Id)).Select(c => new { c.Title, c.Id }).ToListAsync();
                    foreach (var i in x.Item2)
                    {
                        if (i.Relateds != null)
                            foreach (var r in i.Relateds)
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
        public int SupplyCount { set; get; }
        public int PurchasesCount { set; get; }
        public int MaxTypeId { set; get; }
        public int Weight { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public List<ProductLabel> Labels { set; get; }
        public List<ProductType> Types { set; get; }
        public List<Images> Images { set; get; }
        public Dictionary<int, string> DetailsNodeValues { set; get; }
        public List<ProductIdTitleHelper> Relateds { set; get; }
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

    public class ProductTypeBase
    {
        public int Id { set; get; }
        public string Title { set; get; }
        public string Color { set; get; }
        public string Decription { set; get; }
        public int Price { set; get; }
        public int Off { set; get; }
        public int TotalPriceAfterOff { set; get; }
    }
    public class ProductTypeForInvoice : ProductTypeBase
    {
        public int Count { set; get; }
    }
    public class ProductType : ProductTypeBase
    {
        public int SupplyCount { set; get; }
        public int PurchasesCount { set; get; }
        public int MaxAllowedBuy { set; get; }
    }
    public class TreeNode
    {
        public string name { get; set; }
        public int key { get; set; }
        public List<TreeNode> children { get; set; }
    }
    public class Invoice : BaseModelWithTitle
    {
        [ForeignKey("CustomerId")]
        public int CustomerId { set; get; }
        public Customer Customer { set; get; }
        public Address Address { get; set; }
        public int PostPrice { set; get; }
        public int Price { set; get; }
        public bool IsPaid { set; get; }
        //public bool Description { set; get; }
        public List<ProductTypeForInvoice> ProductTypes { set; get; }
    }


    [SafeToGetAll]
    public class Province : BaseModelWithTitle
    {
    }
    [SafeToGetAll]
    public class City : BaseModelWithTitle
    {
        [ForeignKey("ProvinceId")]
        public Province Province { set; get; }
        public int ProvinceId { set; get; }
    }
    public class Customer : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public bool PhoneNumberConfirm { get; set; }
        public List<Address> Addresses { get; set; }
    }
    public class Address : BaseModelWithTitle
    {
        public string PostalCode { set; get; }
        public string Province { set; get; }
        public string City { set; get; }
        public string FullAddress { set; get; }
        public string Latitude { set; get; }
        public string Longitude { set; get; }
    }
}