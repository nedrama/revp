﻿namespace BackEnd.helpers
{
    public static class roles
    {
        public const string Admin = nameof(Admin);
        public const string User = nameof(User);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, User};
    }
}
