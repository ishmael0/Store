using Core.StartUp;
using Microsoft.EntityFrameworkCore.Design;

namespace Store.Models
{
    public class MyAccStoreContextFactory : IDesignTimeDbContextFactory<MonizaAcc>
    {
        public MonizaAcc CreateDbContext(string[] args)
        {
            var o = AppSetting.GetDbContextOptionsBuilder<MonizaAcc>("Store");
            return new MonizaAcc(o.Options);
        }
    }

}