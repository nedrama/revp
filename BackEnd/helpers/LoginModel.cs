using Newtonsoft.Json;

namespace BackEnd.helpers
{
    public class LoginModel
    {
            [JsonProperty("userName")]
            public string UserName { get; set; }
        [JsonProperty("Email")]
        public string Email { get; set; }

        [JsonProperty("password")]
            public string Password { get; set; }
    }
}
