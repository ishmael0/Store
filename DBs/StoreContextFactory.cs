using Core.StartUp;
using Microsoft.EntityFrameworkCore.Design;

namespace Store.Models
{
    public class StoreContextFactory : IDesignTimeDbContextFactory<MonizaDB>
    {
        public MonizaDB CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<MonizaDB>("Store");
            return new MonizaDB(o.Options);
        }
    }

}