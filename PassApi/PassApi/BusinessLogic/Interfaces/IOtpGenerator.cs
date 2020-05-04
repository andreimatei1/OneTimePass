using System;

namespace PassApi.BusinessLogic.Interfaces
{
    public interface IOtpGenerator
    {
        string GenerateOtp(string userId, DateTime date);

        long GetOtpRemainingSeconds(string userId, string totpCode);
    }
}
