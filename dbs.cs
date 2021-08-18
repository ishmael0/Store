using Core.DB;
using Core.Models;
using Core.StartUp;
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
        public StoreDB(DbContextOptions<StoreDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(e => e.ProductTypes).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductType>>(v));
            modelBuilder.Entity<Product>().Property(e => e.ProductLabels).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductLabel>>(v));
            modelBuilder.Entity<Product>().Property(e => e.ProductImages).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductImages>>(v));

        }
    }
    [SafeToGetAll]
    public class Color : BaseModelWithTitle
    {
        public string Value { set; get; }
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

        public string Logo { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
    }
    public class Product : BaseModelWithTitle
    {
        [ForeignKey("CategoryId")]
        public Category Category { set; get; }
        public int CategoryId { set; get; }
        public string Logo { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public List<ProductLabel> ProductLabels { set; get; }
        public List<ProductType> ProductTypes { set; get; }
        public List<ProductImages> ProductImages { set; get; }
        public List<int> RelatedProduct { set; get; }
        public List<string> KeyWords { set; get; }
    }

    public class ProductLabel
    {
        public string Label { set; get; }
        public string Color { set; get; }
    } 
    public class ProductImages
    {
        public string Path { set; get; }
        public string Description { set; get; }
    }

    public class ProductType
    {
        public string Title { set; get; }
        public string Color { set; get; }
        public int Price { set; get; }
        public int Off { set; get; }
        public int TotalPriceAfterOff { set; get; }
        public int Amount { set; get; }
        public int Sells { set; get; }
    }
}