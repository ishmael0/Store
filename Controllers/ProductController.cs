using Core.Controllers;
using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace Store.Models
{
    public class LabelController : BaseController<MonizaDB, Label>
    {
        [HttpGet]
        public override async Task<JsonResult> GetSingle([FromQuery] int id)
        {
            var list = await _context.ProductLabels.Where(c => c.LabelId == id).ToListAsync();
            var ids = list.Select(c => c.ProductId);
            var titles = await _context.Products.Where(c => ids.Contains(c.Id)).Select(c => new { c.Id, c.Title }).ToListAsync();
            list.ForEach(c => c.Title = titles.FirstOrDefault(d => d.Id == c.ProductId).Title);
            return JR(StatusCodes.Status200OK, "", new { List = list });
        }
        public LabelController(MonizaDB dbContext, UserPermissionManager upm) : base(dbContext, upm)
        {
        }
        public override async Task<JsonResult> Set([FromQuery] IDictionary<string, string> param, [FromBody] Label t)
        {
            if (t.Id > 0)
            {
                var cu = t.ProductLabels.Select(c => c.ProductId);
                var missingRows = _context.ProductLabels.Where(c => c.LabelId == t.Id && !cu.Contains(c.ProductId));
                _context.ProductLabels.RemoveRange(missingRows);
            }
            return await base.Set(param, t);
        }
    }
    public class ProductController : BaseController<MonizaDB, Product>
    {
        public ProductController(MonizaDB dbContext, UserPermissionManager upm) : base(dbContext, upm)
        {
        }
        [HttpGet]
        public override async Task<JsonResult> GetSingle([FromQuery] int id)
        {
            var item = await _context.Products
                .Include(c => c.ProductLabels)
                //.Include(c => c.RelatedProducts)
                .Include(c => c.Types)
                .Include(c => c.KeyWords)
                .FirstOrDefaultAsync(c => c.Id == id);
            var ProductKeyWords = item.KeyWords.Select(c => new { ProductId = id, KeywordId = c.Id, Title = c.Title });
            return JR(StatusCodes.Status200OK, "", new { ProductKeyWords, item.ProductLabels, item.Types });
        }
        [HttpPost]
        public override async Task<JsonResult> Set([FromQuery] IDictionary<string, string> param, [FromBody] Product t)
        {
            if (t.Id > 0)
            {
                var cu = t.ProductLabels.Select(c => c.LabelId);
                var missingRows = _context.ProductLabels.Where(c => c.ProductId == t.Id && !cu.Contains(c.LabelId));
                _context.ProductLabels.RemoveRange(missingRows);
            }
            return await base.Set(param, t);
        }
    }

}