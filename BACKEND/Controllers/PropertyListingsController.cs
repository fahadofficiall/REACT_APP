using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RealEstateBackendAPI.Models;

namespace RealEstateBackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyListingsController : ControllerBase
    {
        private readonly RealEstateDbContext _dbContext;

        public PropertyListingsController(RealEstateDbContext realEstateDbContext)
        {
            _dbContext = realEstateDbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<PropertyListing>> Get()
        {
            var result = await _dbContext.PropertyListings.ToListAsync();

            return result;
        }

        [HttpPost]
        public async Task<string> Post(PropertyListing propertyListingRequest)
        {
            var returnMessage = string.Empty;

            try
            {
                _dbContext.PropertyListings.Add(propertyListingRequest);

                await _dbContext.SaveChangesAsync();

                returnMessage = "Details saved successfully";

            }
            catch (Exception)
            {
                returnMessage = "Technical error";
            }

            Response response = new Response { ResponseMessage = returnMessage };
            string result = JsonConvert.SerializeObject(response);

            return result;

        }

        [HttpPut]
        public async Task<string> Put(PropertyListing propertyListingRequest)
        {
            var returnMessage = string.Empty;

            try
            {
                _dbContext.Entry(propertyListingRequest).State = EntityState.Modified;

                await _dbContext.SaveChangesAsync();

                returnMessage = "Details updated successfully";
            }
            catch (Exception)
            {
                returnMessage = "Technical error";
            }

            Response response = new Response { ResponseMessage = returnMessage };
            string result = JsonConvert.SerializeObject(response);

            return result;

        }

        [HttpDelete]
        public async Task<string> Delete(int id)
        {
            var returnMessage = string.Empty;

            try
            {
                PropertyListing record = await _dbContext.PropertyListings.FindAsync(id);

                if(record == null)
                {
                    returnMessage = "Record not found";
                }
                else
                {
                    _dbContext.PropertyListings.Remove(record);
                    await _dbContext.SaveChangesAsync();
                    returnMessage = "Record deleted successfully";
                }
            }
            catch (Exception)
            {
                returnMessage = "Technical error";
            }

            Response response = new Response { ResponseMessage = returnMessage };
            string result = JsonConvert.SerializeObject(response);

            return result;

        }
    }
}
