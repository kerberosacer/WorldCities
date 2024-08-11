using System.Drawing;

namespace WorldCities.Server.Data
{
	public class ApiLoginResult
	{
		public bool Success { get; set; }
		public required string Message { get; set; }
		public string? Token { get; set; }
	}
}
