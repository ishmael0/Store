using Core.Controllers;
using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    [Route("api/[controller]/[action]")]
    public class WelcomeController : BaseBaseController
    {
        public WelcomeController(MonizaDB db)
        {
            _context = db;
        }
        public MonizaDB _context { get; }
        [HttpGet]
        public async Task<JsonResult> Init()
        {
            var Categories =await _context.Categories.Where(c => c.Status == Statuses.Published).CountAsync();
            var Products = await _context.Products.Where(c => c.Status == Statuses.Published).CountAsync();
            var Customers = await _context.Customers.Where(c => c.Status == Statuses.Published).CountAsync();
            var Brands = await _context.Brands.Where(c => c.Status == Statuses.Published).CountAsync();
            //await Task.WhenAll(Categories, Products, Customers);
            //return JR(StatusCodes.Status200OK, "", new { Categories = Categories.Result, Products= Products.Result, Customers= Customers.Result });
            return JR(StatusCodes.Status200OK, "", new { Categories, Products, Customers, Brands });
        }
    }

}