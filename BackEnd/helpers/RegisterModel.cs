using Newtonsoft.Json;

namespace BackEnd.helpers
{
    public class RegisterModel
    {
            [JsonProperty("userName")]
            public string UserName { get; set; }

            [JsonProperty("password")]
            public string Password { get; set; }
        public string Email { get; set; }

    }
}
