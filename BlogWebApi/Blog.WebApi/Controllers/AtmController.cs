using Blog.Dto;
using Microsoft.AspNetCore.Mvc;

namespace BlogWebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
    public class AtmController : ControllerBase
    {
        [HttpGet("{amountToWithdraw}")]
        public WithdrawResult Index(int amountToWithdraw)
        {
            return null;
        }
    }
}