﻿using Core.DB;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace Store.Models
{
    public class MonizaDB : BaseWebSiteDBContext
    {
        public DbSet<Category> Categories { set; get; }
        public DbSet<Size> Sizes { set; get; }
        public DbSet<Brand> Brands { set; get; }
        public DbSet<Color> Colors { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<ProductType> ProductTypes { set; get; }
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
            //modelBuilder.Entity<Product>().Property(e => e.Types).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<ProductType>>(v));
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

}