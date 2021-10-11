using Core.Controllers;
using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class ProductController : BaseController<MonizaDB, Product>
    {
        public ProductController(MonizaDB dbContext, UserPermissionManager upm) : base(dbContext, upm)
        {
        }
        [NonAction]
        public override IQueryable<Product> BuildRequest(IDictionary<string, string> param)
        {
            return base.BuildRequest(param)
                .Include(c => c.Types.Where(c => c.Status != 0))
                .Include(c => c.KeyWords.Where(c => c.Status != 0))
                .Include(c => c.Labels.Where(c => c.Status != 0));
        }

        public override async Task<JsonResult> Set([FromQuery] IDictionary<string, string> param, [FromBody] Product t)
        {
            if (t.Id > 0)
            {
                _context.RemoveRange(_context.ProductLabels.Where(c => c.ProductId == t.Id));
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
                    x.Item2.ForEach(c =>
                    {
                        c.Relateds.ToList().ForEach(r =>
                        {
                            r.Title = titles.FirstOrDefault(t => t.Id == r.Id)?.Title;
                        });

                    });
                }
            }
            return JR(StatusCodes.Status200OK, data: new { Records = x.Item2, TotalRecords = x.Item1, Model = currentItem });
        }
    }

}