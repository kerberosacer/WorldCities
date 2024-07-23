using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WorldCities.Server.Data.Models
{
	[Table("Countries")]
	[Index(nameof(Name))]
	[Index(nameof(ISO2))]
	[Index(nameof(ISO3))]
	public class Country
	{
		#region Properties

		[Key]
		[Required]
		public int Id { get; set; }

		public required string Name { get; set; }
		[JsonPropertyName("iso2")]
		public required string ISO2 { get; set; }
		[JsonPropertyName("iso3")]
		public required string ISO3 { get; set; }

		#endregion

		#region Navigation Properties

		public ICollection<City>? Cities { get; set; }

		#endregion
	}
}
