using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SkupinaController : ControllerBase
    {
        private readonly BackendContext _context;

        public SkupinaController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Skupine);

            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });

            }
        }

        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Skupine.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });
            }
        }

        [HttpPost]
        public IActionResult Post(Skupina proizvodjac)
        {
            try
            {
                _context.Skupine.Add(proizvodjac);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, proizvodjac);
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });
            }

        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Put(int sifra, Skupina skupina)
        {
            try
            {

                var s = _context.Skupine.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Naziv = skupina.Naziv;
                s.Prostorija = skupina.Prostorija;

                _context.Skupine.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promijenjen podatak!" });
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });
            }

        }
        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Skupine.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Skupine.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano!" });
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });

            }
        }
    }

}
