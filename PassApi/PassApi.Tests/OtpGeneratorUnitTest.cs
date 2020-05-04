using PassApi.BusinessLogic;
using PassApi.BusinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using Xunit;

namespace PassApi.Tests
{
    public class OtpGeneratorUnitTest
    {
        public static IEnumerable<object[]> SuccessfullyGeneratedOtpData =>
        new List<object[]>
        {
            new object[] { "1234", new DateTime(2018, 4, 25), "553570" },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 1), "043360" },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 2), "043360" },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 3), "043360" },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 30), "525715" },
            new object[] { "555555", new DateTime(2022, 6, 18), "056054" },
            new object[] { "222222", new DateTime(2022, 6, 18), "659180" },
        };

        public static IEnumerable<object[]> RemainingSecondsData =>
        new List<object[]>
        {
            new object[] { "1234", new DateTime(2018, 4, 25), -1 },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 1), -1 },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 2), -1 },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 3), -1 },
            new object[] { "29852935", new DateTime(2020, 4, 25, 15, 00, 30), -1 },
            new object[] { "555555", new DateTime(2022, 6, 18), -1 },
            new object[] { "222222", new DateTime(2022, 6, 18), -1 },
        };

        [Fact]
        public void OtpGenerator_ValidUserIdAndInvalidDate_GenerateEmptyOtp()
        {
            // Arrange
            IOtpGenerator otpGenerator = new OtpGenerator();
            var userId = "1233445";
            var date = new DateTime(1969, 1, 1);

            // Act
            var result = otpGenerator.GenerateOtp(userId, date);

            // Assert
            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void OtpGenerator_ValidUserIdAndDateUtcNow_RemainingSecondsGreaterThanZeroAndSmallerOrEqualThanThirty()
        {
            // Arrange
            IOtpGenerator otpGenerator = new OtpGenerator();
            var userId = "1233445";
            var date = DateTime.UtcNow;
            var otp = otpGenerator.GenerateOtp(userId, date);

            // Act
            var result = otpGenerator.GetOtpRemainingSeconds(userId, otp);

            // Assert
            Assert.True(result > 0 && result <= 30);
        }

        [Theory]
        [MemberData(nameof(SuccessfullyGeneratedOtpData))]
        public void OtpGenerator_ValidUserIdAndDate_SuccessfullyGeneratedOtp(string userId, DateTime date, string expected)
        {
            // Arrange
            IOtpGenerator otpGenerator = new OtpGenerator();

            // Act
            var result = otpGenerator.GenerateOtp(userId, date);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [MemberData(nameof(RemainingSecondsData))]
        public void OtpGenerator_ValidUserIdAndDate_SuccessfullyCheckedRemainingSeconds(string userId, DateTime date, long expected)
        {
            // Arrange
            IOtpGenerator otpGenerator = new OtpGenerator();
            var otp = otpGenerator.GenerateOtp(userId, date);

            // Act
            var result = otpGenerator.GetOtpRemainingSeconds(userId, otp);

            // Assert
            Assert.Equal(expected, result);
        }
    }
}
