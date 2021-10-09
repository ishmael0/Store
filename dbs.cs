using Core.Controllers;
using Core.DB;
using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class MonizaAcc : BaseAccountDBContext<BaseApplicationUser, BaseApplicationRole>
    {
        public MonizaAcc(DbContextOptions<MonizaAcc> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
    public class MyAccStoreContextFactory : IDesignTimeDbContextFactory<MonizaAcc>
    {
        public MonizaAcc CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<MonizaAcc>("Store");
            return new MonizaAcc(o.Options);
        }
    }
    public class StoreContextFactory : IDesignTimeDbContextFactory<MonizaDB>
    {
        public MonizaDB CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<MonizaDB>("Store");
            return new MonizaDB(o.Options);
        }
    }
    public class MonizaDB : BaseWebSiteDBContext
    {
        public DbSet<Category> Categories { set; get; }
        public DbSet<Size> Sizes { set; get; }
        public DbSet<Brand> Brands { set; get; }
        public DbSet<Color> Colors { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<Keyword> Keywords { set; get; }
        public DbSet<Province> Provinces { set; get; }
        public DbSet<City> Cities { set; get; }
        public DbSet<Customer> Customers { set; get; }
        public DbSet<Invoice> Invoices { set; get; }
        public DbSet<OrderedList> OrderedLists { set; get; }
        public MonizaDB(DbContextOptions<MonizaDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(e => e.DetailsNodeValues).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<int, string>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Types).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductType>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Labels).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductLabel>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Product>().Property(e => e.Relateds).HasConversion(v => JsonConvert.SerializeObject(v.Select(c => c.Id)), v => JsonConvert.DeserializeObject<List<int>>(v).Select(c => new ProductIdTitleHelper() { Id = c }));
            modelBuilder.Entity<Product>().Property(e => e.KeyWords).HasConversion(v => JsonConvert.SerializeObject(v.Select(c => c.Id)), v => JsonConvert.DeserializeObject<List<int>>(v).Select(c => new ProductIdTitleHelper() { Id = c }));
            modelBuilder.Entity<Category>().Property(e => e.TreeNodes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<TreeNode>>(v));
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Customer>().Property(e => e.Addresses).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Address>>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.Address).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Address>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.ProductTypes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductTypeForInvoice>>(v));
            modelBuilder.Entity<OrderedList>().Property(e => e.Products).HasConversion(v => JsonConvert.SerializeObject(v.Select(c => c.Id)), v => JsonConvert.DeserializeObject<List<int>>(v).Select(c => new ProductIdTitleHelper() { Id = c }));
            modelBuilder.Entity<Brand>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));



            //modelBuilder.Entity<ProductCategory>().HasKey(t => new { t.CategoryId, t.ProductId });
            //modelBuilder.Entity<ProductCategory>().HasOne(pt => pt.Product).WithMany(p => p.ProductCategory).HasForeignKey(pt => pt.ProductId);
            //modelBuilder.Entity<ProductCategory>().HasOne(pt => pt.Category).WithMany(t => t.ProductCategory).HasForeignKey(pt => pt.CategoryId);
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
        //public virtual ICollection<Product> Products { get; set; }
        //public virtual ICollection<ProductCategory> ProductCategory { get; set; }

        [ForeignKey("ParentCategoryId")]
        public virtual Category ParentCategory { set; get; }
        public int? ParentCategoryId { set; get; }
        public List<TreeNode> TreeNodes { get; set; }
        public List<Images> Images { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public string Icon { set; get; }
        public int DetailsNodeValuesMaxId { set; get; }
        public int Priority { set; get; } = 0;
        public string Color { set; get; }

    }
    [SafeToGetAll]
    public class Brand : BaseModelWithTitle
    {
        public List<Images> Images { set; get; }
        public string Description { set; get; }
        public string Summary { set; get; }
    }
    public class ProductController : BaseController<MonizaDB, Product>
    {
        public ProductController(MonizaDB dbContext, UserPermissionManager upm) : base(dbContext, upm)
        {
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
                    x.Item2.ForEach(c =>
                    {
                        c.Relateds.ToList().ForEach(r =>
                        {
                            r.Title = titles.FirstOrDefault(t => t.Id == r.Id)?.Title;
                        });

                    });
                }

                ids = x.Item2.Where(c => c.KeyWords != null).SelectMany(c => c.KeyWords).Select(c => c.Id).Distinct().ToList();
                if (ids.Count > 0)
                {
                    var titles = await _context.Keywords.Where(c => ids.Contains(c.Id)).Select(c => new { c.Title, c.Id }).ToListAsync();
                    x.Item2.ForEach(c =>
                    {
                        c.KeyWords.ToList().ForEach(r =>
                        {
                            r.Title = titles.FirstOrDefault(t => t.Id == r.Id)?.Title;
                        });

                    });


                }

            }

            return JR(StatusCodes.Status200OK, data: new { Records = x.Item2, TotalRecords = x.Item1, Model = currentItem });
        }
    }
    //public class ProductCategory
    //{
    //    [ForeignKey("ProductId")]
    //    public int ProductId { set; get; }
    //    public virtual Product Product { set; get; }

    //    [ForeignKey("CategoryId")]
    //    public int CategoryId { set; get; }
    //    public virtual Category Category { set; get; }
    //}
    public class Product : BaseModelWithTitle
    {
        [ForeignKey("CategoryId")]
        public int CategoryId { set; get; }
        public virtual Category Category { set; get; }
        public int SupplyCount { set { } get { return Types?.Sum(c => c.SupplyCount) ?? 0; } }
        public int SoldCount { set { } get { return Types?.Sum(c => c.SoldCount) ?? 0; } }
        public int PurchasesCount { set; get; }
        public int MaxTypeId { set; get; }
        public int Weight { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public List<ProductLabel> Labels { set; get; }
        public List<ProductType> Types { set; get; }
        public List<Images> Images { set; get; }
        public Dictionary<int, string> DetailsNodeValues { set; get; }
        public IEnumerable<ProductIdTitleHelper> Relateds { set; get; }
        public IEnumerable<ProductIdTitleHelper> KeyWords { set; get; }
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
        public int SoldCount { set; get; }
        public int PurchasesCount { set; get; }
        public int MaxAllowedBuy { set; get; }
    }
    public class TreeNode
    {
        public string name { get; set; }
        public int key { get; set; }
        public bool Searchable { get; set; }
        public string Type { get; set; }
        public List<TreeNode> children { get; set; }
    }
    public class Invoice : BaseModelWithTitle
    {
        [ForeignKey("CustomerId")]
        public int CustomerId { set; get; }
        public virtual Customer Customer { set; get; }
        public virtual Address Address { get; set; }
        public int PostPrice { set; get; }
        public int Price { set; get; }
        public bool IsPaid { set; get; }
        public string Description { set; get; }
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
        public virtual Province Province { set; get; }
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

    [SafeToGetAll]
    public class OrderedList : BaseModelWithTitle
    {
        public IEnumerable<ProductIdTitleHelper> Products { set; get; }
        public string Color { set; get; }
    }

}