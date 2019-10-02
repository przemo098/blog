using System.Collections.Generic;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogWebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
    public class AtmController : ControllerBase
    {
        [HttpGet("{amountToWithdraw}")]
        public Dictionary<int, int> Index(int? amountToWithdraw)
        {
            return AtmService.Withdraw(amountToWithdraw);
        }
    }
}