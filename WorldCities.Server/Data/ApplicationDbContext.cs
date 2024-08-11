using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Microsoft.EntityFrameworkCore;
using WorldCities.Server.Data.Models;

namespace WorldCities.Server.Data
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext() : base()
		{

		}
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{
		
		}

		public DbSet<City> Cities => Set<City>();
		public DbSet<Country> Countries => Set<Country>();

	}
}
