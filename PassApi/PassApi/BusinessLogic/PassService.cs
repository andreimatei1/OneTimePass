using PassApi.BusinessLogic.Interfaces;
using System;

namespace PassApi.BusinessLogic
{
    public class PassService : IPassService
    {
        private readonly IOtpGenerator _otpGenerator;

        public PassService(IOtpGenerator otpGenerator)
        {
            _otpGenerator = otpGenerator;
        }

        public string CreateOtp(string userId, DateTime date)
        {
            return _otpGenerator.GenerateOtp(userId, date);
        }

        public long GetOtpRemainingSeconds(string userId, string totpCode)
        {
            return _otpGenerator.GetOtpRemainingSeconds(userId, totpCode);
        }

        public bool IsOtpValid(string userId, string totpCode)
        {
            throw new NotImplementedException();
        }

        public bool UseOtp(string userId, string totpCode)
        {
            throw new NotImplementedException();
        }
    }
}
