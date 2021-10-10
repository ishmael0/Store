using Core.DB;
using Core.Models;
using Microsoft.EntityFrameworkCore;

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

}