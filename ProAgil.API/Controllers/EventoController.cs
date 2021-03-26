using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        public readonly IProAgilRepository _repo;
        public EventoController(IProAgilRepository repo)
        {
            _repo = repo;
        }

        // GET api/eventos
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllEventoAsync(true);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/values/5
        [HttpGet("get{EventoId}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var resultado = await _repo.GetAllEventoAsyncById(id, true);
                return Ok(resultado);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        // GET api/values/5
        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                var resultado = await _repo.GetAllEventoAsyncByTema(tema, true);
                return Ok(resultado);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(Evento evento)
        {
            try
            {
                _repo.Add(evento);
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/evento/{evento.Id}", evento);

                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

        [HttpPut("{EventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model)
        {
            try
            {
                var evento = await _repo.GetAllEventoAsyncById(eventoId, false);

                if(evento == null) return NotFound();

                _repo.Update(evento);
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/evento/{evento.Id}", evento);

                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int eventoId)
        {
            try
            {
                var evento = await _repo.GetAllEventoAsyncById(eventoId, false);

                if(evento == null) return NotFound();

                _repo.Delete(evento);
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