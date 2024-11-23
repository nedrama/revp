namespace BackEnd.helpers
{
    public static class ExceptionMessage
    {
        public static string exeptionMessage(Exception ex)
        {
            if (ex.InnerException != null)
            {
                return ex.InnerException.Message;
            }
            return ex.Message;
        }
    }
}
