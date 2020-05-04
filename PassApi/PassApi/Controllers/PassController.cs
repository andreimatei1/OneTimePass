using Microsoft.AspNetCore.Mvc;
using PassApi.BusinessLogic.Interfaces;
using System;

namespace PassApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassController : ControllerBase
    {
        IPassService _passService;

        public PassController(IPassService passService)
        {
            _passService = passService;
        }

        [HttpGet]
        public string Get(string userId)
        {
            return _passService.CreateOtp(userId, DateTime.UtcNow);
        }

        [HttpGet]
        [Route("remaining")]
        public long RemainingSeconds(string userId, string totpCode)
        {
            return _passService.GetOtpRemainingSeconds(userId, totpCode);
        }

        [HttpGet]
        [Route("validate")]
        public bool IsOtpValid(string userId, string totpCode)
        {
            return _passService.IsOtpValid(userId, totpCode);
        }

        [HttpGet]
        [Route("use")]
        public bool UseTotp(string userId, string totpCode)
        {
            return _passService.UseOtp(userId, totpCode);
        }
    }
}
