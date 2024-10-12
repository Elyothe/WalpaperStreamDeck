using Microsoft.AspNetCore.Mvc;

namespace service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        [HttpGet("hello")] // Assurez-vous que cette route est correcte
        public IActionResult Get()
        {
            return Ok(new { message = "Hello from the server!" });
        }
    }
}