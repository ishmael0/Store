using Core.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    [Route("api/[controller]/[action]")]
    public class FrontController:Controller
    {
        public StoreDB _context { get; }
        public FrontController(StoreDB dB)
        {
            this._context = dB;
        }


        [HttpGet]
        public async Task<JsonResult> GetInitial()
        {
            var items =await _context.Categories.Where(c => c.Status == Core.Models.Statuses.Published)
                .Select(c=>new { c.ParentCategoryId, c.Id,c.Title})
                .ToListAsync();
            return new JsonResult(new { categories = items });
        }
    }
}