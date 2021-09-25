using Core.Models;
using Core.StartUp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Store.Models;
using System.Linq;

namespace Store
{
    public partial class Program
    {
        public static void Main(string[] args)
        {




            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder =>
        {
            //seed();
            webBuilder.UseStartup<BaseStartup<MyAccStore, BaseApplicationUser, BaseApplicationRole>>();
        });
    }
}
