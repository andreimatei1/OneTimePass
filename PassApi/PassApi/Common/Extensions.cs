using System.Text;

namespace PassApi.Common
{
    public static class Extensions
    {
        /// <summary>
        /// Convert string to byte array
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static byte[] ToByteArray(this string str)
        {
            return Encoding.ASCII.GetBytes(str);
        }

        /// <summary>
        /// Convert long to byte array
        /// </summary>
        /// <param name="lng"></param>
        public static byte[] GetBytes(this long lng)
        {
            var counterBytes = new byte[8];

            for (var i = counterBytes.Length - 1; i >= 0; i--)
            {
                counterBytes[i] = (byte)(lng & 0xff);
                lng >>= 8;
            }

            return counterBytes;
        }
    }
}
