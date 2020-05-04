using System;

namespace PassApi.BusinessLogic.Interfaces
{
    public interface IPassService
    {
        public string CreateOtp(string userId, DateTime date);

        public long GetOtpRemainingSeconds(string userId, string totpCode);

        public bool IsOtpValid(string userId, string totpCode);

        public bool UseOtp(string userId, string totpCode);
    }
}
