using System;

namespace PassApi.Common
{
    public class Helpers
    {
        public static readonly DateTime UnixOriginDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        public static readonly int DefaultTimeStep = 30;

        public static double GetSecondsSinceDateOrigin(DateTime date)
        {
            return (date.ToUniversalTime() - UnixOriginDate).TotalSeconds;
        }

        public static long GetStepsSinceDateOrigin(DateTime date)
        {
            return (long)GetSecondsSinceDateOrigin(date) / DefaultTimeStep;
        }

        public static long GetRemainingSecondsForDateAndStep(DateTime date)
        {
            return GetStepsSinceDateOrigin(date) * DefaultTimeStep + DefaultTimeStep - (long)GetSecondsSinceDateOrigin(date);
        }

        public static DateTime GetDateTimeFromSeconds(long secondsSinceDateOrigin)
        {
            return new DateTime(UnixOriginDate.Ticks + secondsSinceDateOrigin * 10000000, DateTimeKind.Utc);
        }
    }
}
