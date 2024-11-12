using BackEnd.Data;
using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEnd.helpers
{
    public interface IUserService
    {
        ResponseModel<User> Get(int UserId);
    }
    public class UserService : IUserService
    {
        private readonly RevDbContext _context;

        public UserService(RevDbContext context)
        {
            _context = context;
        }

        public ResponseModel<User> Get(int UserId)
        {
            ResponseModel<User> response = new ResponseModel<User>();

            try
            {
                User? user = (from UM in _context.Users
                                  where UM.Id == UserId
                                  select new User
                                  {
                                      Id = UM.Id,
                                      Username = UM.Username,
                                      Email = UM.Email,
                                      Password = UM.Password,
                                      IsCompany = UM.IsCompany,
                                      IsDeleted = UM.IsDeleted,
                                      Role = UM.Role,
                                  }).FirstOrDefault();

                if (user != null)
                {
                    response.Data = user;
                    return response;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "User Not Found!";
                    return response;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
