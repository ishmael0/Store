using Core.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    [Route("api/[controller]/[action]")]
    public class FrontController : Controller
    {
        public MonizaDB _context { get; }
        public FrontController(MonizaDB dB)
        {
            this._context = dB;
        }


        [HttpGet]
        public async Task<JsonResult> GetInitial()
        {
            var items = await _context.Categories.Where(c => c.Status == Core.Models.Statuses.Published)
                .Select(c => new { c.ParentCategoryId, c.Id,c.Color, c.Title, c.Description, c.Icon, c.Images, c.Summary, c.Priority,c.TreeNodes })
                .ToListAsync();
            return new JsonResult(new { categories = items.OrderBy(c => c.Priority) });
        }
        [HttpPost]
        public async Task<JsonResult> GetProducts([FromBody] ProductHelper helper)
        {
            var products = await _context.Products.Where(c => c.Status == Core.Models.Statuses.Published && helper.Categories.Contains(c.CategoryId)).ToListAsync();
            return new JsonResult(new { products = products.OrderBy(c => c.Create) });
        }
        [HttpPost]
        public async Task<JsonResult> GetProduct([FromBody] ProductHelper2 helper)
        {
            var product = await _context.Products.FirstOrDefaultAsync(c => c.Id == helper.Id && c.Status == Core.Models.Statuses.Published);
            return new JsonResult(new { product });
        }
        public class ProductHelper
        {
            public List<int> Categories { set; get; }
        }  
        public class ProductHelper2
        {
            public int Id { set; get; }
        } 

    }
}