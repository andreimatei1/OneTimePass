using PassApi.BusinessLogic.Interfaces;
using PassApi.Common;
using System;

namespace PassApi.BusinessLogic
{
    public class OtpGenerator : IOtpGenerator
    {
        private const int _totalDigits = 6;

        public string GenerateOtp(string userId, DateTime date)
        {
            if (date < DateTime.UnixEpoch)
            {
                return string.Empty;
            }

            var nrOfSteps = Helpers.GetStepsSinceDateOrigin(date);

            var otp = CreateUniqueCode(userId.ToByteArray(), nrOfSteps);

            return otp.ToString().PadLeft(_totalDigits, '0');
        }

        public long GetOtpRemainingSeconds(string userId, string totpCode)
        {
            var newOtp = GenerateOtp(userId, DateTime.UtcNow);

            if(newOtp == totpCode)
            {
                var remainingSeconds = Helpers.GetRemainingSecondsForDateAndStep(DateTime.UtcNow);

                if(remainingSeconds > 0 && remainingSeconds <= Helpers.DefaultTimeStep)
                {
                    return remainingSeconds;
                }
            }

            return -1;
        }

        /// <summary>
        /// Generates a unique code for a specified key and counter.
        /// </summary>
        /// <param name="key"></param>
        /// <param name="counter"></param>
        /// <returns></returns>
        private int CreateUniqueCode(byte[] key, long counter)
        {
            byte[] hash = Encode(key, counter.GetBytes());

            int binaryCode = CalculateOtp(hash);

            int otpCode = Truncate(binaryCode, _totalDigits);

            return otpCode;
        }

        /// <summary>
        /// Takes 4 bytes from hash starting at offset bytes.
        /// Discards the most significant bit and stores the rest as an (unsigned) 32-bit integer.
        /// </summary>
        /// <param name="hash"></param>
        /// <returns></returns>
        private int CalculateOtp(byte[] hash)
        {
            var truncationOffset = hash[hash.Length - 1] & 0xF;

            var binaryCode = ((hash[truncationOffset] & 0x7F) << 24) |
                             ((hash[truncationOffset + 1] & 0xFF) << 16) |
                             ((hash[truncationOffset + 2] & 0xFF) << 8) |
                             (hash[truncationOffset + 3] & 0xFF);

            return binaryCode;
        }

        /// <summary>
        /// Computes a hash code for the specified input.
        /// </summary>
        /// <param name="key"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        private byte[] Encode(byte[] key, byte[] input)
        {
            var hmac = new System.Security.Cryptography.HMACSHA512(key);

            return hmac.ComputeHash(input);
        }

        /// <summary>
        /// Returns a truncated value of the original code to a specified number of digits.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private int Truncate(int code, int nrOfDigitsToTruncate)
        {
            return code % (int)Math.Pow(10, nrOfDigitsToTruncate);
        }
    }
}
