using Core.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Store.Models
{
    [SafeToGetAll]
    public class Color : BaseModelWithTitle
    {
        public string Value { set; get; }
    }
    public class Keyword : BaseModelWithTitle
    {
        public ICollection<Product> Products { set; get; }
        public IEnumerable<ProductKeyword> ProductKeyWords { set; get; }
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
        public int Weight { set; get; }
        public string Summary { set; get; }
        public string Description { set; get; }
        public List<ProductType> Types { set; get; }
        public List<Images> Images { set; get; }
        public Dictionary<int, string> DetailsNodeValues { set; get; }
        public IEnumerable<ProductIdTitleHelper> Relateds { set; get; }
        public ICollection<Keyword> KeyWords { set; get; }
        public IEnumerable<ProductKeyword> ProductKeyWords { set; get; }
        public ICollection<Label> Labels { set; get; }
        public IEnumerable<ProductLabel> ProductLabels { get; set; }

    }
    public class ProductType : BaseModel
    {
        public string Title { set; get; }
        public string Color { set; get; }
        public string Decription { set; get; }
        public int Price { set; get; }
        public int Off { set; get; }
        public int TotalPriceAfterOff { set; get; }
        public int SupplyCount { set; get; }
        public int SoldCount { set; get; }
        //public int PurchasesCount { set; get; }
        public int MaxAllowedBuy { set; get; }
    }
    [SafeToGetAll]
    public class Label : BaseModelWithTitle
    {
        public string Color { set; get; }
        public ICollection<Product> Products { set; get; }
        public List<ProductLabel> ProductLabels { get; set; }
    }
    public class ProductLabel
    {

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public int LabelId { get; set; }
        [ForeignKey("LabelId")]
        public Label Label { get; set; }
        public int Priority { set; get; }
    }

    public class ProductKeyword
    {
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public int KeywordId { get; set; }
        [ForeignKey("KeywordId")]
        public Keyword Keyword { get; set; }
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