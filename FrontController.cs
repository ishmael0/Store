using Core.DB;
using Microsoft.AspNetCore.Mvc;

namespace Store.Models
{
    public class FrontController:Controller
    {
        public StoreDB _context { get; }
        public FrontController() { }
    }
}