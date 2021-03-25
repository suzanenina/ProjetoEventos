using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        public readonly IProAgilRepository _repo;
        public PalestranteController(IProAgilRepository repo)
        {
            _repo = repo;
        }


        // GET api/values/5
        [HttpGet("get{PalestranteId}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var resultado = await _repo.GetAllPalestrantesAsync(id, true);
                return Ok(resultado);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        // GET api/values/5
        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var resultado = await _repo.GetAllPalestrantesAsyncByName(nome, true);
                return Ok(resultado);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(Palestrante Palestrante)
        {
            try
            {
                _repo.Add(Palestrante);
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/Palestrante/{Palestrante.Id}", Palestrante);

                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return BadRequest();
        }

        [HttpPut("{PalestranteId}")]
        public async Task<IActionResult> Put(int PalestranteId, Palestrante model)
        {
            try
            {
                var Palestrante = await _repo.GetAllPalestrantesAsync(PalestranteId, false);

                if(Palestrante == null) return NotFound();

                _repo.Update(Palestrante);
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/Palestrante/{Palestrante.Id}", Palestrante);

                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int PalestranteId)
        {
            try
            {
                var Palestrante = await _repo.GetAllPalestrantesAsync(PalestranteId, false);

                if(Palestrante == null) return NotFound();

                _repo.Delete(Palestrante);
                if(await _repo.SaveChangesAsync())
                {
                    return Ok();

                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }



    }
}